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
  selectSubmissionIds,
  SubmissionState,
} from "../store/submission/submission";

type SubmissionProviderValue = {
  submissionIds: number[];
  fetchSubmissions: () => void;
};

const submissionInitialState: SubmissionState = {
  entities: {},
  loading: false,
};
const SubmissionContext = createContext<SubmissionProviderValue>({
  submissionIds: [],
  fetchSubmissions: () => null,
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

  const context = useMemo(
    (): SubmissionProviderValue => ({
      submissionIds,
      fetchSubmissions,
    }),
    [fetchSubmissions, loading, state],
  );

  return (
    <SubmissionContext.Provider value={context}>
      {children}
    </SubmissionContext.Provider>
  );
};

export const useSubmisisonContext = () => useContext(SubmissionContext);
