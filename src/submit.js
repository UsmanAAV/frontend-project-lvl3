/* eslint-disable no-param-reassign */
import axios from 'axios';
import * as yup from 'yup';
import _ from 'lodash';
import i18next from 'i18next';
import { parse } from './parse';

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

const fetchData = (state, url) =>
  axios
    .get(`${allOrigins}${encodeURIComponent(url)}`)
    .then((data) => {
      state.form.state = FORM_STATE.success;
      state.form.feedback = i18next.t('rssAddedSuccessfully');
      return data;
    })
    .catch(() => {
      return Promise.reject(new Error(i18next.t('networkError')));
    });

function getSubmitHandler(state) {
  return function handler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('rss-url-input');

    validateForm(state, url)
      .then(() => {
        state.form.state = FORM_STATE.submitting;
        state.form.feedback = '';
        return fetchData(state, url);
      })
      .then((response) => {
        const result = parse(response);
        const { description, error, id, posts, title } = result;
        if (error) {
          throw new Error(error);
        }
        state.feeds.push({ description, id, title, url });
        state.posts.push(...posts);
        return result;
      })
      .catch((error) => {
        state.form.state = FORM_STATE.invalid;
        state.form.feedback = error.message;
      });
  };
}

export { getSubmitHandler };
