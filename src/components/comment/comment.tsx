import { FC, useMemo } from "react";
import { HNItem } from "../../types/data";
import { decodeHtml, isTruthy, Nullable } from "../../types/utils";
import styled from "styled-components";
import { IfElse } from "../../utilities/jsx-utils";

type CommentSelected = { selected: boolean };
const CommentElement = styled.div<CommentSelected>`
  display: flex;
  flex-direction: column;

  background-color: ${(props) =>
    props.selected ? "var(--primary-dark)" : "var(--background-two)"};

  margin-bottom: var(--comment-margin);
  padding: var(--padding-small);
  border: 1px solid var(--secondary-one);
  border-radius: 4px;

  overflow-wrap: anywhere;
`;

const Header = styled.div<CommentSelected>`
  font-size: 1.5rem;
  text-align: end;
  color: ${(props) => (props.selected ? "var(--white)" : "var(--black)")};

  margin-top: auto;
  margin-bottom: auto;

  padding: var(--padding-small);
  border-radius: var(--border-small) var(--border-small) 0px 0px;

  background-color: var(--secondary-one);
`;
const Body = styled.button`
  width: 100%;

  background: none;
  background-color: var(--background-two);

  border: none;
  border-radius: 0px 0px var(--border-small) var(--border-small);

  padding: var(--padding-small);
  margin: 0;

  font-size: 1rem;
  text-align: start;
`;

const Footer = styled.div<CommentSelected>`
  color: ${(props) =>
    props.selected ? "var(--secondary-one)" : "var(--primary-dark)"};

  margin-top: auto;
  margin-bottom: auto;
  padding: var(--padding-small);
  text-align: end;
`;

const LoadingComment = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
`;

type Props = {
  comment: Nullable<HNItem>;
  selected: boolean;
  action: (comment: HNItem) => void;
};
export const Comment: FC<Props> = ({ comment, selected, action }) => {
  if (comment?.dead || comment?.deleted) {
    return null;
  }

  console.log("comment", comment);

  const author = comment?.by ?? "";
  const descendants = comment?.kids?.length;
  const commentTextHtml = useMemo(() => {
    return { __html: comment?.text ?? "" };
  }, [comment]);

  const clickHandler = isTruthy(comment) ? () => action(comment) : () => null;
  return (
    <CommentElement selected={selected}>
      <IfElse
        condition={!isTruthy(comment)}
        then={<LoadingComment>Loading</LoadingComment>}
        else=<>
          <Header selected={selected}>{author}</Header>
          <Body
            dangerouslySetInnerHTML={commentTextHtml}
            onClick={clickHandler}
          />
          <Footer selected={selected}>
            {descendants
              ? descendants === 1
                ? `${descendants} descendant`
                : `${descendants} descendants`
              : null}
          </Footer>
        </>
      />
    </CommentElement>
  );
};
