/* eslint-disable */
import i18next from 'i18next';
import * as _ from 'lodash';
import renderFormState from './renderFormState';
import renderFeeds from './renderFeeds';
import renderPosts from './renderPosts';
import renderOpenedPost from './renderOpenedPost';
import renderReadPost from './renderReadPost';
import renderFeedback from './renderFeedback';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function render(path: string, value): void {
  switch (path) {
    case 'form.state':
      renderFormState(value);
      break;
    case 'form.feedback':
      renderFeedback(value);
      break;
    case 'feeds':
      if (_.size(value) === 0) {
        break;
      }
      renderFeeds(value);
      break;
    case 'posts':
      if (_.size(value) === 0) {
        break;
      }
      renderPosts(value);
      break;
    case 'openedPostId':
      renderOpenedPost(value, this);
      break;
    case 'readPosts':
      renderReadPost(value);
      break;
    default:
      throw new Error(i18next.t('missingRenderCase'));
  }
}

export default render;
