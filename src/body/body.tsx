import { FC } from 'react'
import styled from 'styled-components';

const BodyContainer = styled.div`
  display: flex;
  flex-directions: row;
  font-fize: 1.5rem;
`;

const Panel = styled.div`
  max-width: 800px;
  padding: min(32px, 10%);
  font-family: sans-serif;
  font-fize: 2.5rem;
`;

const MainContent = styled.div`
`;

type BodyProps = {
  forward: string;
}

const Body: FC<BodyProps> = (props) => {
  const forward = props.forward;
  return (
    <BodyContainer>
      <Panel>
        {forward}
      </Panel>
      <MainContent>
        Not collapsed
      </MainContent>
    </BodyContainer>
  );
}

export {
  Body
};
