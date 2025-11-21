import { FC } from "react";
import { styled } from "styled-components";
import { Maybe } from "../../types/utils";

const SubmissionHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: baseline;
`;

const Title = styled.a`
  width: fill-available;
  min-width: 0;
  padding: 0;
  margin: 0;

  color: var(--black);

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-size: 2rem;
`;

const Descendents = styled.span`
  margin-left: auto;
  padding-left: 10px;

  font-size: 1.2rem;
  color: var(--primary-two);
  white-space: nowrap;
`;

type Props = {
  title: string;
  url: Maybe<string>;
  descendants: number;
};

/**
 *  Render a submisison title
 */
export const SubmissionTitle: FC<Props> = ({ title, url, descendants }) => {
  return (
    <SubmissionHeader>
      <Title href={url} target="_blank">
        {title}
      </Title>
      <Descendents>{descendants} comments</Descendents>
    </SubmissionHeader>
  );
};
