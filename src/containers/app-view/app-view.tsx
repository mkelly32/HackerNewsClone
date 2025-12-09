import { FC } from "react";
import { styled } from "styled-components";

import { SubmissionList } from "../submission-list";
import { Header } from "../header";
import { ExpandedSubmission } from "../expanded-submission";

const AppViewWrapper = styled.div`
  height: 100vh;
  width: 100%;
`;

const MainContent = styled.div`
  display: flex;
  height: calc(100vh - 1.5rem);
  width: 100%;
`;

export const AppView: FC = () => {
  return (
    <>
      <AppViewWrapper>
        <Header />
        <MainContent>
          <SubmissionList />
          <ExpandedSubmission />
        </MainContent>
      </AppViewWrapper>
    </>
  );
};

{
}
