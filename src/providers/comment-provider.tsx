import {
  useContext,
  useReducer,
  useCallback,
  createContext,
  ReactNode,
  useMemo,
} from "react";
import { CommentActions } from "../types/comment-actions";
import { getComments } from "../utilities/comment.utils";

type CommentState = {
  entities: { [id: string]: Comment };
  loading: number[];
};

type CommentProviderValue = {
  state: CommentState;
  fetchComments: (ids: number[]) => void;
};

const commentInitialState = {
  entities: {},
  loading: [],
};

const CommentContext = createContext<CommentProviderValue>({
  state: commentInitialState,
  fetchComments: () => undefined,
});

function reducer(state: CommentState, action: CommentActions): CommentState {
  switch (action.type) {
    case "comment/add":
      const comments = action.comments;
      return state;
    case "comment/loading/add":
      const addToLoading = action.ids;
      const loading = [...state.loading, ...addToLoading];
      return {
        ...state,
        loading,
      };
    case "comment/loading/remove":
      return state;
    default:
      return state;
  }
}

type Props = { children: ReactNode };
export function CommentProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, commentInitialState);
  const fetchComments = useCallback(
    (ids: number[]) => {
      //  Add Comments to state.loading
      dispatch({
        type: "comment/loading/add",
        ids,
      });

      //  Fetch the Comments
      getComments(ids)
        .then((comments) => {
          //  Add Comments to store
          dispatch({
            type: "comment/add",
            comments,
          });
        })
        .catch((error) => {
          console.log("Error getting comments", error);
        })
        .finally(() => {
          //  Remove Comments from state.loading
          dispatch({
            type: "comment/loading/remove",
            ids,
          });
        });
    },
    [dispatch],
  );
  const context = useMemo(
    () => ({
      state,
      fetchComments,
    }),
    [state, fetchComments],
  );

  return (
    <CommentContext.Provider value={context}>
      {children}
    </CommentContext.Provider>
  );
}

export const useCommentContext = () => useContext(CommentContext);
