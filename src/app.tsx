import { FC } from "react";
import { SubmissionProvider } from "./providers/submission-provider";
import { CommentProvider } from "./providers/comment-provider";
import { SubmissionList } from "./containers/submission-list/submission-list";

export const App: FC = () => {
  return (
    <SubmissionProvider>
      <CommentProvider>
        <SubmissionList />
      </CommentProvider>
    </SubmissionProvider>
  );
};
