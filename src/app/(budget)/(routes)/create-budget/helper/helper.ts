import {
  cleanUpFirstCharacter,
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@/helper";

const LOCAL_STORAGE_KEY = "create_budget";

export const setCreateBudgetToLocalStorage = (value: string) =>
  setLocalStorage(LOCAL_STORAGE_KEY, value);

export const removeCreateBudgetFromStorage = () =>
  removeLocalStorage(LOCAL_STORAGE_KEY);

export const getCreateBudgetFromStorage = () => {
  const foundValue = getLocalStorage(LOCAL_STORAGE_KEY);

  if (foundValue) return foundValue;
};

export const cleanUpCreateBudgetValue = (
  key: "description" | "value",
  value: string
) => {
  if (key === "value") {
    const cleaned = cleanUpFirstCharacter(value);

    return cleaned;
  }

  return value;
};
