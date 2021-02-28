/* eslint-disable no-param-reassign */
import axios from 'axios';
import * as onChange from 'on-change';
import { FORM_STATE } from './constants';
import { validate } from './validate';
import { render } from './render';

const request = (state, url) =>
  axios
    .get(url)
    .then(() => {
      state.formState = FORM_STATE.success;
      state.feedback = 'RSS успешно загружен';
    })
    .catch(() => {
      state.formState = FORM_STATE.invalid;
      state.feedback = 'Ошибка сети';
    });

const process = (state, url) =>
  validate({ input: url })
    .then(({ input: validatedUrl }) => {
      state.formState = FORM_STATE.submitting;
      state.feedback = '';
      request(state, validatedUrl);
    })
    .catch((err) => {
      state.formState = FORM_STATE.invalid;
      state.feedback = err.message;
    });

function getHandleSubmitForm(state) {
  return function handler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('rss-url-input');

    process(state, url);
  };
}

function app() {
  const state = {
    formState: FORM_STATE.initial,
    feedback: '',
    feeds: [],
    posts: [],
  };

  const watchedState = onChange(state, render);

  const form = document.getElementById('rss-form');
  form.addEventListener('submit', getHandleSubmitForm(watchedState));
}

export { app };
