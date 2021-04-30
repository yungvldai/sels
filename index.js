const MS_PER_S = 1000;

const isLocalStorageAvailable = (() => {
  try {
    return typeof localStorage !== 'undefined' && !!localStorage;
  } catch (e) {
    console.error(e);
  }
})();

const parseJiraLikePeriod = (input) => {
  return input.split(' ').reduce((result, token) => {
    if (!re.test(token)) {
      return result;
    }

    const [, _amount, units] = token.match(re);
    const amount = Number(_amount);

    switch (units) {
      case 'd': {
        result.setDate(result.getDate() + amount);
        return result;
      }

      case 'w': {
        /**
         * в jira 1w = 5d, но по моему удобнее когда 1w = 7d
         */
        result.setDate(result.getDate() + 7 * amount);
        return result;
      }

      case 'm': {
        result.setMonth(result.getMonth() + amount);
        return result;
      }

      case 'y': {
        result.setFullYear(result.getFullYear() + amount);
        return result;
      }

      case 'h': {
        result.setHours(result.getHours() + amount);
        return result;
      }

      case 'm': {
        result.setMinutes(result.getMinutes() + amount);
        return result;
      }
    }
  }, new Date());
}

const getTimestamp = (date) => {
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
    return parseJiraLikePeriod(date);
  }

  return null;
}

const set = (key, value, options = {}) => {
  if (!isLocalStorageAvailable) {
    return false;
  }

  const {
    maxAge,
    expires: expiresDate,
  } = options;

  let expires = null;

  if (maxAge) {
    expires = Date.now() + MS_PER_S * maxAge;
  }

  if (expiresDate) {
    expires = getTimestamp(expiresDate);
  }

  if (expires) {
    localStorage.setItem(key, JSON.stringify({
      value,
      expires
    }));
    return true;
  }

  localStorage.setItem(key, { value });

  return true;
}

const remove = (key) => {
  if (!isLocalStorageAvailable) {
    return false;
  }

  localStorage.removeItem(key);
  return true;
}

const get = (key) => {
  return new Promise((resolve, reject) => {
    if (!isLocalStorageAvailable) {
      reject();
    }

    const value = localStorage.getItem(key);

    try {
      const parsed = JSON.parse(value);
      const { value, expires } = parsed;
      const now = Date.now();

      if (expires === undefined || expires > now) {
        resolve(value);
        return;
      }

      localStorage.removeItem(key);
      resolve(null);

    } catch (e) {
      resolve(value);
    }

    resolve(null);
  });
}

const clear = () => {
  if (!isLocalStorageAvailable) {
    return false;
  }

  localStorage.clear();
  return true;
}

export default {
  clear,
  get,
  set,
  remove
};
