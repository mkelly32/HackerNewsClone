import { FC, useCallback, useMemo, useState } from "react";
import { isTruthy } from "../../types/utils";
import styled from "styled-components";
import { If, IfElse } from "../../utilities/jsx-utils";
import { CommentCache } from "../../types/comment-cache";

type CSSProps = { selected: boolean; reply: boolean };
const CommentElement = styled.div<CSSProps>`
  display: flex;
  flex-direction: column;
  margin: var(--comment-margin) 0px;
  padding: ${(props) => (props.reply ? "0px" : "var(--padding-small)")};
  margin-left: ${(props) => (props.reply ? "8px" : "0px")};

  background-color: var(--background-two);

  border: 1px solid var(--secondary-one);

  overflow-wrap: anywhere;
`;

const Header = styled.div<CSSProps>`
  font-size: 1.5rem;
  text-align: end;
  color: ${(props) => (props.selected ? "var(--white)" : "var(--black)")};

  margin-top: auto;
  margin-bottom: auto;

  padding: var(--padding-small);

  background-color: var(--secondary-one);
`;
const Body = styled.button`
  width: 100%;
  max-width: 100%;

  background: none;
  background-color: var(--background-two);

  border: none;
  border-radius: 0px 0px var(--border-small) var(--border-small);

  padding: var(--padding-small);
  margin: 0;

  font-size: 1rem;
  text-align: start;

  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: anywhere;
  overflow-x: hidden;

  * {
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: anywhere;
    overflow-x: hidden;
  }
`;

const Footer = styled.div<CSSProps>`
  display: flex;
  justify-content: space-between;
  color: ${(props) =>
    props.selected ? "var(--secondary-one)" : "var(--primary-dark)"};

  margin-top: auto;
  margin-bottom: auto;
  padding: var(--padding-small);

  background-color: ${(props) =>
    props.selected ? "var(--primary-dark)" : "var(--background-two)"};
`;

const ShowReplies = styled.button<CSSProps>`
  background: none;
  padding: 0;
  margin: 0;
  border: none;
  color: ${(props) =>
    props.selected ? "var(--secondary-one)" : "var(--primary-dark)"};
`;

const LoadingComment = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
`;

type Props = {
  id: number;
  cache: CommentCache;
  fetchComment: (id: number) => void;
  reply: boolean;
};
export const Comment: FC<Props> = ({ id, cache, fetchComment, reply }) => {
  const comment = useMemo(() => cache[id], [id, cache]);
  const replies = useMemo(() => comment?.kids ?? [], [comment]);
  const [selected, setSelected] = useState(false);
  const commentTextHtml = useMemo(() => {
    return { __html: comment?.text ?? "" };
  }, [comment]);

  const clickHandler = useCallback(() => {
    setSelected((selected) => !selected);
    replies.forEach((id) => fetchComment(id));
  }, [replies, fetchComment]);

  const author = comment?.by ?? "";
  const descendants = comment?.kids?.length;
  const commentHasReplies = isTruthy(descendants);
  const descendantsText =
    descendants === 1
      ? `${descendants} descendant`
      : `${descendants} descendants`;

  const valid = !(comment?.dead || comment?.deleted);

  return (
    <If
      condition={valid}
      then={
        <CommentElement selected={selected} reply={reply}>
          <IfElse
            condition={!isTruthy(comment)}
            then=<LoadingComment>Loading...</LoadingComment>
            else=<>
              <Header selected={selected} reply={reply}>
                {author}
              </Header>
              <Body
                dangerouslySetInnerHTML={commentTextHtml}
                onClick={clickHandler}
              />
              <Footer selected={selected} reply={reply}>
                <If
                  condition={commentHasReplies}
                  then={
                    <>
                      <ShowReplies
                        selected={selected}
                        reply={reply}
                        onClick={clickHandler}
                      >
                        View Replies
                      </ShowReplies>
                      {descendantsText}
                    </>
                  }
                />
              </Footer>
            </>
          />
          <If
            condition={selected}
            then={replies.map((replyId) => (
              <Comment
                key={replyId}
                id={replyId}
                cache={cache}
                fetchComment={fetchComment}
                reply={true}
              />
            ))}
          />
        </CommentElement>
      }
    />
  );
};
