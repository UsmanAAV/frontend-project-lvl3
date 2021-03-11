/* eslint-disable no-param-reassign */
import * as onChange from 'on-change';
import i18next from 'i18next';
import 'bootstrap';
import render from './render';
import getSubmitHandler from './submit';
import ru from './dictionaries';
import getClickHandler from './click';
import { EFormState, TState } from './types';

const init = async (): Promise<void> => {
  await i18next.init({
    lng: 'ru',
    resources: { ru },
  });

  const state: TState = {
    form: {
      state: EFormState.INITIAL,
      feedback: '',
    },
    feeds: [],
    posts: [],
    openedPostId: null,
    readPosts: [],
  };

  const watchedState = onChange(state, render);

  const form = document.getElementById('rss-form');
  if (form) {
    form.addEventListener('submit', getSubmitHandler(watchedState));
  }
  const posts = document.querySelector('.posts');
  if (posts) {
    posts.addEventListener('click', getClickHandler(watchedState));
  }
};

export default init;
