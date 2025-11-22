import styled from "styled-components";
import { SubmissionItem } from "../submission";
import { FC, useRef } from "react";
import { Nullable } from "../../types/utils";
import { usePageContext } from "../../providers/page-context";

const ListOfSubmissions = styled.ul`
  display: flex;
  flex-direction: column;
  gap: var(--padding-medium);

  height: 100%;

  margin: 0;
  padding: var(--padding-small);

  border: 1px solid var(--secondary-one);
  border-radius: var(--border-small);
  background-color: var(--background-one);

  overflow: auto;
`;

const SubmissionView = styled.div`
  width: 70vw;
  padding: 20px 5px 20px 10px;

  background-color: var(--primary-dark);
`;
/**
 *  Renders a list of Hacker News submisisons (Story, Ask, Poll, Job)
 */
export const SubmissionList: FC = () => {
  const list = useRef<Nullable<HTMLUListElement>>(null);
  const { selected } = usePageContext();

  return (
    <SubmissionView>
      <ListOfSubmissions ref={list}>
        {selected.map((id) => {
          return <SubmissionItem id={id} key={id} container={list} />;
        })}
      </ListOfSubmissions>
    </SubmissionView>
  );
};
