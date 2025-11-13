import { FC, useRef, useEffect, useCallback, useMemo, useState } from "react";
import { styled } from "styled-components";
import { HNItem } from "../../types/data";
import { getHackerNewsItem } from "../../utilities/submission.utils";
import { useFocusedSubmissionContext } from "../../providers/focused-submission";
import { Comment } from "../../components/comment";

type Props = {};
type CommentCache = {
  [id: number]: HNItem;
};

const DetailedView = styled.div`
  width: 20vw;
  height: 100vh;

  padding: 20px 10px 20px 5px;

  background-color: var(--secondary-light);
`;

const CommentList = styled.div`
  overflow: auto;
  height: 100%;

  border: 1px solid var(--black);
`;

export const ExpandedSubmission: FC<Props> = () => {
  const { focused: submission } = useFocusedSubmissionContext();
  const loading = useRef<number[]>([]);
  const [commentCache, setCommentCache] = useState<CommentCache>({});
  const comments = useMemo(() => submission?.kids ?? [], [submission]);

  console.log("EXPANDED SUBMISSION", submission);

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
    const kids = submission?.kids ?? [];
    const commentsToFetch = kids.filter((id) => {
      return !(id in commentCache) && !loading.current.includes(id);
    });
    commentsToFetch.forEach(fetchComment);
  }, [submission, commentCache]);

  return (
    <DetailedView>
      <CommentList>
        {comments.map((id, index) => {
          return <Comment key={id} comment={commentCache[id]} />;
        })}
      </CommentList>
    </DetailedView>
  );
};
