import { FC } from "react";
import { styled } from "styled-components";

const Meta = styled.ul`
  display: flex;
  flex-direction: row;

  width: 100%;
  margin: 0;
  padding: 0;
`;

type Props = {
  score: number;
  author: string;
};
