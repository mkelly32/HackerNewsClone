import styled from "styled-components";
import { useSubmisisonContext } from "../../providers/submission-provider";
import { Submission } from "../submission/submission";
import { FC } from "react";

const ListOfSubmissions = styled.ul`
  width: 100%;
  height: 100%;

  margin: 0;
  padding: 0;
`;
/**
 *  Renders a list of Hacker News submisisons (Story, Ask, Poll, Job)
 */
export const SubmissionList: FC = () => {
  const { submissionIds } = useSubmisisonContext();
  return (
    <ListOfSubmissions>
      {submissionIds.map((id) => (
        <Submission id={id} key={id} />
      ))}
    </ListOfSubmissions>
  );
};
