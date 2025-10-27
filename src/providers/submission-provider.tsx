import {
  useState,
  useContext,
  useReducer,
  useCallback,
  createContext,
  ReactNode,
  useMemo,
  useRef,
  useEffect,
} from "react";
import {
  setLoading,
  SubmissionActions,
} from "../store/submission/submission.actions";
import {
  getPageUrl,
  parseSubmissionsFromPage,
} from "../utilities/submission.utils";
import {
  selectLoading,
  selectSubmissionAuthorPure,
  selectSubmissionDescendantsPure,
  selectSubmissionIds,
  selectSubmissionKidsPure,
  selectSubmissionScorePure,
  selectSubmissionTimePure,
  selectSubmissionTitlePure,
  selectSubmissionTypePure,
  selectSubmissionUrlPure,
  SubmissionState,
} from "../store/submission/submission";
import { StoreSelector } from "../types/utils";

type SubmissionProviderValue = {
  submissionIds: number[];
  fetchSubmissions: () => void;
  selectSubmissionType: StoreSelector<typeof selectSubmissionTypePure>;
  selectSubmissionTitle: StoreSelector<typeof selectSubmissionTitlePure>;
  selectSubmissionAuthor: StoreSelector<typeof selectSubmissionAuthorPure>;
  selectSubmissionScore: StoreSelector<typeof selectSubmissionScorePure>;
  selectSubmissionTime: StoreSelector<typeof selectSubmissionTimePure>;
  selectSubmissionUrl: StoreSelector<typeof selectSubmissionUrlPure>;
  selectSubmissionDescendants: StoreSelector<
    typeof selectSubmissionDescendantsPure
  >;
  selectSubmissionKids: StoreSelector<typeof selectSubmissionKidsPure>;
};

const submissionInitialState: SubmissionState = {
  entities: {},
  loading: false,
};
const SubmissionContext = createContext<SubmissionProviderValue>({
  submissionIds: [],
  fetchSubmissions: () => null,
  selectSubmissionType: () => "story",
  selectSubmissionTitle: () => "",
  selectSubmissionAuthor: () => "",
  selectSubmissionScore: () => 0,
  selectSubmissionTime: () => 0,
  selectSubmissionUrl: () => "",
  selectSubmissionDescendants: () => 0,
  selectSubmissionKids: () => [],
});

function reducer(
  state: SubmissionState,
  action: SubmissionActions,
): SubmissionState {
  switch (action.type) {
    case "submission/add":
      const addSubmissionsUpdate: SubmissionState["entities"] =
        action.submissions.reduce(
          (previous: SubmissionState["entities"], submission) => {
            return {
              ...previous,
              [submission.id]: submission,
            };
          },
          {},
        );
      return {
        ...state,
        entities: {
          ...state.entities,
          ...addSubmissionsUpdate,
        },
      };
    case "submission/remove":
      return state;
    case "loading/set":
      return {
        ...state,
        loading: action.value,
      };
    default:
      console.log("unhandled action in Submission reducer");
      return state;
  }
}

type SubmissionProviderProps = { children: ReactNode };
export const SubmissionProvider = ({ children }: SubmissionProviderProps) => {
  const [state, dispatch] = useReducer(reducer, submissionInitialState);
  const [pageNumber, setPageNumber] = useState(1);
  const initialPageFetched = useRef(false);

  const loading = useMemo(() => selectLoading(state), [state]);

  const submissionIds = useMemo(() => selectSubmissionIds(state), [state]);

  const fetchSubmissions = useCallback(() => {
    if (!loading) {
      dispatch(setLoading(true));
      fetch(getPageUrl(pageNumber))
        .then((res) => res.text())
        .then((page) => {
          const submissions = parseSubmissionsFromPage(page);
          setPageNumber(pageNumber + 1);
          dispatch({
            type: "submission/add",
            submissions,
          });
        })
        .catch((error) => {
          console.log(`Error fetching page: ${pageNumber}`, error);
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [pageNumber, loading]);

  useEffect(() => {
    if (!initialPageFetched.current) {
      fetchSubmissions();
      initialPageFetched.current = true;
    }
  }, [fetchSubmissions]);

  //  Selectors
  const selectSubmissionType = useCallback(
    (id: number) => selectSubmissionTypePure(state, id),
    [state],
  );
  const selectSubmissionTitle = useCallback(
    (id: number) => selectSubmissionTitlePure(state, id),
    [state],
  );
  const selectSubmissionUrl = useCallback(
    (id: number) => selectSubmissionUrlPure(state, id),
    [state],
  );
  const selectSubmissionAuthor = useCallback(
    (id: number) => selectSubmissionAuthorPure(state, id),
    [state],
  );
  const selectSubmissionTime = useCallback(
    (id: number) => selectSubmissionTimePure(state, id),
    [state],
  );
  const selectSubmissionScore = useCallback(
    (id: number) => selectSubmissionScorePure(state, id),
    [state],
  );
  const selectSubmissionDescendants = useCallback(
    (id: number) => selectSubmissionDescendantsPure(state, id),
    [state],
  );
  const selectSubmissionKids = useCallback(
    (id: number) => selectSubmissionKidsPure(state, id),
    [state],
  );

  const context = useMemo(
    (): SubmissionProviderValue => ({
      submissionIds,
      fetchSubmissions,
      selectSubmissionType,
      selectSubmissionTitle,
      selectSubmissionAuthor,
      selectSubmissionScore,
      selectSubmissionTime,
      selectSubmissionUrl,
      selectSubmissionDescendants,
      selectSubmissionKids,
    }),
    [fetchSubmissions, loading, state],
  );

  return (
    <SubmissionContext.Provider value={context}>
      {children}
    </SubmissionContext.Provider>
  );
};

export const useSubmissionContext = () => useContext(SubmissionContext);
