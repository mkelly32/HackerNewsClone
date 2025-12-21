import { FC, useRef, useEffect, useCallback, useMemo, useState } from "react";
import { styled } from "styled-components";
import { getHackerNewsItem } from "../../utilities/submission.utils";
import { useFocusedSubmissionContext } from "../../providers/focused-submission";
import { Comment } from "../comment";
import { IfElse } from "../../utilities/jsx-utils";
import { isTruthy } from "../../types/utils";
import { FocusedSubmission } from "../../components/focused-submission";
import { CommentCache } from "../../types/comment-cache";

type Props = {};

const DetailedView = styled.div`
  flex-basis: 200px;
  width: 100%;
  flex-grow: 1;
  height: 100%;

  padding: 20px 10px 20px 5px;

  background-color: var(--primary-dark);
`;

const CommentList = styled.div`
  overflow: auto;
  height: 100%;

  padding: var(--padding-small);

  border: 1px solid var(--secondary-one);
  border-radius: var(--border-small);

  background-color: var(--background-one);
`;

const NoFocusedSubmission = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  padding: var(--padding-medium);
  border-radius: var(--border-small);
  background-color: var(--white);
`;

const NoSubmissionSelected = styled.div`
  margin-top: auto;
  margin-bottom: auto;

  font-size: 2rem;
  text-align: center;
`;

export const ExpandedSubmission: FC<Props> = () => {
  const { focused: submission } = useFocusedSubmissionContext();
  const loading = useRef<number[]>([]);
  const [commentCache, setCommentCache] = useState<CommentCache>({});
  const children = useMemo(() => submission?.kids ?? [], [submission]);

  const fetchComment = useCallback((id: number) => {
    if (!loading.current.includes(id)) {
      loading.current.push(id);
      fetch(getHackerNewsItem(id))
        .then((res) => res.json())
        .then((comment) => {
          setCommentCache((commentCache) => ({
            ...commentCache,
            [comment.id]: comment,
          }));
        })
        .catch((error) => {
          console.log("Error fetching comment", error);
        })
        .finally(
          () =>
            (loading.current = loading.current.filter(
              (loadingId) => loadingId !== id,
            )),
        );
    }
  }, []);

  useEffect(() => {
    const commentsToFetch = children.filter((id) => {
      return !(id in commentCache) && !loading.current.includes(id);
    });
    commentsToFetch.forEach(fetchComment);
  }, [children, commentCache]);

  return (
    <IfElse
      condition={isTruthy(submission)}
      then={
        <DetailedView>
          <CommentList>
            <>
              <FocusedSubmission submission={submission!}></FocusedSubmission>
              {children.map((id) => (
                <Comment
                  key={id}
                  id={id}
                  cache={commentCache}
                  fetchComment={fetchComment}
                  reply={false}
                />
              ))}
            </>
          </CommentList>
        </DetailedView>
      }
      else={
        null
        // <NoFocusedSubmission>
        //   <NoSubmissionSelected>No submission loaded</NoSubmissionSelected>
        // </NoFocusedSubmission>
      }
    />
  );
};
