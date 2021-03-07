import { FORM } from '../constants';

function renderFeedback(value: string): void {
  const feedback = document.querySelector<HTMLDivElement>(`#${FORM.feedback}`);

  if (!feedback) {
    return;
  }
  feedback.textContent = value;
}

export default renderFeedback;
