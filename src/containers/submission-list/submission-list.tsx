import styled from "styled-components";
import { SubmissionItem } from "../submission";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Nullable } from "../../types/utils";
import { getTopStories } from "../../utilities/submission.utils";

const ListOfSubmissions = styled.ul`
  display: flex;
  flex-direction: column;
  gap: var(--padding-medium);

  height: 100%;

  margin: 0;
  padding: var(--padding-small);

  border: 1px solid var(--secondary-one);
  border-radius: var(--border-small);
  background-color: var(--background-one);

  overflow: auto;
`;

const SubmissionView = styled.div`
  width: 70vw;
  padding: 20px 5px 20px 10px;

  background-color: var(--primary-dark);
`;
/**
 *  Renders a list of Hacker News submisisons (Story, Ask, Poll, Job)
 */
export const SubmissionList: FC = () => {
  const list = useRef<Nullable<HTMLUListElement>>(null);
  const topStoriesFetched = useRef(false);
  const [loading, setLoading] = useState(false);
  const [topStories, setTopStories] = useState([]);

  const fetchSubmissions = useCallback(() => {
    if (!loading) {
      fetch(getTopStories())
        .then((res) => res.json())
        .then((data) => {
          console.log("Data: ", data);
          setTopStories(data);
        })
        .catch((error) => {
          console.log(`Error fetching top stories: `, error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading]);

  useEffect(() => {
    if (!topStoriesFetched.current) {
      fetchSubmissions();
      topStoriesFetched.current = true;
    }
  }, [fetchSubmissions]);

  return (
    <SubmissionView>
      <ListOfSubmissions ref={list}>
        {topStories.slice(0, 20).map((id) => {
          return <SubmissionItem id={id} key={id} container={list} />;
        })}
      </ListOfSubmissions>
    </SubmissionView>
  );
};
