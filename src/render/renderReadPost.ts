import * as _ from 'lodash';

function renderReadPost(value: string[]): void {
  const post = document.querySelector(`[data-id="${_.last(value)}"]`);
  if (post && post.classList.contains('font-weight-bold')) {
    post.classList.add('font-weight-normal');
    post.classList.remove('font-weight-bold');
  }
}

export default renderReadPost;
