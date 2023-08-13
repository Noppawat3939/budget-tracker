import { TCreateBudget } from "@/types";

export type TBudgetValues = {
  id: string;
  title: string;
  description?: string;
  value: string;
  createdAt: string;
};

export type BudgetStorage = Record<TCreateBudget, TBudgetValues[]>;

export type TCreateBudgetValues = Record<
  TCreateBudget,
  { value: string; title: string; description: string }
>;
