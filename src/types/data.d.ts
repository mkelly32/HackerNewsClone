export type Pages = {
  [pageNumber: number]: Submission[];
};

export type Submission = {
  id: string;
  title: string;
  reference: string;
  site: string; //  Unsure about this property
  timestamp: string;
  score: number;
  user: string;
  comments: number;
};

export type Comment = {
  user: string;
  timestamp: string;
  text: string;
  replies: Comment[];
};
