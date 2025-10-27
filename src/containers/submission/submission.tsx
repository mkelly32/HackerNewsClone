import { FC } from "react";
import styled from "styled-components";
import { Submission } from "../../types/data";

const SubmissionListItem = styled.li`
  display: flex;

  margin: 0;
  padding: 20px;
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
      id:{id} type:{type} title:{title} by:{by} score:{score} time:{time} url:
      {url} descendants:{descendants} kids:{kids}
    </SubmissionListItem>
  );
};
