/**
 *  Action Types
 */
import { Submission } from "../../types/data";

type AddSubmissions = {
  type: "submission/add";
  submissions: Submission[];
};

type RemoveSubmission = {
  type: "submission/remove";
  id: string;
};

type SetLoading = {
  type: "loading/set";
  value: boolean;
};

export type SubmissionActions = AddSubmissions | RemoveSubmission | SetLoading;

/**
 *  Action Creators
 */
export const setLoading = (value: boolean): SetLoading => ({
  type: "loading/set",
  value,
});

export const addSubmissions = (submissions: Submission[]): AddSubmissions => ({
  type: "submission/add",
  submissions,
});
