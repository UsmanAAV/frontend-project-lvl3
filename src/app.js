/* eslint-disable no-param-reassign */
import * as onChange from 'on-change';
import i18next from 'i18next';
import { FORM_STATE } from './constants';
import { render } from './render';
import { getSubmitHandler } from './submit';
import { ru } from './dictionaries';

const app = async () => {
  await i18next.init({
    lng: 'ru',
    resources: { ru },
  });

  const state = {
    form: {
      state: FORM_STATE.initial,
      feedback: '',
    },
    feeds: [],
    posts: [],
  };

  const watchedState = onChange(state, render);

  const form = document.getElementById('rss-form');
  form.addEventListener('submit', getSubmitHandler(watchedState));
};

export { app };
