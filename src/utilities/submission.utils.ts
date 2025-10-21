import { Submission } from "../types/data";

type SubmissionTitleData = {
  id: string;
  title: string;
  reference: string;
  site: string;
};

type SubmissionSubtitleData = Omit<Submission, keyof SubmissionTitleData>;

/**
 *  Generate page request url
 */
export function getPageUrl(pageNumber: number): string {
  return `api/?p=${pageNumber}`;
}

/**
 *  Extract Submission data from the tile elmenet of a Submission
 */
function getTitleData(element: Element): SubmissionTitleData {
  const id = element.getAttribute("id")!;
  const title = element.querySelector(".titleline a")?.innerHTML ?? "";
  const reference =
    element.querySelector(".titleline a")?.getAttribute("href") ?? "";
  const site = element.querySelector(".sitestr")?.innerHTML ?? "";
  return {
    id,
    title,
    reference,
    site,
  };
}
/**
 *  Extract Submission data from the subtitle element of a Submission
 */
function getSubtitleData(element: Element): SubmissionSubtitleData {
  const timestamp = element
    .querySelector(".subline .age")
    ?.getAttribute("title")!;
  const scoreText = element.querySelector(".subline .score")?.innerHTML;
  const score = Number(scoreText?.split(" ")[0] ?? 0);
  const user = element.querySelector(".subline .hnuser")?.innerHTML!;
  const sublineLinks = element.querySelectorAll(".subline a");
  const commentsText = sublineLinks[sublineLinks.length - 1]?.innerHTML ?? "";
  const comments = Number(commentsText.split("&nbsp")[0] ?? 0);
  return {
    timestamp,
    score,
    user,
    comments,
  };
}

export function parseSubmissionsFromPage(page: string): Submission[] {
  const parser = new DOMParser();
  const pageDocument = parser.parseFromString(page, "text/html");
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

  return submissions;
}
