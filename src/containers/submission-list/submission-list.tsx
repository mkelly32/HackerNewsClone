import styled from "styled-components";
import { useSubmissionContext } from "../../providers/submission-provider";
import { SubmissionItem } from "../submission/submission";
import { FC, useEffect, useState } from "react";
import { Maybe } from "../../types/utils";
import { Submission } from "../../types/data";

const ListOfSubmissions = styled.ul`
  display: flex;
  flex-direction: column;

  gap: 12px;

  width: 100%;
  height: 100%;

  margin: 0;
  padding: 0;
`;
/**
 *  Renders a list of Hacker News submisisons (Story, Ask, Poll, Job)
 */
export const SubmissionList: FC = () => {
  const { topStories } = useSubmissionContext();

  return (
    <ListOfSubmissions>
      {topStories.map((id) => {
        return <SubmissionItem id={id} key={id} />;
      })}
    </ListOfSubmissions>
  );
};
