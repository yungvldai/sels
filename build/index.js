/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

// UNUSED EXPORTS: default

;// CONCATENATED MODULE: ./src/avail.ts
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _ref = function () {
  try {
    return [typeof localStorage !== 'undefined' && !!localStorage, null];
  } catch (e) {
    return [false, e];
  }
}(),
    _ref2 = _slicedToArray(_ref, 2),
    isLocalStorageAvailable = _ref2[0],
    error = _ref2[1];

/* harmony default export */ const avail = (isLocalStorageAvailable);

;// CONCATENATED MODULE: ./src/parsePeriod.ts
function parsePeriod_slicedToArray(arr, i) { return parsePeriod_arrayWithHoles(arr) || parsePeriod_iterableToArrayLimit(arr, i) || parsePeriod_unsupportedIterableToArray(arr, i) || parsePeriod_nonIterableRest(); }

function parsePeriod_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function parsePeriod_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return parsePeriod_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return parsePeriod_arrayLikeToArray(o, minLen); }

function parsePeriod_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function parsePeriod_iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function parsePeriod_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var tokenRegex = /^(\d+)([dwmyh]{1})$/i;

var parsePeriod = function parsePeriod(input) {
  return input.split(' ').reduce(function (result, token) {
    var matchResult = token.match(tokenRegex);

    if (!matchResult) {
      return result;
    }

    var _matchResult = parsePeriod_slicedToArray(matchResult, 3),
        _amount = _matchResult[1],
        units = _matchResult[2];

    var amount = Number(_amount);

    switch (units) {
      case 'd':
        {
          result.setDate(result.getDate() + amount);
          return result;
        }

      case 'w':
        {
          /**
           * в jira 1w = 5d, но по моему удобнее когда 1w = 7d
           */
          result.setDate(result.getDate() + 7 * amount);
          return result;
        }

      case 'm':
        {
          result.setMonth(result.getMonth() + amount);
          return result;
        }

      case 'y':
        {
          result.setFullYear(result.getFullYear() + amount);
          return result;
        }

      case 'h':
        {
          result.setHours(result.getHours() + amount);
          return result;
        }

      default:
        return result;
    }
  }, new Date());
};

/* harmony default export */ const src_parsePeriod = (parsePeriod);
;// CONCATENATED MODULE: ./src/constants.ts
var MS_PER_S = 1000;
var EXPIRES_KEY_SUFFIX = '@expires';
;// CONCATENATED MODULE: ./src/index.ts




var getTimestamp = function getTimestamp(date) {
  if (date instanceof Date) {
    return date.getTime();
  }

  if (typeof date === 'string') {
    var parsed = Date.parse(date);

    if (!Number.isNaN(parsed)) {
      return parsed;
    }
    /**
     * Если ничего не заматчится, то вернется дата сейчас
     */


    return src_parsePeriod(date);
  }

  return null;
};

var set = function set(key, value, options) {
  if (!avail) {
    return false;
  }

  var _ref = options || {},
      maxAge = _ref.maxAge,
      expiresDate = _ref.expires;

  var expires = null;

  if (maxAge) {
    expires = Date.now() + MS_PER_S * maxAge;
  }

  if (expiresDate) {
    expires = getTimestamp(expiresDate);
  }

  localStorage.setItem(key, String(value));

  if (expires) {
    localStorage.setItem("".concat(key).concat(EXPIRES_KEY_SUFFIX), String(expires));
  } else {
    localStorage.removeItem("".concat(key).concat(EXPIRES_KEY_SUFFIX));
  }

  return true;
};

var remove = function remove(key) {
  if (!avail) {
    return false;
  }

  localStorage.removeItem(key);
  return true;
};

var deleteExpired = function deleteExpired(key) {
  localStorage.removeItem(key);
  localStorage.removeItem("".concat(key).concat(EXPIRES_KEY_SUFFIX));
};

var get = function get(key) {
  return new Promise(function (resolve, reject) {
    if (!avail) {
      reject(error);
    }

    var now = Date.now();
    var value = localStorage.getItem(key);
    var expires = localStorage.getItem("".concat(key).concat(EXPIRES_KEY_SUFFIX));

    if (expires && Number(expires) < now) {
      deleteExpired(key);
      resolve(null);
      return;
    }

    resolve(value);
  });
};

var clear = function clear() {
  if (!avail) {
    return false;
  }

  localStorage.clear();
  return true;
};

/* harmony default export */ const src = ({
  clear: clear,
  get: get,
  set: set,
  remove: remove
});
/******/ })()
;