import { getLocalStorage, setLocalStorage } from "@/helper";

let login = false;

const DEFAULT_LOCAL_STORAGE_KEY = "create_budget";
const LOGIN_LOCAL_STORAGE_KEY = "login";

export const setNewBudgetWithoutLogin = (value: string) => {
  if (!login && !getLocalStorage(LOGIN_LOCAL_STORAGE_KEY)) {
    setLocalStorage(LOGIN_LOCAL_STORAGE_KEY, "[]");
  }

  setLocalStorage(DEFAULT_LOCAL_STORAGE_KEY, value);
};
