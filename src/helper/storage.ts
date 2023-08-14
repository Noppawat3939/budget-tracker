export const setLocalStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string) => {
  const value = window.localStorage.getItem(key);

  return value;
};

export const removeLocalStorage = (key: string) =>
  window.localStorage.getItem(key);

export const clearLocalStorage = () => window.localStorage.clear();

export const getLocalStorageLength = () => window.localStorage.length;
