import { FC } from "react";
import { styled } from "styled-components";

const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60;
const SECONDS_IN_DAY = SECONDS_IN_HOUR * 24;
const UNIX_TIME_FACTOR_OFFSET = 1000;

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
const Time = styled.span`
  padding-left: 10px;
`;

export const SubmissionTime: FC<{ submissionTime: number }> = ({
  submissionTime,
}) => {
  let submissionAge = "";
  try {
    const currentTime = Math.floor(
      new Date().getTime() / UNIX_TIME_FACTOR_OFFSET,
    ); // Convert 'now' to UNIX time
    const submissionAgeInSeconds = currentTime - submissionTime;
    switch (true) {
      case submissionAgeInSeconds < SECONDS_IN_DAY:
        const submissionAgeInHours = Math.floor(
          submissionAgeInSeconds / SECONDS_IN_HOUR,
        );
        if (submissionAgeInHours < 2) {
          const ageInMinutes = Math.floor(
            submissionAgeInSeconds / SECONDS_IN_MINUTE,
          );
          const minuteModifier = ageInMinutes > 1 ? "s" : "";
          submissionAge = `${ageInMinutes} minute${minuteModifier} ago`;
        } else {
          const hourModifier = submissionAgeInHours > 1 ? "s" : "";
          submissionAge = `${submissionAgeInHours} hour${hourModifier} ago`;
        }
        break;
      case submissionAgeInSeconds < 7 * SECONDS_IN_DAY:
        const ageInDays = Math.floor(submissionAgeInSeconds / SECONDS_IN_DAY);
        const dayModifier = ageInDays > 1 ? "s" : "";
        submissionAge = `${ageInDays} day${dayModifier} ago`;
        break;
      default:
        const localizedDate = new Date(submissionTime).toLocaleDateString();
        submissionAge = localizedDate;
        break;
    }
  } catch (error) {
    console.log(error);
    submissionAge = "Submission time unknown";
  }

  return <Time>{submissionAge}</Time>;
};

type Props = {
  score: number;
  author: string;
  submissionTime: number;
};

export const SubmissionMeta: FC<Props> = ({
  score,
  author,
  submissionTime,
}) => {
  const largeScore = score / 1000 >= 1;
  const scoreAdditionalStyles = largeScore ? "bigScore" : "";

  return (
    <Meta>
      <Author>by: {author}</Author>
      <SubmissionTime submissionTime={submissionTime} />
      <ScoreDecoration className={scoreAdditionalStyles}>
        <Score>{score}</Score>
      </ScoreDecoration>
    </Meta>
  );
};
