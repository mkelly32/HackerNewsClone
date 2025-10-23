import { FC } from "react";
import { Header } from "./components/header";
import { Body } from "./components/body";
import { useData } from "./hooks/useData";
import { SubmissionProvider } from "./providers/submission-provider";
import { CommentProvider } from "./providers/comment-provider";

export const App: FC = () => {
  return (
    <>
      <Header />
      <SubmissionProvider>
        <CommentProvider>
          <Body forward="Work In Progress" />
        </CommentProvider>
      </SubmissionProvider>
    </>
  );
};
