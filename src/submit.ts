/* eslint-disable no-param-reassign */
/* eslint-disable */
import axios from 'axios';
import * as yup from 'yup';
import * as _ from 'lodash';
import i18next from 'i18next';
import parse from './parse';
import getTimeout from './timeout';

import { EFormState, TState } from './types';

const allOrigins = 'https://hexlet-allorigins.herokuapp.com/get';

type TSchema = {
  input: string;
};

const validate = (data: TSchema) => {
  yup.setLocale({
    string: {
      required: i18next.t('input.required'),
      url: i18next.t('input.url'),
    },
  });

  const schema = yup.object().shape({
    input: yup.string().defined().url(),
  });

  return schema.validate(data);
};

const validateForm = (state: TState, url: string) =>
  validate(<TSchema>{ input: url }).then(() => {
    if (_.find(state.feeds, { url })) {
      throw new Error(i18next.t('rssAlreadyExists'));
    }
  });

const fetchData = (url: string) =>
  axios
    .get(allOrigins, { params: { url, disableCache: true } })
    .then((data) => {
      return data;
    })
    .catch(() => {
      return Promise.reject(new Error(i18next.t('networkError')));
    });

const updateFeeds = (state: TState) => () => {
  _.forEach(state.feeds, ({ id, url }) => {
    fetchData(url).then((response) => {
      const result = parse(response, url);
      const { posts: newPosts } = result;
      const res = _.partition(state.posts, { feedId: id });
      const [feedPosts, otherPosts] = res;
      const arePostsChanged = _.isEqual(feedPosts, newPosts);
      if (arePostsChanged) {
        state.posts = [...otherPosts, ...newPosts];
      }
    });
  });
};

function getSubmitHandler(state: TState): (e: Event) => void {
  const { start: onSubmitSuccess, stop: onBeforeSubmit } = getTimeout(updateFeeds(state));

  return function handler(e: Event) {
    if (!(e.target instanceof HTMLFormElement)) {
      return;
    }
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('rss-url-input') as string;

    validateForm(state, url)
      .then(() => {
        state.form.state = EFormState.SUBMITTING;
        state.form.feedback = '';
        onBeforeSubmit();
        return fetchData(url);
      })
      .then((response) => {
        const result = parse(response, url);
        const { feed, posts } = result;
        const { description, id, title } = feed;
        state.feeds.push({ description, id, title, url });
        state.posts.push(...posts);
        state.form.state = EFormState.SUCCESS;
        state.form.feedback = i18next.t('rssAddedSuccessfully');
        onSubmitSuccess();
        return result;
      })
      .catch((error) => {
        state.form.state = EFormState.INVALID;
        state.form.feedback = error.message;
      });
  };
}

export default getSubmitHandler;
