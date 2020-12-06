import { renderAddRSSFeedForm } from './FormAddRssFeed';
import { FORM } from './constants';

const APP_TITLE = 'RSS reader';

const handleSubmitForm = (e) => {
  e.preventDefault();
};

const handleInputChange = (e) => {
  e.preventDefault();
};

function app() {
  document.title = APP_TITLE;

  const mountPoint = document.querySelector('#point');
  mountPoint.innerHTML = renderAddRSSFeedForm();

  const form = document.querySelector(`#${FORM.id}`);
  form.addEventListener('submit', handleSubmitForm);

  const input = document.querySelector(`#${FORM.inputId}`);
  input.addEventListener('change', handleInputChange);
}

export { app };
