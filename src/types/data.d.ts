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
  score: number;
  text: string;
  time: number;
  title: string;
  type: "job";
  url: "";
};

export type Poll = {
  by: string;
  descendants: number;
  id: number;
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

export type Submission = Story | Ask | Job | Poll;

export type Comment = {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
  type: "comment";
};
