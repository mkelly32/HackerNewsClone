import { FC, ReactNode } from "react";

type Props = {
  condition: boolean;
  then: ReactNode;
  else: ReactNode;
};

export const IfElse: FC<Props> = ({ condition, then, else: elseNode }) => {
  return condition ? then : elseNode;
};
