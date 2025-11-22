import {
  FC,
  useEffect,
  useRef,
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
  useCallback,
} from "react";
import {
  getAskSubmisisons,
  getBestSubmissions,
  getJobSubmissions,
  getNewSubmisisons,
  getPastSubmissions,
  getTopSubmissions,
} from "../utilities/submission.utils";
import { SubmissionFilters } from "../types/data";

type PageContextValue = {
  selected: number[];
  selectFilter: (filter: SubmissionFilters) => void;
};

const HackerNewsPageContext = createContext<PageContextValue>({
  selected: [],
  selectFilter: () => undefined,
});

type Props = { children: ReactNode };
export const PageContext: FC<Props> = ({ children }) => {
  const topSubmissionsFetched = useRef(false);
  const [loading, setLoading] = useState(false);

  const [topSubmissions, setTopSubmissions] = useState<number[]>([]);
  const [bestSubmissions, setBestSubmissions] = useState<number[]>([]);
  const [newSubmissions, setNewSubmisisons] = useState<number[]>([]);
  const [pastSubmissions, setPastSubmissions] = useState<number[]>([]);
  const [askSubmissions, setAskSubmissions] = useState<number[]>([]);
  const [showSubmissions, setShowSubmissions] = useState<number[]>([]);
  const [jobSubmissions, setJobSubmissions] = useState<number[]>([]);

  const [filter, setFilter] = useState<SubmissionFilters>("top");
  const [selected, setSelected] = useState<number[]>([]);

  const fetchTopSubmissions = useCallback(() => {
    if (!loading) {
      fetch(getTopSubmissions())
        .then((res) => res.json())
        .then((data) => {
          setTopSubmissions(data);
        })
        .catch((error) => {
          console.log(`Error fetching top submissions: `, error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading]);

  const fetchBestSubmissions = useCallback(() => {
    if (!loading) {
      setLoading(true);
      fetch(getBestSubmissions())
        .then((res) => res.json())
        .then((data) => {
          setBestSubmissions(data);
        })
        .catch((error) => {
          console.log(`Error fetching best submissions: `, error);
        })
        .finally(() => setLoading(false));
    }
  }, [loading]);

  const fetchPastSubmissions = useCallback(() => {
    if (!loading) {
      fetch(getPastSubmissions())
        .then((res) => res.json())
        .then((data) => {
          setPastSubmissions(data);
        })
        .catch((error) => {
          console.log(`Error fetching past submissions: `, error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading]);

  const fetchNewSubmissions = useCallback(() => {
    if (!loading) {
      setLoading(true);
      fetch(getNewSubmisisons())
        .then((res) => res.json())
        .then((data) => {
          setNewSubmisisons(data);
        })
        .catch((error) => {
          console.log(`Error fetching new submissions: `, error);
        })
        .finally(() => setLoading(false));
    }
  }, [loading]);

  const fetchAskSubmissions = useCallback(() => {
    if (!loading) {
      fetch(getAskSubmisisons())
        .then((res) => res.json())
        .then((data) => {
          setAskSubmissions(data);
        })
        .catch((error) => {
          console.log(`Error fetching Ask submissions: `, error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading]);

  const fetchShowSubmissions = useCallback(() => {
    if (!loading) {
      fetch(getAskSubmisisons())
        .then((res) => res.json())
        .then((data) => {
          setShowSubmissions(data);
        })
        .catch((error) => {
          console.log(`Error fetching Show submissions: `, error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading]);

  const fetchJobSubmissions = useCallback(() => {
    if (!loading) {
      fetch(getJobSubmissions())
        .then((res) => res.json())
        .then((data) => {
          setJobSubmissions(data);
        })
        .catch((error) => {
          console.log(`Error fetching Job submissions: `, error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading]);

  const selectFilter = useCallback(
    (type: SubmissionFilters) => {
      if (loading) {
        return;
      }

      switch (type) {
        case "top":
          if (topSubmissions.length === 0) {
            fetchTopSubmissions();
          }
          break;
        case "best":
          if (bestSubmissions.length === 0) {
            fetchBestSubmissions();
          }
          break;
        case "new":
          if (newSubmissions.length === 0) {
            fetchNewSubmissions();
          }
          break;
        case "past":
          if (pastSubmissions.length === 0) {
            fetchPastSubmissions();
          }
          break;
        case "ask":
          if (askSubmissions.length === 0) {
            fetchAskSubmissions();
          }
          break;
        case "show":
          if (showSubmissions.length === 0) {
            fetchShowSubmissions();
          }
          break;
        case "jobs":
          if (jobSubmissions.length === 0) {
            fetchJobSubmissions();
          }
          break;
        default:
          return null as never;
      }
      setFilter(type);
    },
    [
      topSubmissions,
      topSubmissions,
      bestSubmissions,
      newSubmissions,
      pastSubmissions,
      askSubmissions,
      showSubmissions,
      jobSubmissions,
    ],
  );

  useEffect(() => {
    if (!topSubmissionsFetched.current) {
      fetchTopSubmissions();
      topSubmissionsFetched.current = true;
    }
  }, [fetchTopSubmissions]);

  useEffect(() => {
    switch (filter) {
      case "top":
        setSelected(topSubmissions);
        break;
      case "best":
        setSelected(bestSubmissions);
        break;
      case "new":
        setSelected(newSubmissions);
        break;
      case "past":
        setSelected(pastSubmissions);
        break;
      case "ask":
        setSelected(askSubmissions);
        break;
      case "show":
        setSelected(showSubmissions);
        break;
      case "jobs":
        setSelected(jobSubmissions);
        break;
      default:
        return null as never;
    }
  }, [
    filter,
    topSubmissions,
    newSubmissions,
    pastSubmissions,
    askSubmissions,
    jobSubmissions,
  ]);

  useEffect(() => {
    console.log(loading, filter);
  }, [loading, filter]);

  const context = useMemo<PageContextValue>(
    () => ({
      selected,
      selectFilter,
    }),
    [selected],
  );
  return (
    <HackerNewsPageContext.Provider value={context}>
      {children}
    </HackerNewsPageContext.Provider>
  );
};

export const usePageContext = () => useContext(HackerNewsPageContext);
