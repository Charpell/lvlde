import Actions from './actions';
import { ActionObject as Action, PostState } from './types';

const initialState: PostState = {
  post: [],
  error: null
};

const posts = (state: PostState = initialState, action: Action) => {
  console.log({ action })
  switch (action.type) {
    case Actions.posts.fetchPosts.success.toString():
      return {
        ...state,
        post: action.payload,
        error: null
      };
    case Actions.posts.fetchPosts.error.toString():
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default posts;
