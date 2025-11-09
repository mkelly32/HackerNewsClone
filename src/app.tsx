import { FC } from "react";
import { CommentProvider } from "./providers/comment-provider";
import { SubmissionList } from "./containers/submission-list/submission-list";

export const App: FC = () => {
  return (
    <CommentProvider>
      <SubmissionList />
    </CommentProvider>
  );
};
