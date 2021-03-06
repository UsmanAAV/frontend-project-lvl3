import { FORM } from '../constants';

function renderFeedback(value) {
  const feedback = document.querySelector(`#${FORM.feedback}`);

  feedback.innerText = value;
}

export { renderFeedback };
