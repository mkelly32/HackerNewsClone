import { FC } from "react";
import { styled } from "styled-components";

const Meta = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  margin: 0;
  padding: 0;

  font-size: 1.2rem;
`;

const Author = styled.span`
  color: var(--black);
`;
const ScoreDecoration = styled.span`
  display: flex;
  align-items: center;
  height: 2rem;
  width: 2rem;
  margin-left: auto;
  background-color: var(--secondary-dark);
  border-radius: 50%;

  &.bigScore {
  height: 3rem;
  width: 3rem;
`;
const Score = styled.span`
  margin: auto;
  color: var(--white);
`;

type Props = {
  score: number;
  author: string;
};

export const SubmissionMeta: FC<Props> = ({ score, author }) => {
  const largeScore = score / 1000 >= 1;
  const scoreAdditionalStyles = largeScore ? "bigScore" : "";
  return (
    <Meta>
      <Author>by: {author}</Author>
      <ScoreDecoration className={scoreAdditionalStyles}>
        <Score>{score}</Score>
      </ScoreDecoration>
    </Meta>
  );
};
