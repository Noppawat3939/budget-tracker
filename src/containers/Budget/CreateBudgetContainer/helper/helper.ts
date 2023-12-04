import { cleanUpFirstCharacter } from "@/helper";

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
