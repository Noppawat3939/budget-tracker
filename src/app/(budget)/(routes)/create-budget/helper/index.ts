import { getLocalStorage, setLocalStorage } from "@/helper";

//TODO: get login from hooks
let login = false;

const LOCAL_STORAGE_KEY = "create_budget";
const LOGIN_LOCAL_STORAGE_KEY = "login";

export const setNewBudgetWithoutLogin = (value: string) => {
  if (!login && !getLocalStorage(LOGIN_LOCAL_STORAGE_KEY)) {
    setLocalStorage(LOGIN_LOCAL_STORAGE_KEY, "[]");
  }

  setLocalStorage(LOCAL_STORAGE_KEY, value);
};

export const getCreateBudgetFromStorage = () => {
  const foundValue = getLocalStorage(LOCAL_STORAGE_KEY);

  if (foundValue) return foundValue;
};
