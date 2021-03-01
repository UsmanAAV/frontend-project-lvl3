/* eslint-disable no-param-reassign */
import axios from 'axios';
import * as onChange from 'on-change';
import _ from 'lodash';
import { FORM_STATE } from './constants';
import { validateForm } from './validate';
import { render } from './render';

const validate = (state, url) =>
  validateForm({ input: url }).then(() => {
    state.form.state = FORM_STATE.submitting;
    state.form.feedback = '';
  });

const addRssUrl = (state, url) => {
  return new Promise((resolve, reject) => {
    if (_.includes(state.feeds, url)) {
      reject(new Error('RSS уже существует'));
    } else {
      state.feeds.push(url);
      resolve();
    }
  });
};

const request = (state, url) =>
  axios
    .get(url)
    .then((data) => {
      state.form.state = FORM_STATE.success;
      state.form.feedback = 'RSS успешно загружен';
      return data;
    })
    .catch(() => {
      throw new Error('Ошибка сети');
    });

function getHandleSubmitForm(state) {
  return function handler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('rss-url-input');

    validate(state, url)
      .then(() => addRssUrl(state, url))
      .then(() => request(state, url))
      .catch((error) => {
        state.form.state = FORM_STATE.invalid;
        state.form.feedback = error.message;
      });
  };
}

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
  form.addEventListener('submit', getHandleSubmitForm(watchedState));
}

export { app };
