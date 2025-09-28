import { useState, useEffect, useCallback } from "react";
import { Maybe } from "../types/utils";
import type { Pages, Submission } from "../types/data";

/**
 *  Generate page request url
 */
function pageUrl(pageNumber: number): string {
  return `api/?p=${pageNumber}`;
}

type SubmissionTitleData = {
  id: string;
  title: string;
  reference: string;
  site: string; //  Unsure about this property
};
/**
 *  Extract Submission data from the tile elmenet of a Submission
 */
function getTitleData(element: Element): SubmissionTitleData {
  const id = element.getAttribute("id")!;
  const title = element.querySelector(".titleline a")?.innerHTML!;
  const reference = element
    .querySelector(".titleline a")
    ?.getAttribute("href")!;
  const site = element.querySelector(".sitestr")?.innerHTML!;
  return {
    id,
    title,
    reference,
    site,
  };
}

type SubmissionSubtitleData = Omit<Submission, keyof SubmissionTitleData>;
/**
 *  Extract Submission data from the subtitle element of a Submission
 */
function getSubtitleData(element: Element): SubmissionSubtitleData {
  const timestamp = element
    .querySelector(".subline .age")
    ?.getAttribute("title")!;
  const scoreText = element.querySelector(".subline .score")?.innerHTML;
  const score = Number(scoreText?.split(" ")[0] ?? 0);
  const author = element.querySelector(".subline .hnuser")?.innerHTML!;
  const sublineLinks = element.querySelectorAll(".subline a");
  const commentsText = sublineLinks[sublineLinks.length - 1].innerHTML;
  const comments = Number(commentsText.split("&nbsp")[0] ?? 0);
  return {
    timestamp,
    score,
    author,
    comments,
  };
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
            const submissionTitles = Array.from(
              pageDocument.querySelectorAll(".athing.submission"),
            );
            const submissionSubtitles = Array.from(
              pageDocument.querySelectorAll(".subtext"),
            );
            const submissions: Submission[] = submissionTitles.map(
              (submissionTitle, index) => {
                const submissionSubtitle = submissionSubtitles[index];

                return {
                  ...getTitleData(submissionTitle),
                  ...getSubtitleData(submissionSubtitle),
                };
              },
            );

            console.log("debug submissions", submissions);

            setPages({
              ...pages,
              [pageNumber]: submissions,
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
