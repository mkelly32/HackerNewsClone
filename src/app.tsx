import { FC } from "react";
import { Header } from "./components/header";
import { Body } from "./components/body";

export const App: FC = () => {
  return (
    <>
      <Header />
      <Body forward="Work In Progress" />
    </>
  );
};
