/* eslint-disable no-param-reassign */
const getClickHandler = (state) => (event) => {
  const {
    target: {
      dataset: { id },
      tagName,
    },
  } = event;

  if (!(tagName === 'BUTTON' || tagName === 'A')) {
    return;
  }

  state.openedPostId = id;
  state.readPosts.push(id);
};

export { getClickHandler };
