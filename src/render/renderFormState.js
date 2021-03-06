import i18next from 'i18next';
import { FORM, FORM_STATE } from '../constants';

function renderFormState(value) {
  const input = document.querySelector(`#${FORM.inputId}`);
  const feedback = document.querySelector(`#${FORM.feedback}`);
  const button = document.querySelector('button[type="submit"]');

  switch (value) {
    case FORM_STATE.initial:
      input.classList.remove('is-invalid');
      input.value = '';
      input.removeAttribute('readonly');
      button.disabled = false;
      feedback.classList.remove('text-danger');
      feedback.classList.remove('text-success');
      break;
    case FORM_STATE.invalid:
      input.classList.add('is-invalid');
      input.removeAttribute('readonly');
      button.disabled = false;
      feedback.classList.add('text-danger');
      feedback.classList.remove('text-success');
      break;
    case FORM_STATE.submitting:
      input.setAttribute('readonly', true);
      button.disabled = true;
      break;
    case FORM_STATE.success:
      input.classList.remove('is-invalid');
      input.value = '';
      input.removeAttribute('readonly');
      button.disabled = false;
      feedback.classList.remove('text-danger');
      feedback.classList.add('text-success');
      break;
    default:
      throw new Error(i18next.t('missingFormState'));
  }
}

export default renderFormState;
