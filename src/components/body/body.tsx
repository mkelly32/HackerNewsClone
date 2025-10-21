import { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSubmisisonContext } from "../../providers/submission-provider";

const BodyContainer = styled.div`
  display: flex;
  flex-directions: row;
  font-size: 1.5rem;
`;

const Panel = styled.div`
  max-width: 800px;
  padding: min(32px, 10%);
  font-family: sans-serif;
  font-size: 2.5rem;
`;

const MainContent = styled.div``;

type BodyProps = {
  forward: string;
};

export const Body: FC<BodyProps> = ({ forward }) => {
  const { state, loading, fetchSubmissions } = useSubmisisonContext();
  const done = useRef(false);

  useEffect(() => {
    console.log("STATE:", state, loading);
    if (!done.current) {
      console.log("fetching submissions");
      fetchSubmissions();
      done.current = true;
    }
  }, [fetchSubmissions, state]);

  return (
    <BodyContainer>
      <Panel>{forward}</Panel>
      <MainContent>Not collapsed</MainContent>
    </BodyContainer>
  );
};
