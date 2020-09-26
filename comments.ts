import Actions from './actions';
import { ActionObject as Action, CommentState } from './types';

const initialState: CommentState = {
  comment: [],
  error: null
};

const comments = (state: CommentState = initialState, action: Action) => {
  switch (action.type) {
    case Actions.comments.fetchComments.success.toString():
      return {
        ...state,
        comment: action.payload,
        error: null
      };
    case Actions.comments.fetchComments.error.toString():
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default comments;
