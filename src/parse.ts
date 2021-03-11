import * as _ from 'lodash';
import { AxiosResponse } from 'axios';
import i18next from 'i18next';
import { TParseResult } from './types';

const parse = (response: AxiosResponse, url: string): TParseResult => {
  const parser = new DOMParser();

  const doc = parser.parseFromString(response.data.contents, 'application/xml');

  const error = doc.querySelector('parsererror');
  if (error) {
    throw new Error(i18next.t('parseError'));
  }

  const feedId = _.uniqueId();

  const postsEl = doc.querySelectorAll('channel item');
  const posts = _.map(postsEl, (item) => {
    return {
      description: item.querySelector('description')?.textContent || '',
      feedId,
      id: `${feedId}${item.querySelector('title')?.textContent}` || '',
      link: item.querySelector('link')?.textContent,
      title: item.querySelector('title')?.textContent || '',
      read: false,
    };
  });

  const title = doc.querySelector('channel title')?.textContent || '';
  const description = doc.querySelector('channel description')?.textContent || '';

  return {
    feed: { description, id: feedId, title, url },
    posts,
  };
};

export default parse;
