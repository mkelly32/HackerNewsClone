import { FC } from "react";
import { HNItem } from "../../types/data";
import { Nullable } from "../../types/utils";
import styled from "styled-components";
import { IfElse } from "../../utilities/jsx-utils";

const CommentElement = styled.div``;

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
