import { FORM } from '../constants';

function renderFeedback(path, value) {
  const feedback = document.querySelector(`#${FORM.feedback}`);

  feedback.innerText = value;
}

export { renderFeedback };
