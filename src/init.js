/* eslint-disable no-param-reassign */
import onChangeProxy from 'on-change';
import i18next from 'i18next';
import 'bootstrap';
import { FORM_STATE } from './constants';
import render from './render';
import getSubmitHandler from './submit';
import ru from './dictionaries';
import getClickHandler from './click';

const init = async () => {
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
    openedPostId: null,
    readPosts: [],
  };

  const watchedState = onChangeProxy(state, render);

  const form = document.getElementById('rss-form');
  form.addEventListener('submit', getSubmitHandler(watchedState));
  const posts = document.querySelector('.posts');
  posts.addEventListener('click', getClickHandler(watchedState));
};

export default init;
