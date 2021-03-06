/* eslint-disable */
import _ from 'lodash';
import i18next from 'i18next';

function renderFeeds(value) {
  const feeds = document.querySelector('.feeds');

  feeds.innerHTML = `
    <h2>${i18next.t('feeds')}</h2>
    <ul class="list-group mb-5">${_.map(
      value,
      ({ title, description }) => `
        <li class="list-group-item">
          <h3>${title}</h3>
          <p>${description}</p>
        </li>
      `
    ).join('')}</ul>
  `;
}

export default renderFeeds;
