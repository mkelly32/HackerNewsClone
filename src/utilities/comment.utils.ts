import { Comment } from "../types/data";
import { isTruthy } from "../types/utils";

/**
 *  Generate url for fetching comment
 */
function getCommentUrl(id: number): string {
  return `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
}

/**
 *  Request all of the given comments. Return an array of the successful fetches
 */
export function getComments(ids: number[]): Promise<Comment[]> {
  const success: Comment[] = [];

  const requests = ids.map((id) => {
    return fetch(getCommentUrl(id))
      .then((res) => res.json())
      .then((comment: Comment) => {
        return comment;
      })
      .catch((error) => {
        console.log(`Error fetching comment ${id}`, error);
        return null;
      });
  });

  const comments = Promise.all(requests).then((comments) =>
    comments.filter(isTruthy),
  );

  return comments;
}
