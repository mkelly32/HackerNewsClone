import { useState, useEffect, useCallback } from "react";
import { Maybe } from "../types/utils";
import type { Pages } from "../types/data";

/**
 *  Generate page request url
 */
function pageUrl(pageNumber: number): string {
  return `api/?p=${pageNumber}`;
}

export function useData() {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pages, setPages] = useState<Pages>({});
  const [loading, setLoading] = useState(false);
  const [firstPageLoaded, setFirstPageLoaded] = useState(false);

  const fetchNextPage = useCallback(
    (nextPageNumber: number) => {
      if (nextPageNumber > pageNumber && !loading) {
        setLoading(true);
        fetch(pageUrl(nextPageNumber))
          .then((res) => res.text())
          .then((pageAsText) => {
            console.log("page", pageAsText);
            const parser = new DOMParser();
            const pageDocument = parser.parseFromString(
              pageAsText,
              "text/html",
            );
            const submissions = pageDocument.querySelectorAll(
              ".athing.submission ",
            );
            const submissionsSubtext =
              pageDocument.querySelectorAll(".subtext");

            console.log("debug submissions", submissions, submissionsSubtext);

            setPages({
              ...pages,
              [pageNumber]: pageDocument,
            });
            setPageNumber(nextPageNumber);
          })
          .catch((error) => {
            console.log(`Error fetching page: ${pageNumber}`, error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [pageNumber, pages, loading],
  );

  /**
   *  Fetch initial page
   */
  useEffect(() => {
    if (!firstPageLoaded) {
      fetchNextPage(1);
      setFirstPageLoaded(true);
    }
  }, [fetchNextPage, firstPageLoaded]);

  useEffect(() => {
    console.log("Current data", pages);
  }, [pages]);

  return {
    pages,
  };
}
