import * as _ from 'lodash';
import { TState } from './../types';

function renderOpenedPost(value: string, state: TState) {
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const modalLink = document.querySelector('.modal-footer>a');

  const post = state.posts.find(({ id }) => id === value);

  if (!post) {
    return;
  }

  const { description, link, title } = post;

  if (modalTitle) {
    modalTitle.textContent = title;
  }
  if (modalBody) {
    modalBody.textContent = description;
  }
  if (!modalLink) {
    return;
  }
  if (link) {
    modalLink.setAttribute('href', link);
    modalLink.classList.remove('invisible');
  } else {
    modalLink.classList.add('invisible');
  }
}

export default renderOpenedPost;
