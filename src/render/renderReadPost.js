import _ from 'lodash';

function renderReadPost(value) {
  const post = document.querySelector(`[data-id="${_.last(value)}"]`);
  if (post.classList.contains('font-weight-bold')) {
    post.classList.add('font-weight-normal');
    post.classList.remove('font-weight-bold');
  }
}

export { renderReadPost };
