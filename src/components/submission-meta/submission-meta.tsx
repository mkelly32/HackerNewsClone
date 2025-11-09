import { FC } from "react";
import { styled } from "styled-components";

const Meta = styled.div`
  margin: 0;
  padding: 0;

  font-size: 1.2rem;
`;

type Props = {
  score: number;
  author: string;
};

export const SubmissionMeta: FC<Props> = ({ score, author }) => {
  return (
    <Meta>
      Score: {score} Author: {author}
    </Meta>
  );
};
