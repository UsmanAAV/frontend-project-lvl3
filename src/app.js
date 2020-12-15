import axios from 'axios';
import _ from 'lodash';
import { renderAddRSSFeedForm } from './FormAddRssFeed';
import { FORM } from './constants';
import { validate } from './validate';

const APP_TITLE = 'RSS reader';

const state = {
  input: {
    value: '',
  },
};

const handleSubmitForm = (e) => {
  e.preventDefault();

  validate({ input: _.get(state, 'input.value') })
    .then(({ input }) => {
      axios.get(input);
    })
    .catch((err) => {
      const input = document.querySelector(`#${FORM.inputId}`);
      input.classList.add('is-invalid');
      const error = document.querySelector(`#${FORM.errorId}`);
      error.innerText = err.message;
    });
};

const handleInputChange = (e) => {
  _.set(state, 'input.value', e.target.value);
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
