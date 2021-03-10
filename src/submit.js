/* eslint-disable no-param-reassign */
import axios from 'axios';
import * as yup from 'yup';
import _ from 'lodash';
import i18next from 'i18next';
import { parse } from './parse';
import { getTimeout } from './timeout';

import { FORM_STATE } from './constants';

const allOrigins = 'https://hexlet-allorigins.herokuapp.com/get?url=';

const validate = (data) => {
  yup.setLocale({
    string: {
      required: i18next.t('input.required'),
      url: i18next.t('input.url'),
    },
  });

  const schema = yup.object().shape({
    input: yup.string().required().url(),
  });

  return schema.validate(data);
};

const validateForm = (state, url) =>
  validate({ input: url }).then(() => {
    if (_.find(state.feeds, { url })) {
      throw new Error(i18next.t('rssAlreadyExists'));
    }
  });

const fetchData = (url) =>
  axios
    .get(allOrigins, { params: { url, disableCache: true } })
    .then((data) => {
      return data;
    })
    .catch(() => {
      return Promise.reject(new Error(i18next.t('networkError')));
    });

const updateFeeds = (state) => () => {
  _.forEach(state.feeds, ({ id, url }) => {
    fetchData(url).then((response) => {
      const result = parse(response);
      const { error, posts: newPosts } = result;
      if (error) {
        return;
      }
      const [feedPosts, otherPosts] = _.partition(state.posts, { feedId: id });
      const arePostsChanged = _.isEqual(feedPosts, newPosts);
      if (arePostsChanged) {
        state.posts = [...otherPosts, ...newPosts];
      }
    });
  });
};

function getSubmitHandler(state) {
  const { start: onSubmitSuccess, stop: onBeforeSubmit } = getTimeout(updateFeeds(state));

  return function handler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('rss-url-input');

    validateForm(state, url)
      .then(() => {
        state.form.state = FORM_STATE.submitting;
        state.form.feedback = '';
        onBeforeSubmit();
        return fetchData(url);
      })
      .then((response) => {
        const result = parse(response);
        const { description, error, id, posts, title } = result;
        if (error) {
          throw new Error(error);
        }
        state.feeds.push({ description, id, title, url });
        state.posts.push(...posts);
        state.form.state = FORM_STATE.success;
        state.form.feedback = i18next.t('rssAddedSuccessfully');
        onSubmitSuccess();
        return result;
      })
      .catch((error) => {
        state.form.state = FORM_STATE.invalid;
        state.form.feedback = error.message;
      });
  };
}

export { getSubmitHandler };
