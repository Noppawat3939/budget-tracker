import { cleanUpFirstCharacter, removeLocalStorage } from "@/helper";

const LOCAL_STORAGE_KEY = "create_budget";

export const removeCreateBudgetFromStorage = () =>
  removeLocalStorage(LOCAL_STORAGE_KEY);

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
