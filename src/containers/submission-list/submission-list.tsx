import styled from "styled-components";
import { useSubmissionContext } from "../../providers/submission-provider";
import { SubmissionItem } from "../submission/submission";
import { FC, useEffect, useRef, useState } from "react";
import { Maybe, Nullable } from "../../types/utils";
import { HNItem } from "../../types/data";

const ListOfSubmissions = styled.ul`
  display: flex;
  flex-direction: column;

  gap: 12px;

  width: 80vw;
  height: 60vh;

  margin: 0;
  padding: 0;

  overflow: auto;
`;
/**
 *  Renders a list of Hacker News submisisons (Story, Ask, Poll, Job)
 */
export const SubmissionList: FC = () => {
  const list = useRef<Nullable<HTMLUListElement>>(null);
  const { topStories } = useSubmissionContext();

  return (
    <ListOfSubmissions ref={list}>
      {topStories.slice(0, 20).map((id) => {
        return <SubmissionItem id={id} key={id} container={list} />;
      })}
    </ListOfSubmissions>
  );
};
