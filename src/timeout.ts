/* eslint-disable */
import { INTERVAL } from './constants';

const getTimeout = (callback) => {
  let timeout = null;

  const stop = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
  };

  const start = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      callback();
      start();
    }, INTERVAL);
  };

  return { start, stop };
};

export default getTimeout;
