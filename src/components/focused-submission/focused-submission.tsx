import styled from "styled-components";
import { HNItem } from "../../types/data";
import { FC } from "react";

const Submission = styled.button`
  background: none;
  background-color: var(--primary-light);

  padding: 5px;
  margin: 10px 5px;
  border: 1px solid var(--black);
  border-radius: 4px;

  overflow-wrap: anywhere;
`;

const Header = styled.div`
  font-size: 1.5rem;
  padding: 4px;
  border-radius: 4px;
  background-color: var(--secondary-light);
`;
const Author = styled.div`
  font-size: 1rem;

  text-align: end;
`;
const Body = styled.div`
  margin-top: 15px;
`;

type Props = { submission: HNItem; action: (submission: HNItem) => void };

export const FocusedSubmission: FC<Props> = ({ submission, action }) => {
  const title = submission?.title ?? "";
  const author = submission.by ?? "";
  const text = submission?.text ?? "";
  const clickHandler = () => action(submission);
  return (
    <Submission onClick={clickHandler}>
      <Header>
        {title}
        <Author>{author}</Author>
      </Header>
      <Body>{text}</Body>
    </Submission>
  );
};
