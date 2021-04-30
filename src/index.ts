import isLocalStorageAvailable, { error } from './avail';
import parsePeriod from './parsePeriod';
import { EXPIRES_KEY_SUFFIX, MS_PER_S } from './constants';

const getTimestamp = (date: Date | string) => {
  if (date instanceof Date) {
    return date.getTime();
  }

  if (typeof date === 'string') {
    const parsed = Date.parse(date);

    if (!Number.isNaN(parsed)) {
      return parsed;
    }

    /**
     * Если ничего не заматчится, то вернется дата сейчас
     */
    return parsePeriod(date);
  }

  return null;
};

type RecordValueType = string | boolean | number;

interface IRecordOptions {
  maxAge?: number;
  expires?: Date | string;
}

const set = (key: string, value: RecordValueType, options?: IRecordOptions) => {
  if (!isLocalStorageAvailable) {
    return false;
  }

  const { maxAge, expires: expiresDate } = options || {};

  let expires = null;

  if (maxAge) {
    expires = Date.now() + MS_PER_S * maxAge;
  }

  if (expiresDate) {
    expires = getTimestamp(expiresDate);
  }

  localStorage.setItem(key, String(value));

  if (expires) {
    localStorage.setItem(`${key}${EXPIRES_KEY_SUFFIX}`, String(expires));
  }

  return true;
};

const remove = (key: string) => {
  if (!isLocalStorageAvailable) {
    return false;
  }

  localStorage.removeItem(key);
  return true;
};

const get = (key: string) => {
  return new Promise((resolve, reject) => {
    if (!isLocalStorageAvailable) {
      reject(error);
    }

    const now = Date.now();

    const value = localStorage.getItem(key);
    const expires = localStorage.getItem(`${key}${EXPIRES_KEY_SUFFIX}`);

    if (expires && Number(expires) < now) {
      resolve(null);
      return;
    }

    resolve(value);
  });
};

const clear = () => {
  if (!isLocalStorageAvailable) {
    return false;
  }

  localStorage.clear();
  return true;
};

export default {
  clear,
  get,
  set,
  remove
};
