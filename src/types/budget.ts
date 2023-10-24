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
export interface IFBudgetTotal {
  income: number;
  expense: number;
}

export interface IFIncomeData {
  incomeId: string;
  income: string;
  description?: string;
  value: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IFExpenseData {
  expenseId: string;
  description?: string;
  expense: string;
  value: number;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateBudgetRequest = {
  income?: IFCreateIncome;
  expense?: IFCreateExpense;
  budgetId?: string;
};

export type Expenses = IFExpenseData[];

export type Incomes = IFIncomeData[];

export type Budget = {
  budgetId: string;
  incomes: Incomes;
  expenses: {
    expense: Expenses;
  };
};
