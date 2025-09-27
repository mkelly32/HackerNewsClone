import { FC } from "react";
import { Header } from "./components/header";
import { Body } from "./components/body";
import { useData } from "./hooks/useData";

export const App: FC = () => {
  const { pages } = useData();
  return (
    <>
      <Header />
      <Body forward="Work In Progress" />
    </>
  );
};
