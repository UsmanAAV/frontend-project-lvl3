import _ from 'lodash';

const parse = (response) => {
  const parser = new DOMParser();

  const doc = parser.parseFromString(response.data.contents, 'application/xml');

  const error = doc.querySelector('parsererror');
  if (error) {
    return { error: 'Произошла ошибка парсинга' };
  }

  const feedId = _.uniqueId();

  const postsEl = doc.querySelectorAll('channel item');
  const posts = _.map(postsEl, (item, id) => ({
    description: item.querySelector('description').textContent,
    feedId,
    id,
    link: item.querySelector('link')?.textContent,
    title: item.querySelector('title').textContent,
  }));

  const title = doc.querySelector('channel title').textContent;
  const description = doc.querySelector('channel description').textContent;

  return { description, id: feedId, posts, title };
};

export { parse };
