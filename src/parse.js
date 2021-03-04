import _ from 'lodash';

const parse = (response) => {
  const parser = new DOMParser();

  const doc = parser.parseFromString(response.data.contents, 'application/xml');

  const error = doc.querySelector('parsererror');
  if (error) {
    return {
      description: '',
      error: 'Произошла ошибка парсинга',
      posts: [],
      title: '',
    };
  }

  const postsEl = doc.querySelectorAll('channel item');
  const posts = _.map(postsEl, (item, id) => ({
    description: item.querySelector('description').textContent,
    id,
    link: item.querySelector('link')?.textContent,
    title: item.querySelector('title').textContent,
  }));

  const title = doc.querySelector('channel title').textContent;
  const description = doc.querySelector('channel description').textContent;

  return { description, error, posts, title };
};

export { parse };
