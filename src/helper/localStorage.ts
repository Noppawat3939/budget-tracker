export const localStorage = () => {
  const set = (key: string, value: string) => {
    window.localStorage.setItem(key, value);
  };

  const get = (key: string) => {
    try {
      const value = window.localStorage.getItem(key);

      return value;
    } catch {
      console.error(`can not get local storage key ${key}`);

      return;
    }
  };

  const remove = (key: string) => {
    try {
      const value = window.localStorage.removeItem(key);

      return value;
    } catch {
      console.error(`can not remove local storage key ${key}`);

      return;
    }
  };

  const clear = () => window.localStorage.clear();

  return { set, get, remove, clear };
};
