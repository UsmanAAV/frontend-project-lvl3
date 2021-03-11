/* eslint-disable */
import { INTERVAL } from './constants';
import { TTimeoutResult } from './types';

// eslint-disable-next-line @typescript-eslint/ban-types
const getTimeout = (callback: Function): TTimeoutResult => {
  let timeout: NodeJS.Timeout | null = null;

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
