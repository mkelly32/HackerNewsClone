import { FC, useRef, useEffect, useCallback, useMemo } from "react";
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
  overflow: auto;
`;

export const ExpandedSubmission: FC<Props> = () => {
  const { focused: submission } = useFocusedSubmissionContext();
  const loading = useRef<number[]>([]);
  const commentCache = useRef<CommentCache>({});
  const comments = useMemo(() => submission?.kids ?? [], [submission]);

  console.log("EXPANDED SUBMISSION", submission);

  const fetchComment = useCallback((id: number) => {
    if (!loading.current.includes(id)) {
      loading.current.push(id);
      fetch(getHackerNewsItem(id))
        .then((res) => res.json())
        .then((comment: HNItem) => {
          commentCache.current[comment.id] = comment;
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
      return !(id in commentCache.current) && !loading.current.includes(id);
    });
    commentsToFetch.forEach(fetchComment);
  }, [submission]);

  return (
    <DetailedView>
      content
      {comments.map((id) => (
        <Comment key={id} comment={commentCache.current[id]} />
      ))}
    </DetailedView>
  );
};
