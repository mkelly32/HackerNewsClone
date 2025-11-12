import { FC, RefObject, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { HNItem } from "../../types/data";
import { isTruthy, Maybe, Nullable } from "../../types/utils";
import { getHackerNewsItem } from "../../utilities/submission.utils";
import { IfElse } from "../../utilities/jsx-utils";
import { SubmissionTitle } from "../../components/submission-title";
import { SubmissionMeta } from "../../components/submission-meta";
import { useFocusedSubmissionContext } from "../../providers/focused-submission";

const SubmissionElement = styled.li`
  position: relative;
  width: 100%;

  min-height: 8rem;
  height: 8rem;

  margin: 0;

  background-color: var(--primary-light);
  border-radius: 5px;
  border: 1px solid var(--secondary-dark);
`;

const LoadedSubmission = styled.div`
  display: flex;
  height: 100%;
`;

const Submission = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-width: 0;
  width: 100%;

  padding: 20px;

  text-align: left;
`;
const SubmissionActions = styled.div`
  button {
    height: 100%;
  }
`;

const UnloadedSubmission = styled.div`
  font-size: 2.5rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

type Props = { id: number; container: RefObject<Nullable<HTMLUListElement>> };
export const SubmissionItem: FC<Props> = ({ id, container }) => {
  const { setFocused } = useFocusedSubmissionContext();
  const submissionElement = useRef<HTMLLIElement>(null);
  const observer = useRef<IntersectionObserver>(null);
  const [item, setItem] = useState<Nullable<HNItem>>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Nullable<string>>(null);

  const title = item?.title ?? "";
  const url = item?.url ?? "";
  const score = item?.score ?? 0;
  const author = item?.by ?? "";
  const descendants = item?.descendants ?? 0;
  const time = item?.time ?? 0;

  const focusSubmission = useCallback(() => {
    if (item) {
      console.log("Setting item as focused");
      setFocused(item);
    } else {
      console.log(
        "Submission Component: Tried to focus non existing submission!",
        id,
      );
    }
  }, [item]);

  //  Fetch Submisison
  const fetchSubmission = useCallback(() => {
    if (!loading && !item && !error) {
      setLoading(true);
      fetch(getHackerNewsItem(id))
        .then((response) => response.json())
        .then((hnSubmission) => setItem(hnSubmission))
        .catch((error) => setError(String(error)))
        .finally(() => setLoading(false));
    }
  }, [id, loading, item]);

  //  IntersectionObserver callback
  const fetchIfVisible = useCallback((callback: () => void) => {
    const ifIntersecting = (entries: IntersectionObserverEntry[]) => {
      if (entries[0]?.isIntersecting) {
        callback();
      }
    };
    return ifIntersecting;
  }, []);

  //  Init IntersectionObserver to only fetch the submission when the element is visible inside its parent
  useEffect(() => {
    let element: HTMLLIElement; // Need to close over element for IntersectionObserver cleanup
    if (submissionElement.current !== null && container.current !== null) {
      element = submissionElement.current;
      observer.current = new IntersectionObserver(
        fetchIfVisible(fetchSubmission),
        {
          root: container.current,
          threshold: 1,
        },
      );
      observer.current.observe(element);
    }

    return () => {
      observer.current?.unobserve(element);
    };
  }, [fetchSubmission, fetchIfVisible, container]);

  return (
    <SubmissionElement ref={submissionElement}>
      <IfElse
        condition={!item}
        then={<UnloadedSubmission>Loading...</UnloadedSubmission>}
        else={
          <LoadedSubmission>
            <Submission>
              <SubmissionTitle
                title={title}
                url={url}
                descendants={descendants}
              />
              <SubmissionMeta
                score={score}
                author={author}
                submissionTime={time}
                url={url}
              />
            </Submission>
            <SubmissionActions>
              <button onClick={focusSubmission}>View</button>
            </SubmissionActions>
          </LoadedSubmission>
        }
      />
    </SubmissionElement>
  );
};
