import { FC } from "react";
import { styled } from "styled-components";
import { Domain } from "./domain";
import { SubmissionTime } from "./time";

const Meta = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  margin: 0;
  padding: 0;

  font-size: 1.2rem;
  color: var(--primary-two);
`;

const Author = styled.span`
  color: var(--black);
  padding-left: 4px;
`;
const ScoreDecoration = styled.span`
  display: flex;
  align-items: center;
  height: 2.2rem;
  width: 2.2rem;
  margin-left: auto;

  border: 1px solid var(--secondary-one);
  border-radius: 50%;

  &.bigScore {
  height: 3rem;
  width: 3rem;
`;
const Score = styled.span`
  margin: auto;
  color: var(--primary-two);
`;

type Props = {
  score: number;
  author: string;
  submissionTime: number;
  url: string;
};

export const SubmissionMeta: FC<Props> = ({
  score,
  author,
  submissionTime,
  url,
}) => {
  const largeScore = score / 1000 >= 1;
  const scoreAdditionalStyles = largeScore ? "bigScore" : "";

  return (
    <>
      <Domain url={url} />
      <Meta>
        by:<Author>{author}</Author>
        <SubmissionTime submissionTime={submissionTime} />
        <ScoreDecoration className={scoreAdditionalStyles}>
          <Score>{score}</Score>
        </ScoreDecoration>
      </Meta>
    </>
  );
};
