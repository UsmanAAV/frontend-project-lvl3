import _ from 'lodash';

function renderOpenedPost(value) {
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const modalLink = document.querySelector('.modal-footer>a');

  const post = _.find(this.posts, { id: value });

  if (!post) {
    return;
  }

  const { description, link, title } = post;

  modalTitle.textContent = title;
  modalBody.textContent = description;
  if (link) {
    modalLink.setAttribute('href', link);
    modalLink.classList.remove('invisible');
  } else {
    modalLink.classList.add('invisible');
  }
}

export { renderOpenedPost };
