import { FC, ReactNode } from "react";

type IfElseProps = {
  condition: boolean;
  then: ReactNode;
  else: ReactNode;
};

type IfProps = {
  condition: boolean;
  then: ReactNode;
};

export const IfElse: FC<IfElseProps> = ({
  condition,
  then,
  else: elseNode,
}) => {
  return condition ? then : elseNode;
};

export const If: FC<IfProps> = ({ condition, then }) => {
  return condition ? then : null;
};
