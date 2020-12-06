import * as yup from 'yup';
import { renderAddRSSFeedForm } from './FormAddRssFeed';
import { FORM } from './constants';

const APP_TITLE = 'RSS reader';

const handleSubmitForm = (e) => {
  e.preventDefault();
};

const handleInputChange = (e) => {
  yup.setLocale({
    string: {
      required: 'Please fill in this field',
      url: 'Please enter a valid url',
    },
  });

  const schema = yup.object().shape({
    input: yup.string().required().url(),
  });

  schema.validate({ input: e.target.value }).catch((err) => {
    const input = document.querySelector(`#${FORM.inputId}`);
    input.classList.add('is-invalid');
    const error = document.querySelector(`#${FORM.errorId}`);
    error.innerText = err.message;
  });
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
