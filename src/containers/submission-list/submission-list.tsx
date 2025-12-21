import styled from "styled-components";
import { SubmissionItem } from "../submission";
import { FC, useRef } from "react";
import { Nullable } from "../../types/utils";
import { usePageContext } from "../../providers/page-context";
import { useFocusedSubmissionContext } from "../../providers/focused-submission";

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

type SubmissionViewProps = {
  submissionFocused: boolean;
};

const SubmissionView = styled.div<SubmissionViewProps>`
  flex-basis: 800px;
  min-width: 800px;
  max-width: ${(props) => (props.submissionFocused ? "60vw" : "100%")};
  width: 100%;
  flex-grow: 1;
  padding: 20px 5px 20px 10px;

  background-color: var(--primary-dark);
`;
/**
 *  Renders a list of Hacker News submisisons (Story, Ask, Poll, Job)
 */
export const SubmissionList: FC = () => {
  const list = useRef<Nullable<HTMLUListElement>>(null);
  const { focused } = useFocusedSubmissionContext();
  const { selected } = usePageContext();

  return (
    <SubmissionView submissionFocused={Boolean(focused)}>
      <ListOfSubmissions ref={list}>
        {selected.map((id) => {
          return <SubmissionItem id={id} key={id} container={list} />;
        })}
      </ListOfSubmissions>
    </SubmissionView>
  );
};
