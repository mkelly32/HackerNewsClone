import { Submission } from "../../types/data";
import { Maybe } from "../../types/utils";
export type SubmissionState = {
  entities: {
    [id: number]: Submission;
  };
  loading: boolean;
};

export const selectSubmissionIds = (state: SubmissionState): number[] => {
  return Object.keys(state.entities).map(Number);
};

const selectSubmisison = (
  state: SubmissionState,
  id: number,
): Maybe<Submission> => {
  return state.entities[id];
};

export const selectLoading = (state: SubmissionState): boolean => {
  return state.loading;
};
