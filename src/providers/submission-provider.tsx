import {
  useState,
  useContext,
  useReducer,
  useCallback,
  createContext,
  ReactNode,
  useMemo,
} from "react";
import { Submission } from "../types/data";
import { SubmissionActions } from "../types/submission-actions";
import {
  getPageUrl,
  parseSubmissionsFromPage,
} from "../utilities/submission.utils";

type SubmissionState = {
  [id: string]: Submission;
};

type SubmissionProviderValue = {
  state: SubmissionState;
  loading: boolean;
  fetchSubmissions: () => void;
};

const SubmissionContext = createContext<SubmissionProviderValue>({
  state: {},
  loading: false,
  fetchSubmissions: () => null,
});

const submissionInitialState: SubmissionState = {};
function reducer(state: SubmissionState, action: SubmissionActions) {
  switch (action.type) {
    case "submission/add":
      const addSubmissionsUpdate: SubmissionState = action.submissions.reduce(
        (previous: SubmissionState, submission) => {
          return {
            ...previous,
            [submission.id]: submission,
          };
        },
        {},
      );
      return {
        ...state,
        ...addSubmissionsUpdate,
      };
    case "submission/remove":
      break;
  }
  return state;
}

type SubmissionProviderProps = { children: ReactNode };
export const SubmissionProvider = ({ children }: SubmissionProviderProps) => {
  const [state, dispatch] = useReducer(reducer, submissionInitialState);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const fetchSubmissions = useCallback(() => {
    if (!loading) {
      setLoading(true);
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
          setLoading(false);
        });
    }
  }, [pageNumber, loading]);

  const context = useMemo(
    (): SubmissionProviderValue => ({
      state,
      loading,
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
