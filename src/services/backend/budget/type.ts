import { IFCreateExpense, IFCreateIncome } from "@/types";

export type CreateIncomeParams = IFCreateIncome & { budgetId: string };
export type CreateExpenseParams = IFCreateExpense & { budgetId: string };
export type CreateBudgetParams = {
  incomes: IFCreateIncome;
  expenses: IFCreateExpense;
  userId: string;
};
