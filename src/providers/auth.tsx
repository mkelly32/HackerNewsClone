import {
  FC,
  useState,
  useCallback,
  createContext,
  useContext,
  ReactNode,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { isTruthy, Maybe } from "../types/utils";
import { LoginModal } from "../components/login-modal";

type LoginArgs = {
  username: string;
  password: string;
};

type AuthContextValue = {
  setModalOpen: (value: boolean) => void;
  authenticated: boolean;
  token: Maybe<string>;
  login: (args: LoginArgs) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue>({
  setModalOpen: () => null,
  authenticated: false,
  token: undefined,
  login: () => null,
  logout: () => null,
});

type Props = { children: ReactNode };

export const AuthProvider: FC<Props> = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [token, setToken] = useState<Maybe<string>>();
  const authenticated = useMemo(() => isTruthy(token), [token]);

  const login = useCallback(() => {
    setToken(undefined);
  }, []);

  const logout = useCallback(() => {
    setToken(undefined);
  }, []);

  const context: AuthContextValue = {
    setModalOpen,
    authenticated,
    token,
    login,
    logout,
  };
  return (
    <>
      <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
      {createPortal(
        <LoginModal open={modalOpen} closeModal={() => setModalOpen(false)} />,
        document.getElementById("root")!,
      )}
    </>
  );
};

export const useAuthContext = () => useContext(AuthContext);
