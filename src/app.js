import { renderAddRSSFeedForm } from './FormAddRssFeed';
import { FORM_ID } from './constants';

const APP_TITLE = 'RSS reader';

const handleSubmitForm = (e) => {
  e.preventDefault();
};

function app() {
  document.title = APP_TITLE;
  const mountPoint = document.querySelector('#point');
  mountPoint.innerHTML = renderAddRSSFeedForm();
  const form = document.querySelector(`#${FORM_ID}`);
  form.addEventListener('submit', handleSubmitForm);
}

export { app };
