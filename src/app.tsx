import { FC } from "react";
import { SubmissionList } from "./containers/submission-list";
import { FocusedSubmissionProvider } from "./providers/focused-submission";
import { styled } from "styled-components";
import { ExpandedSubmission } from "./containers/expanded-submission/expanded-submission";
import { Header } from "./containers/header";
import { PageContext } from "./providers/page-context";

const AppView = styled.div`
  height: 100vh;
  width: 100%;
`;

const MainContent = styled.div`
  display: flex;
  height: calc(100vh - 1.5rem);
  width: 100%;
`;

export const App: FC = () => {
  return (
    <PageContext>
      <FocusedSubmissionProvider>
        <AppView>
          <Header />
          <MainContent>
            <SubmissionList />
            <ExpandedSubmission />
          </MainContent>
        </AppView>
      </FocusedSubmissionProvider>
    </PageContext>
  );
};
