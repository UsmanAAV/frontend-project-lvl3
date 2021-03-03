import _ from 'lodash';

const parse = (response) => {
  const parser = new DOMParser();

  const doc = parser.parseFromString(response.data.contents, 'application/xml');

  const error = doc.querySelector('parsererror');
  if (error) {
    return {
      description: '',
      error: 'Произошла ошибка парсинга',
      link: '',
      title: '',
    };
  }

  const title = doc.querySelector('channel title');
  const description = doc.querySelector('channel description');

  const postsEl = doc.querySelectorAll('channel item');
  const posts = _.map(postsEl, (item) => ({
    description: item.querySelector('description').textContent,
    link: item.querySelector('link').textContent,
    title: item.querySelector('title').textContent,
  }));

  return { description, error, posts, title };
};

export { parse };
