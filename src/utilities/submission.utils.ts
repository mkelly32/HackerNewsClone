import { Submission } from "../types/data";
const BASE = "https://hacker-news.firebaseio.com/v0";

/**
 *  Generate page request url
 */
export function getTopStories(): string {
  return `${BASE}/topstories.json`;
}

/**
 *  Retrieve a Story | Ask | JOB | Poll | PollOpt | Comment
 */
export function getHackerNewsItem(id: number): string {
  return `${BASE}/item/${id}`;
}
