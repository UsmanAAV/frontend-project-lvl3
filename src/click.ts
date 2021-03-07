/* eslint-disable no-param-reassign */
import { TState } from './types';

const getClickHandler = (state: TState) => (event: MouseEvent): void => {
  if (!(event.target instanceof HTMLElement)) {
    return;
  }

  const {
    target: {
      dataset: { id },
    },
  } = event;

  if (!id) {
    return;
  }

  const isButton = event.target instanceof HTMLButtonElement;
  const isAnchor = event.target instanceof HTMLAnchorElement;
  if (!(isButton || isAnchor)) {
    return;
  }

  state.openedPostId = id;
  state.readPosts.push(id);
};

export default getClickHandler;
