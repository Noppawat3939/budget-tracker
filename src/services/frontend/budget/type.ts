import { IFBudgetTotal, Incomes, Expenses } from "@/types";

export type PostCreateNewBudgetResponse = {
  message: string;
  budget: Budget;
};

type Budget = {
  budgetId: string;
  incomes: Incomes;
  expenses: {
    expense: Expenses;
  };
};

type IncomeRequest = {
  income: {
    income: string;
    value: number;
    description?: string;
  };
};

type ExpenseRequest = {
  expense: {
    expense: string;
    value: number;
    description?: string;
  };
};

type BalanceData = {
  budgetId: string;
  incomeValues: number;
  expenseValues: number;
  totalBalance: number;
};

export type PostCreateNewBudgetRequest = {
  body: IncomeRequest & ExpenseRequest;
  idToken: string;
};

export type PostCreateIncomeExpenseRequest = {
  body: IncomeRequest | ExpenseRequest;
  query: "income" | "expense";
  idToken: string;
};

export type GetAllBudgetRequest = {
  idToken: string;
};

export type GetBudgetBalanceRequest = {
  idToken: string;
};

export type GetBudgetBalanceByBudgetIdRequest = {
  idToken: string;
  budgetId: string;
};

export type GetBudgetBalanceByBudgetIdResponse = {
  message: string;
  data: BalanceData;
};

export type GetAllBudgetResponse = {
  message: string;
  data: {
    budgetId: string;
    createdAt: Date;
    expenses: Expenses;
    incomes: Incomes;
    total: IFBudgetTotal;
  }[];
};

export type GetBudgetBalanceResponse = {
  message: string;
  data: {
    budgetId: string;
    incomeValues: number;
    expenseValues: number;
    totalBalance: number;
  }[];
};

export type GetBudgetByBudgetIdRequest = {
  budgetId: string;
  idToken: string;
};

export type GetBudgetByBudgetIdResponse = {
  message: string;
  data: {
    budgetId: string;
    expenses: Expenses;
    incomes: Incomes;
    total: IFBudgetTotal;
  }[];
};
