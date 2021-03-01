/* eslint-disable no-param-reassign */
import * as onChange from 'on-change';
import { FORM_STATE } from './constants';
import { render } from './render';
import { getSubmitHandler } from './submit';

function app() {
  const state = {
    form: {
      state: FORM_STATE.initial,
      feedback: '',
    },
    feeds: [],
  };

  const watchedState = onChange(state, render);

  const form = document.getElementById('rss-form');
  form.addEventListener('submit', getSubmitHandler(watchedState));
}

export { app };
