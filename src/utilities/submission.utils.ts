/**
 *  Generate page request url
 */
export function getTopStories(): string {
  return `api/topstories.json`;
}

/**
 *  Retrieve a Story | Ask | JOB | Poll | PollOpt | Comment
 */
export function getHackerNewsItem(id: number): string {
  return `api/item/${id}.json`;
}
