import { FC } from 'react';
import { Header } from './header';
import { Body } from './body';

const App: FC = () => {
  return (
    <>
      <Header />
      <Body forward='Work In Progress' />
    </>
  );
}

export { App };
