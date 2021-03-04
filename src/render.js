import _ from 'lodash';
import { FORM, FORM_STATE } from './constants';

function render(path, value) {
  const input = document.querySelector(`#${FORM.inputId}`);
  const feedback = document.querySelector(`#${FORM.feedback}`);
  const button = document.querySelector('button[type="submit"]');
  const feeds = document.querySelector('.feeds');
  const posts = document.querySelector('.posts');

  switch (path) {
    case 'form.state':
      switch (value) {
        case FORM_STATE.initial:
          input.classList.remove('is-invalid');
          input.value = '';
          input.disabled = false;
          button.disabled = false;
          feedback.classList.remove('text-danger');
          feedback.classList.remove('text-success');
          break;
        case FORM_STATE.invalid:
          input.classList.add('is-invalid');
          input.disabled = false;
          button.disabled = false;
          feedback.classList.add('text-danger');
          feedback.classList.remove('text-success');
          break;
        case FORM_STATE.submitting:
          input.disabled = true;
          button.disabled = true;
          break;
        case FORM_STATE.success:
          input.classList.remove('is-invalid');
          input.value = '';
          input.disabled = false;
          button.disabled = false;
          feedback.classList.remove('text-danger');
          feedback.classList.add('text-success');
          break;
        default:
      }
      break;
    case 'form.feedback':
      feedback.innerText = value;
      break;
    case 'feeds':
      if (_.size(value) === 0) {
        break;
      }
      feeds.innerHTML = `
        <h2>Фиды</h2>
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
      break;
    case 'posts':
      if (_.size(value) === 0) {
        break;
      }
      posts.innerHTML = `
        <h2>Посты</h2>
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
                  Просмотр
                </button>
              </li>
            `
          ).join('')}
        </ul>
      `;
      break;
    default:
  }
}

export { render };
