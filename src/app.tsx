import { FC } from "react";
import { FocusedSubmissionProvider } from "./providers/focused-submission";
import { PageContext } from "./providers/page-context";
import { AuthProvider } from "./providers/auth";
import { AppView } from "./containers/app-view/app-view";

export const App: FC = () => {
  return (
    <PageContext>
      <FocusedSubmissionProvider>
        <AppView />
      </FocusedSubmissionProvider>
    </PageContext>
  );
};
