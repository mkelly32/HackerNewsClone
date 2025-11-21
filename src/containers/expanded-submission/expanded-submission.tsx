import { FC, useRef, useEffect, useCallback, useMemo, useState } from "react";
import { styled } from "styled-components";
import { HNItem } from "../../types/data";
import { getHackerNewsItem } from "../../utilities/submission.utils";
import { useFocusedSubmissionContext } from "../../providers/focused-submission";
import { Comment } from "../../components/comment";
import { IfElse } from "../../utilities/jsx-utils";
import { isTruthy } from "../../types/utils";
import { FocusedSubmission } from "../../components/focused-submission";

type Props = {};
type CommentCache = {
  [id: number]: HNItem;
};

const DetailedView = styled.div`
  width: 30vw;
  height: 100vh;

  padding: 20px 10px 20px 5px;

  background-color: var(--primary-dark);
`;

const SelectedComments = styled.div``;

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
  const [commentPath, setCommentPath] = useState<HNItem[]>([]);
  const [children, setChildren] = useState<number[]>([]);

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

  const selectComment = useCallback(
    (comment: HNItem) => setCommentPath((path) => [...path, comment]),
    [],
  );

  const goBackInCommentPath = useCallback(
    (item: HNItem) => {
      const commentPathIndex = commentPath.findIndex(
        (comment) => comment.id === item.id,
      );
      if (commentPathIndex === -1) {
        setCommentPath([]);
        return;
      }

      setCommentPath((path) => path.slice(0, commentPathIndex + 1));
    },
    [commentPath],
  );

  useEffect(() => {
    if (!isTruthy(submission)) {
      setChildren([]);
      return;
    }

    const commentDepth = commentPath.length;
    if (commentDepth === 0) {
      setChildren(submission?.kids ?? []);
      return;
    }

    setChildren(commentPath[commentDepth - 1]?.kids ?? []);
  }, [submission, commentPath]);

  useEffect(() => {
    const commentsToFetch = children.filter((id) => {
      return !(id in commentCache) && !loading.current.includes(id);
    });
    commentsToFetch.forEach(fetchComment);
  }, [children, commentCache]);

  return (
    <DetailedView>
      <CommentList>
        <IfElse
          condition={isTruthy(submission)}
          then={
            <>
              <FocusedSubmission
                submission={submission!}
                action={goBackInCommentPath}
              ></FocusedSubmission>
              <SelectedComments>
                {commentPath.map((comment) => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    selected={true}
                    action={goBackInCommentPath}
                  />
                ))}
              </SelectedComments>
              {children.map((id) => {
                return (
                  <Comment
                    key={id}
                    comment={commentCache[id]}
                    selected={false}
                    action={selectComment}
                  />
                );
              })}
            </>
          }
          else={
            <NoFocusedSubmission>
              <NoSubmissionSelected>No submission loaded</NoSubmissionSelected>
            </NoFocusedSubmission>
          }
        />
      </CommentList>
    </DetailedView>
  );
};
