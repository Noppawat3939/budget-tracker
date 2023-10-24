import { TCreateBudget, Budget } from "@/types";

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

export type PostCreateNewBudgetRequest = {
  body: IncomeRequest & ExpenseRequest;
  idToken: string;
};

export type PostCreateIncomeOrExpenseRequest = {
  body:
    | (IncomeRequest & { budgetId: string })
    | (ExpenseRequest & { budgetId: string });
  query: TCreateBudget;
  idToken: string;
};

export type PostCreateNewBudgetResponse = {
  message: string;
  budget: Budget;
};

type PostCreateOnlyIncomeResponse = {
  message: string;
  incomeResponse: {
    incomeId: string;
    income: string;
    value: number;
    description: string;
  };
};

type PostCreateOnlyExpenseResponse = {
  message: string;
  expenseResponse: {
    expenseId: string;
    expense: string;
    value: number;
    description: string;
  };
};

export type PostCreateIncomeOrExpenseResponse =
  | PostCreateOnlyIncomeResponse
  | PostCreateOnlyExpenseResponse;
