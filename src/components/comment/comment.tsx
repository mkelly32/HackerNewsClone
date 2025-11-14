import { FC } from "react";
import { HNItem } from "../../types/data";
import { isTruthy, Nullable } from "../../types/utils";
import styled from "styled-components";
import { IfElse } from "../../utilities/jsx-utils";

const CommentElement = styled.div`
  background-color: var(--primary-light);

  margin: 10px 5px;
  padding: 5px;
  border: 1px solid var(--black);
  border-radius: 4px;

  overflow-wrap: anywhere;
`;

const Header = styled.div`
  font-size: 1.5rem;
  text-align: end;

  background-color: var(--secondary-light);
`;
const Body = styled.button`
  backgound: none;

  padding: 0;
  margin: 0;

  font-size: 1rem;
`;

type Props = { comment: Nullable<HNItem>; action: (comment: HNItem) => void };
export const Comment: FC<Props> = ({ comment, action }) => {
  const author = comment?.by ?? "";
  const text = comment?.text ?? "";
  const clickHandler = isTruthy(comment) ? () => action(comment) : () => null;
  return (
    <CommentElement>
      <IfElse
        condition={!isTruthy(comment)}
        then={"Loading"}
        else=<>
          <Header>{author}</Header>
          <Body onClick={clickHandler}>{text}</Body>
        </>
      />
    </CommentElement>
  );
};
