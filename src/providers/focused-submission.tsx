import {
  useState,
  useContext,
  createContext,
  FC,
  ReactNode,
  useMemo,
} from "react";
import { HNItem } from "../types/data";
import { Nullable } from "../types/utils";

type FocusedSubmissionContextValue = {
  focused: Nullable<HNItem>;
  setFocused: (submission: HNItem) => void;
};
const FocusedSubmissionContext = createContext<FocusedSubmissionContextValue>({
  focused: null,
  setFocused: () => null,
});

type Props = { children: ReactNode };

/**
 *
 */
export const FocusedSubmissionProvider: FC<Props> = ({ children }) => {
  const [submission, setSubmission] = useState<Nullable<HNItem>>(null);
  const context = useMemo(
    () => ({
      focused: submission,
      setFocused: setSubmission,
    }),
    [submission],
  );
  return (
    <FocusedSubmissionContext value={context}>
      {children}
    </FocusedSubmissionContext>
  );
};

export const useFocusedSubmissionContext = () =>
  useContext(FocusedSubmissionContext);
