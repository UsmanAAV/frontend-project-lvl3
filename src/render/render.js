import i18next from 'i18next';
import { renderFormState } from './renderFormState';
import { renderFeeds } from './renderFeeds';
import { renderPosts } from './renderPosts';
import { renderOpenedPost } from './renderOpenedPost';
import { renderReadPost } from './renderReadPost';
import { renderFeedback } from './renderFeedback';

function render(path, value) {
  switch (path) {
    case 'form.state':
      renderFormState(value);
      break;
    case 'form.feedback':
      renderFeedback(value);
      break;
    case 'feeds':
      renderFeeds(value);
      break;
    case 'posts':
      renderPosts(value);
      break;
    case 'openedPostId':
      renderOpenedPost(value);
      break;
    case 'readPosts':
      renderReadPost(value);
      break;
    default:
      throw new Error(i18next.t('missingRenderCase'));
  }
}

export { render };
