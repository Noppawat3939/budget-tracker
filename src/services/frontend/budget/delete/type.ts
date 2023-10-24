type DeleteBudgetParam = "incomeId" | "expenseId";

export type DeleteBudgetRequest = {
  idToken: string;
  param: Partial<Record<DeleteBudgetParam, string>>;
};
