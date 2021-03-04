/* eslint-disable no-param-reassign */
import axios from 'axios';
import * as yup from 'yup';
import _ from 'lodash';
import { parse } from './parse';

import { FORM_STATE } from './constants';

const allOrigins = 'https://hexlet-allorigins.herokuapp.com/get?url=';

const validate = (data) => {
  yup.setLocale({
    string: {
      required: 'Please fill in this field',
      url: 'Please enter a valid url',
    },
  });

  const schema = yup.object().shape({
    input: yup.string().required().url(),
  });

  return schema.validate(data);
};

const validateForm = (state, url) =>
  validate({ input: url }).then(() => {
    if (_.includes(state.feeds, url)) {
      throw new Error('RSS уже существует');
    }
  });

const fetchData = (state, url) =>
  axios
    .get(`${allOrigins}${encodeURIComponent(url)}`)
    .then((data) => {
      state.form.state = FORM_STATE.success;
      state.form.feedback = 'RSS успешно загружен';
      return data;
    })
    .catch(() => {
      return Promise.reject(new Error('Ошибка сети'));
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
        const { description, error, posts, title } = result;
        if (error) {
          throw new Error(error);
        }
        state.posts.push({ description, id: _.uniqueId(), posts, title });
        return result;
      })
      .then((response) => {
        state.feeds.push(url);
        return response;
      })
      .catch((error) => {
        state.form.state = FORM_STATE.invalid;
        state.form.feedback = error.message;
      });
  };
}

export { getSubmitHandler };
