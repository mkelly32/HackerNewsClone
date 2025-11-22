/**
 *  Generate page request url
 */
export function getTopSubmissions(): string {
  return `api/topstories.json`;
}

export function getBestSubmissions(): string {
  return `api/beststories.json`;
}

export function getPastSubmissions(): string {
  return `api/topstories.json`;
}

export function getNewSubmisisons(): string {
  return `api/newstories.json`;
}

export function getAskSubmisisons(): string {
  return `api/askstories.json`;
}

export function getJobSubmissions(): string {
  return `api/jobstories.json`;
}

/**
 *  Retrieve a Story | Ask | JOB | Poll | PollOpt | Comment
 */
export function getHackerNewsItem(id: number): string {
  return `api/item/${id}.json`;
}
