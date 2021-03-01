/* eslint-disable no-param-reassign */
import axios from 'axios';
import * as yup from 'yup';
import _ from 'lodash';

import { FORM_STATE } from './constants';

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
    .get(url)
    .then((data) => {
      state.form.state = FORM_STATE.success;
      state.form.feedback = 'RSS успешно загружен';
      return data;
    })
    .catch(() => {
      return Promise.reject(new Error('Ошибка сети'));
    });

const validateResponse = (state, response) => {
  const contentType = _.get(response, 'headers.content-type');
  const hasRss =
    contentType.includes('application/rss+xml') || contentType.includes('application/xml');
  if (!hasRss) {
    throw new Error('Формат данного RSS не поддерживается');
  }
};

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
        validateResponse(state, response);
        return response;
      })
      // .then((response) => {
      //   state.feeds.push(url);
      //   return response;
      // })
      .catch((error) => {
        state.form.state = FORM_STATE.invalid;
        state.form.feedback = error.message;
      });
  };
}

export { getSubmitHandler };
