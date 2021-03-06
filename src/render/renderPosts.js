import _ from 'lodash';
import i18next from 'i18next';

function renderPosts(value) {
  const posts = document.querySelector('.posts');

  posts.innerHTML = `
    <h2>${i18next.t('posts')}</h2>
    <ul class="list-group">
      ${_.map(
        value,
        ({ title, link, id }) => `
          <li class="list-group-item d-flex justify-content-between align-items-start">
            ${
              link
                ? `<a href="${link}" class="font-weight-bold" data-id="${id}" target="_blank" rel="noopener noreferrer">
                    ${title}
                  </a>`
                : title
            }
            <button type="button" class="btn btn-primary btn-sm" data-id="${id}" data-toggle="modal" data-target="#modal">
              ${i18next.t('view')}
            </button>
          </li>
        `
      ).join('')}
    </ul>
  `;
}

export { renderPosts };
