import { TCreateBudget } from "@/types";

export type BudgetStorage = Record<
  TCreateBudget,
  { id: string; description: string; value: string; createdAt: string }[]
>;
