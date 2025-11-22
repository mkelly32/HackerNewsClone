import { FC } from "react";
import { SubmissionList } from "./containers/submission-list";
import { FocusedSubmissionProvider } from "./providers/focused-submission";
import styled from "styled-components";
import { ExpandedSubmission } from "./containers/expanded-submission/expanded-submission";
import { Header } from "./containers/header";
import { PageContext } from "./providers/page-context";

const AppView = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const App: FC = () => {
  return (
    <PageContext>
      <FocusedSubmissionProvider>
        <Header />
        <AppView>
          <SubmissionList />
          <ExpandedSubmission />
        </AppView>
      </FocusedSubmissionProvider>
    </PageContext>
  );
};
