import { FC, ReactNode } from "react";

type IfProps = {
  condition: boolean;
  then: ReactNode;
};

export const If: FC<IfProps> = ({ condition, then }) => {
  return condition ? then : null;
};

type IfElseProps = {
  condition: boolean;
  then: ReactNode;
  else: ReactNode;
};

export const IfElse: FC<IfElseProps> = ({
  condition,
  then,
  else: elseNode,
}) => {
  return condition ? then : elseNode;
};
