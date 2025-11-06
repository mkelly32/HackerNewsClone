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
import { getTopStories } from "../utilities/submission.utils";

type SubmissionProviderValue = {
  topStories: number[];
  loading: boolean;
};

const SubmissionContext = createContext<SubmissionProviderValue>({
  topStories: [],
  loading: true,
});

type SubmissionProviderProps = { children: ReactNode };
export const SubmissionProvider = ({ children }: SubmissionProviderProps) => {
  const topStoriesFetched = useRef(false);
  const [loading, setLoading] = useState(false);
  const [topStories, setTopStories] = useState([]);

  const fetchSubmissions = useCallback(() => {
    if (!loading) {
      fetch(getTopStories())
        .then((res) => res.json())
        .then((data) => {
          console.log("Data: ", data);
          setTopStories(data);
        })
        .catch((error) => {
          console.log(`Error fetching top stories: `, error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading]);

  useEffect(() => {
    if (!topStoriesFetched.current) {
      fetchSubmissions();
      topStoriesFetched.current = true;
    }
  }, [fetchSubmissions]);

  const context = useMemo(
    (): SubmissionProviderValue => ({
      topStories,
      loading,
    }),
    [loading, topStories],
  );

  return (
    <SubmissionContext.Provider value={context}>
      {children}
    </SubmissionContext.Provider>
  );
};

export const useSubmissionContext = () => useContext(SubmissionContext);
