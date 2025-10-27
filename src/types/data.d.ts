export type Story = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: "story";
  url: string;
};

export type Ask = {
  by: string;
  descendants: number;
  id: number;
  url: undefined;
  kids: number[];
  score: number;
  text: string;
  time: number;
  title: string;
  type: "story";
};

export type Job = {
  by: string;
  id: number;
  descendants: undefined;
  kids: undefined;
  score: number;
  text: string;
  time: number;
  title: string;
  type: "job";
  url: string;
};

export type Poll = {
  by: string;
  descendants: number;
  id: number;
  url: undefined;
  kids: number[];
  parts: number[];
  score: number;
  text: string;
  time: number;
  title: string;
  type: "poll";
};

export type PollOpt = {
  by: string;
  id: number;
  poll: number;
  score: number;
  text: string;
  time: number;
  type: "pollopt";
};

export type Submission = {
  id: number;
  by: string;
  title: string;
  time: number;
  score: number;
  type: SubmissionType;
  url?: string;
  text?: string;
  descendants?: number;
  kids?: number[];
  parts?: number[];
};

export type SubmissionType = "story" | "job" | "poll";

export type Comment = {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
  type: "comment";
};
