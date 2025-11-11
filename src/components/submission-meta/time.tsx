import { FC } from "react";
import { styled } from "styled-components";

const Time = styled.span`
  padding-left: 10px;
`;

const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60;
const SECONDS_IN_DAY = SECONDS_IN_HOUR * 24;
const UNIX_TIME_FACTOR_OFFSET = 1000;

type Props = { submissionTime: number };

export const SubmissionTime: FC<Props> = ({ submissionTime }) => {
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
        const localizedDate = new Date(
          submissionTime * UNIX_TIME_FACTOR_OFFSET,
        ).toLocaleDateString();
        submissionAge = localizedDate;
        break;
    }
  } catch (error) {
    console.log(error);
    submissionAge = "Submission time unknown";
  }

  return <Time>{submissionAge}</Time>;
};
