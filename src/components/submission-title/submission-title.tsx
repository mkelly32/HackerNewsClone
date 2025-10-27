import { FC } from "react";
import { styled } from "styled-components";
import { Maybe } from "../../types/utils";

const Title = styled.a`
  width: 100%;
  padding: 0;
  margin: 0;

  color: var(--black);

  font-size: 2rem;
`;

type Props = {
  title: string;
  url: Maybe<string>;
};

/**
 *  Render a submisison title
 */
export const SubmissionTitle: FC<Props> = ({ title, url }) => {
  return <Title href={url}>{title}</Title>;
};
