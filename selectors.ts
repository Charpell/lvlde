import { State } from './types';

const Selectors = {
  users: (state: State) => state.users,
  userData: (state: State) => state.users.list,
  posts: (state: State) => state.posts,
  postData: (state: State) => state.posts.post,
  comments: (state: State) => state.comments,
  commentData: (state: State) => state.comments.comment
};

export default Selectors;
