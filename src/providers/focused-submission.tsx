import {
  useState,
  useContext,
  createContext,
  FC,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { HNItem } from "../types/data";
import { Nullable } from "../types/utils";

type FocusedSubmissionContextValue = {
  focused: Nullable<HNItem>;
  focusSubmission: (item: Nullable<HNItem>) => void;
};
const FocusedSubmissionContext = createContext<FocusedSubmissionContextValue>({
  focused: null,
  focusSubmission: () => null,
});

type Props = { children: ReactNode };

/**
 *
 */
export const FocusedSubmissionProvider: FC<Props> = ({ children }) => {
  const [submission, setSubmission] = useState<Nullable<HNItem>>(null);
  const focusSubmission = useCallback((item: Nullable<HNItem>) => {
    setSubmission((prev) => {
      if (prev?.id === item?.id) {
        return null;
      } else {
        return item;
      }
    });
  }, []);

  const context = useMemo(
    () => ({
      focused: submission,
      focusSubmission,
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
