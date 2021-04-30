const [isLocalStorageAvailable, error] = (() => {
  try {
    return [typeof localStorage !== 'undefined' && !!localStorage, null];
  } catch (e) {
    return [false, e];
  }
})();

export default isLocalStorageAvailable;
export { error };
