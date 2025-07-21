import { FC } from "react";
import styled from "styled-components";

const Banner = styled.div`
  background-color: grey;
  padding: 1rem 2rem;
  font-family: sans-serif;
  font-size: 1.5rem;

  &:hover {
    background-color: brown;
  }
`;

export const Header: FC = () => {
  return <Banner>Locator</Banner>;
};
