import { FC } from "react";
import { SubmissionList } from "./containers/submission-list";
import { FocusedSubmissionProvider } from "./providers/focused-submission";
import styled from "styled-components";
import { ExpandedSubmission } from "./containers/expanded-submission/expanded-submission";

const AppView = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const App: FC = () => {
  return (
    <FocusedSubmissionProvider>
      <AppView>
        <SubmissionList />
        <ExpandedSubmission />
      </AppView>
    </FocusedSubmissionProvider>
  );
};
