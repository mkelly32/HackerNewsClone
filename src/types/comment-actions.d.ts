import { Comment } from "./data";

export type AddComments = {
  type: "comment/add";
  comments: Comment[];
};

export type AddLoading = {
  type: "comment/loading/add";
  ids: number[];
};

export type RemoveLoading = {
  type: "comment/loading/remove";
  ids: number[];
};

type CommentActions = AddComments | AddLoading | RemoveLoading;
