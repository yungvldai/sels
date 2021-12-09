import isLocalStorageAvailable, { error } from './avail';
import parsePeriod from './parsePeriod';
import { EXPIRES_KEY_SUFFIX, MS_PER_S } from './constants';
import { RecordValue, RecordOptions } from './types';

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
    return parsePeriod(date).getTime();
  }

  return null;
};

const _internalRemove = (key: string) => {
  localStorage.removeItem(key);
  localStorage.removeItem(`${key}${EXPIRES_KEY_SUFFIX}`);
};

const _internalGet = (key: string) => {
  const now = Date.now();

  const value = localStorage.getItem(key);
  const expires = localStorage.getItem(`${key}${EXPIRES_KEY_SUFFIX}`);

  if (expires && Number(expires) < now) {
    _internalRemove(key);
    return null;
  }

  return value;
};

const set = (key: string, value: RecordValue, options?: RecordOptions): boolean => {
  if (!isLocalStorageAvailable) {
    return false;
  }

  const { maxAge, expires: expiresDate } = options || {};

  let expires = null;

  if (!Number.isNaN(Number(maxAge))) {
    expires = Date.now() + MS_PER_S * maxAge!;
  }

  if (expiresDate) {
    expires = getTimestamp(expiresDate);
  }

  if (typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, String(value));
  }

  if (expires) {
    localStorage.setItem(`${key}${EXPIRES_KEY_SUFFIX}`, String(expires));
  } else {
    localStorage.removeItem(`${key}${EXPIRES_KEY_SUFFIX}`);
  }

  return true;
};

const remove = (key: string): boolean => {
  if (!isLocalStorageAvailable) {
    return false;
  }

  _internalRemove(key);
  return true;
};

const get = (key: string): string | null => {
  if (!isLocalStorageAvailable) {
    return null;
  }

  return _internalGet(key);
};

const asyncGet = (key: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    if (!isLocalStorageAvailable) {
      reject(error);
      return;
    }

    resolve(_internalGet(key));
  });
};

const clear = (): boolean => {
  if (!isLocalStorageAvailable) {
    return false;
  }

  localStorage.clear();
  return true;
};

const isAvailable = isLocalStorageAvailable;

const Sels = Object.freeze({
  clear,
  get,
  asyncGet,
  set,
  remove,
  isAvailable
});

export default Sels;
export { clear, get, asyncGet, set, remove, isAvailable };
