import { useState, useEffect, useCallback } from "react";
import type { Pages, Submission } from "../types/data";

/**
 *  Generate submission detailed view url
 */
function getSubmissionUrl(id: string): string {
  return `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
}

export function useData() {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pages, setPages] = useState<Pages>({});
  const [loading, setLoading] = useState(false);
  const [firstPageLoaded, setFirstPageLoaded] = useState(false);

  const fetchComments = useCallback((id: string) => {
    console.log("fetching submission ", id);
    fetch(getSubmissionUrl(id))
      .then((res) => res.json())
      .then((response) => {
        console.log("submission response", response);
      })
      .catch((error) => {
        console.log(error);
      });

    //  Todo
  }, []);

  /**
   *  Fetch initial page
   */
  useEffect(() => {
    if (!firstPageLoaded) {
      fetchPage(1);
      setFirstPageLoaded(true);
    }
  }, [fetchPage, firstPageLoaded]);

  useEffect(() => {
    console.log("Current data", pages);
    const firstSubmission = pages[1] && pages[1][1];
    console.log("first submission", firstSubmission);
    if (firstSubmission) {
      fetchComments(firstSubmission.id);
    }
  }, [pages, fetchComments]);

  return {
    pages,
  };
}
