export type TBudget = "income" | "expend" | "balance";

export type TCreateBudget = "income" | "expense";

export interface IFCreateIncome {
  income: string;
  description?: string;
  value: number;
}

export interface IFCreateExpense {
  expense: string;
  description?: string;
  value: number;
}

export type CreateBudgetRequest = {
  income?: IFCreateIncome;
  expense?: IFCreateExpense;
  budgetId?: string;
};
