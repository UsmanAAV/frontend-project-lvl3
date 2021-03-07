/* eslint-disable no-param-reassign */
import { TState } from './types';

const getClickHandler = (state: TState) => (event: MouseEvent): void => {
  const { target } = event;
  const {
    dataset: { id = '' },
  } = target as HTMLElement;

  if (!id) {
    return;
  }

  state.openedPostId = id;
  state.readPosts.push(id);
};

export default getClickHandler;
