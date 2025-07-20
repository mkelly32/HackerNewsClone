import { FC } from 'react';
import styled from 'styled-components';

const Banner = styled.div`
  background-color: tan;
  padding: 1rem 2rem;
  font-family: sans-serif;
  font-size: 1.5rem;
  
  &:hover {
    background-color: orange;
  }
`;

const Header: FC = () => {
  return (
    <Banner>Locator</Banner>
  );
};

export { Header };
