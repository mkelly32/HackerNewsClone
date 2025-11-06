import { FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Submission } from "../../types/data";
import { SubmissionTitle } from "../../components/submission-title/submission-title";
import { isTruthy, Maybe } from "../../types/utils";
import { getHackerNewsItem } from "../../utilities/submission.utils";
import { IfElse } from "../../utilities/jsx-utils";

const SubmisisonElement = styled.button`
  width: 100%;
  height: 8rem;
  margin: 0;
  padding: 20px;

  background-color: var(--secondary-light);
  border: 1px solid var(--secondary-dark);
`;

type Props = { id: number };
export const SubmissionItem: FC<Props> = ({ id }) => {
  const [submission, setSubmission] = useState<Maybe<Submission>>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Maybe<string>>(undefined);

  const title = submission?.title ?? "";
  const url = submission?.url ?? "";

  //  Fetch Submisison
  useCallback(() => {
    setLoading(true);
    fetch(getHackerNewsItem(id))
      .then((response) => response.json())
      .then((hnSubmission) => setSubmission(hnSubmission))
      .catch((error) => setError(String(error)))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <SubmisisonElement>
      <IfElse
        condition={loading}
        then={<div>Loading...</div>}
        else={<div>{<SubmissionTitle title={title} url={url} />}</div>}
      />
    </SubmisisonElement>
  );
};
