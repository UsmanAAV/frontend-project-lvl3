export enum EFormState {
  SUBMITTING = 'submitting',
  INITIAL = 'initial',
  INVALID = 'invalid',
  SUCCESS = 'success',
}

export type TFeed = {
  id: string;
  url: string;
  link?: string;
  description: string;
  title: string;
};

export type TPost = {
  description: string;
  feedId: string;
  id: string;
  link: string | null | undefined;
  title: string;
  read: boolean;
};

export type TState = {
  form: {
    state: EFormState;
    feedback: string;
  };
  feeds: TFeed[];
  posts: TPost[];
  openedPostId: string | null;
  readPosts: string[];
};

export type TTimeoutResult = {
  start: () => void;
  stop: () => void;
};

export type TParseResult = {
  feed: TFeed;
  posts: TPost[];
};
