import i18next from 'i18next';
import { FORM } from '../constants';
import { EFormState } from '../types';

function renderFormState(value: EFormState): void {
  const input = document.querySelector<HTMLInputElement>(`#${FORM.inputId}`);
  const feedback = document.querySelector<HTMLDivElement>(`#${FORM.feedback}`);
  const button = document.querySelector<HTMLButtonElement>('button[type="submit"]');

  switch (value) {
    case EFormState.INITIAL:
      if (!input) {
        break;
      }
      input.classList.remove('is-invalid');
      input.value = '';
      input.removeAttribute('readonly');
      if (!button) {
        break;
      }
      button.disabled = false;
      if (!feedback) {
        return;
      }
      feedback.classList.remove('text-danger');
      feedback.classList.remove('text-success');
      break;
    case EFormState.INVALID:
      if (!input) {
        return;
      }
      input.classList.add('is-invalid');
      input.removeAttribute('readonly');
      if (!button) {
        break;
      }
      button.disabled = false;
      if (!feedback) {
        return;
      }
      feedback.classList.add('text-danger');
      feedback.classList.remove('text-success');
      break;
    case EFormState.SUBMITTING:
      if (!input) {
        return;
      }
      input.setAttribute('readonly', "true");
      if (!button) {
        break;
      }
      button.disabled = true;
      break;
    case EFormState.SUCCESS:
      if (!input) {
        return;
      }
      input.classList.remove('is-invalid');
      input.value = '';
      input.removeAttribute('readonly');
      if (!button) {
        break;
      }
      button.disabled = false;
      if (!feedback) {
        return;
      }
      feedback.classList.remove('text-danger');
      feedback.classList.add('text-success');
      break;
    default:
      throw new Error(i18next.t('missingFormState'));
  }
}

export default renderFormState;
