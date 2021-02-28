/* eslint-disable no-param-reassign */
import axios from 'axios';
import * as onChange from 'on-change';
import { FORM, FORM_STATE } from './constants';
import { validate } from './validate';

const getHandleSubmitForm = (state) => (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const value = formData.get('rss-url-input');

  validate({ input: value })
    .then(({ input }) => {
      axios.get(input);
    })
    .catch((err) => {
      state.formState = FORM_STATE.invalid;
      state.error = err.message;
    });
};

function render(path, value) {
  const input = document.querySelector(`#${FORM.inputId}`);
  const error = document.querySelector(`#${FORM.errorId}`);

  switch (path) {
    case 'formState':
      switch (value) {
        case FORM_STATE.invalid:
          input.classList.add('is-invalid');
          break;
        default:
      }
      break;
    case 'error':
      error.innerText = value;
      break;
    default:
  }
}

const app = () => {
  const state = {
    formState: FORM_STATE.initial,
    error: '',
    feeds: [],
    posts: [],
  };

  const watchedState = onChange(state, render);

  const form = document.getElementById('rss-form');
  form.addEventListener('submit', getHandleSubmitForm(watchedState));
};

export { app };
