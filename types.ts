export type Action = (
  payload?: any
) => ActionObject & {
  toString: () => string;
};

export type ActionObject = {
  type: string;
  payload?: any;
};

export type Routine = {
  trigger: Action;
  success: Action;
  error: Action;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
};

export type UserState = {
  list: User[];
  error?: any;
};

export type State = {
  users: UserState;
  posts: PostState;
  comments: CommentState;
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type PostState = {
  post: Post[];
  error?: any;
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string
};

export type CommentState = {
  comment: Comment[];
  error?: any;
};

