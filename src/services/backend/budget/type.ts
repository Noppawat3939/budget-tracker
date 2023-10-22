import { IFCreateExpense, IFCreateIncome, IFExpenseData } from "@/types";

export type CreateIncomeParams = IFCreateIncome & { budgetId: string };
export type CreateExpenseParams = IFCreateExpense & { budgetId: string };
export type CreateBudgetParams = {
  incomes: IFCreateIncome;
  expenses: IFCreateExpense;
  userId: string;
};

export type GetBudgetParams = {
  userId: string;
  selectedIncome?: boolean;
  selectedExpense?: boolean;
};
export type GetBudgetByIdParams = {
  budgetId: string;
  isIncome?: boolean;
  isExpenses?: boolean;
};

export type UpdateExpenseParams = {
  expenseId: string;
  newExpense: Partial<Omit<IFExpenseData, "expenseId">>;
};

export type UpdateIncomeParams = {
  incomeId: string;
  newIncome: Partial<Omit<IFCreateIncome, "incomeId">>;
};
