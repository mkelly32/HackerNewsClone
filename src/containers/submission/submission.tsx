import { FC } from "react";
import styled from "styled-components";

const SubmissionItem = styled.li``;

type Props = { id: number };
export const Submission: FC<Props> = ({ id }) => {
  return <SubmissionItem>{id}</SubmissionItem>;
};
