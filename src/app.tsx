import { FC } from "react";
import { Header } from "./components/header";
import { Body } from "./components/body";
import { useData } from "./hooks/useData";
import { SubmissionProvider } from "./providers/submission-provider";

export const App: FC = () => {
  return (
    <>
      <Header />
      <SubmissionProvider>
        <Body forward="Work In Progress" />
      </SubmissionProvider>
    </>
  );
};
