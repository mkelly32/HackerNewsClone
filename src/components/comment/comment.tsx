import { FC } from "react";
import { HNItem } from "../../types/data";
import { Nullable } from "../../types/utils";
import styled from "styled-components";
import { IfElse } from "../../utilities/jsx-utils";

const CommentElement = styled.div`
  background-color: var(--primary-light);

  margin-top: 10px;
  padding: 5px;
  border: 1px solid var(--black);
  border-radius: 4px;

  overflow-wrap: anywhere;
`;

type Props = { comment: Nullable<HNItem> };
export const Comment: FC<Props> = ({ comment }) => {
  if (comment !== null) {
    console.log("COMMENT", comment);
  }

  return (
    <CommentElement>
      <IfElse
        condition={comment === null}
        then={"Loading"}
        else={comment?.text}
      />
    </CommentElement>
  );
};
