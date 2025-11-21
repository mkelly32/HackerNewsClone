import styled from "styled-components";
import { HNItem } from "../../types/data";
import { FC, useMemo } from "react";
import { decodeHtml } from "../../types/utils";

const Submission = styled.button`
  background: none;
  background-color: var(--background-two);

  width: 100%;
  padding: 5px;
  margin-bottom: var(--comment-margin);
  border: 1px solid var(--secondary-one);
  border-radius: var(--border-small);

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
  const decodedText = useMemo(() => {
    const encodedText = submission?.text ?? "";
    return decodeHtml(encodedText);
  }, [submission]);
  const clickHandler = () => action(submission);
  return (
    <Submission onClick={clickHandler}>
      <Header>
        {title}
        <Author>{author}</Author>
      </Header>
      <Body>{decodedText}</Body>
    </Submission>
  );
};
