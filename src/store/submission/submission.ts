import { Submission, SubmissionType } from "../../types/data";
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

export const selectLoading = (state: SubmissionState): boolean => {
  return state.loading;
};

const selectSubmisison = (
  state: SubmissionState,
  id: number,
): Maybe<Submission> => {
  return state.entities[id];
};

export const selectSubmissionTypePure = (
  state: SubmissionState,
  id: number,
): Maybe<SubmissionType> => {
  const submission = selectSubmisison(state, id);
  return submission?.type;
};

export const selectSubmissionTitlePure = (
  state: SubmissionState,
  id: number,
): string => {
  const submission = selectSubmisison(state, id);
  return submission?.title ?? "";
};

export const selectSubmissionUrlPure = (
  state: SubmissionState,
  id: number,
): Maybe<string> => {
  const submission = selectSubmisison(state, id);
  return submission?.url; // May be undefined
};

export const selectSubmissionScorePure = (
  state: SubmissionState,
  id: number,
): number => {
  const submission = selectSubmisison(state, id);
  return submission?.score ?? 0;
};

export const selectSubmissionAuthorPure = (
  state: SubmissionState,
  id: number,
): string => {
  const submission = selectSubmisison(state, id);
  return submission?.by ?? "";
};

export const selectSubmissionTimePure = (
  state: SubmissionState,
  id: number,
): number => {
  const submission = selectSubmisison(state, id);
  return submission?.time ?? 0;
};

export const selectSubmissionDescendantsPure = (
  state: SubmissionState,
  id: number,
): Maybe<number> => {
  const submission = selectSubmisison(state, id);
  return submission?.descendants; // May be undefined
};

export const selectSubmissionKidsPure = (
  state: SubmissionState,
  id: number,
): number[] => {
  const submission = selectSubmisison(state, id);
  return submission?.kids ?? [];
};
