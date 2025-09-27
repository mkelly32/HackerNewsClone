export type Pages = {
  [pageNumber: number]: Document;
};

export type Submission = {
  id: number;
  title: string;
  reference: string;
  site: string; //  Unsure about this property
  score: number;
  author: string;
  comments: number;
};
