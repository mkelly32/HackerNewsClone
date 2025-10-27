import { FC } from "react";
import styled from "styled-components";
import { Submission } from "../../types/data";
import { SubmissionTitle } from "../../components/submission-title/submission-title";

const SubmissionListItem = styled.li`
  margin: 0;
  padding: 20px;

  background-color: var(--secondary-light);
  border: 1px solid var(--secondary-dark);
`;

export const SubmissionItem: FC<Submission> = ({
  id,
  type,
  title,
  by,
  score,
  time,
  url,
  descendants,
  kids,
}) => {
  return (
    <SubmissionListItem>
      <SubmissionTitle title={title} url={url} />
      id:{id} type:{type} title:{title} by:{by} score:{score} time:{time} url:
      {url} descendants:{descendants} kids:{kids}
    </SubmissionListItem>
  );
};
