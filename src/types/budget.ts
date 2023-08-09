export type TBudget = "income" | "expend" | "balance";

export type TIncomeValues = {
  createdBudget: string;
  type: TBudget;
  id: string;
  value: string;
  description: string;
};
