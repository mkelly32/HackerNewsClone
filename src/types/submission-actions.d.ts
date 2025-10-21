import { Submission } from "./data";

export type AddSubmissions = {
  type: "submission/add";
  submissions: Submission[];
};

export type RemoveSubmission = {
  type: "submission/remove";
  id: string;
};

export type SubmissionActions = AddSubmissions | RemoveSubmission;
