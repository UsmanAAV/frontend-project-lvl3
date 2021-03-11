/* eslint-disable @typescript-eslint/no-non-null-assertion */
import i18next from 'i18next';
import { FORM } from '../constants';
import { EFormState } from '../types';

function renderFormState(value: EFormState): void {
  const input = document.querySelector<HTMLInputElement>(`#${FORM.inputId}`)!;
  const feedback = document.querySelector<HTMLDivElement>(`#${FORM.feedback}`)!;
  const button = document.querySelector<HTMLButtonElement>('button[type="submit"]')!;

  switch (value) {
    case EFormState.INITIAL:
      input.classList.remove('is-invalid');
      input.value = '';
      input.removeAttribute('readonly');
      button.disabled = false;
      feedback.classList.remove('text-danger');
      feedback.classList.remove('text-success');
      break;
    case EFormState.INVALID:
      input.classList.add('is-invalid');
      input.removeAttribute('readonly');
      button.disabled = false;
      feedback.classList.add('text-danger');
      feedback.classList.remove('text-success');
      break;
    case EFormState.SUBMITTING:
      input.setAttribute('readonly', 'true');
      button.disabled = true;
      break;
    case EFormState.SUCCESS:
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
