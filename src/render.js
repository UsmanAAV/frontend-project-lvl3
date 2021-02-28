import { FORM, FORM_STATE } from './constants';

function render(path, value) {
  const input = document.querySelector(`#${FORM.inputId}`);
  const feedback = document.querySelector(`#${FORM.feedback}`);
  const button = document.querySelector('button');

  switch (path) {
    case 'formState':
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
    case 'feedback':
      feedback.innerText = value;
      break;
    default:
  }
}

export { render };
