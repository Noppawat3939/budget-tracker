import {
  IFBudgetTotal,
  Incomes,
  Expenses,
  TCreateBudget,
  IFIncomeData,
  IFExpenseData,
} from "@/types";

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

export type PostCreateIncomeOrExpenseRequest = {
  body:
    | (IncomeRequest & { budgetId: string })
    | (ExpenseRequest & { budgetId: string });
  query: TCreateBudget;
  idToken: string;
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

type BudgetDirection = TCreateBudget;

export type GetBudgetByBudgetIdRequest = {
  budgetId: string;
  idToken: string;
  direction?: BudgetDirection;
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

export type GetBudgetByQuerySearchRequest = {
  idToken: string;
  search: string;
};

export type GetBudgetByQuerySearchResponse = {
  message: string;
  data: {
    incomes: Incomes;
    expenses: Expenses;
  };
};

export type PutEditBudgetRequest = {
  idToken: string;
  body: {
    income?: IFIncomeData;
    expense?: IFExpenseData;
  };
};

export type PutEditBudgetResponse = {
  message: string;
  data: IFExpenseData | IFIncomeData;
};

type DeleteBudgetParam = "incomeId" | "expenseId";

export type DeleteBudgetRequest = {
  idToken: string;
  param: Partial<Record<DeleteBudgetParam, string>>;
};

export type GetIncomeDataRequest = {
  idToken: string;
};

export type GetIncomeDataResponse = {
  message: string;
  data: (IFIncomeData & { budgetId: string })[];
};

export type GetExpenseDataRequest = {
  idToken: string;
};

export type GetExpenseDataResponse = {
  message: string;
  data: (IFExpenseData & { budgetId: string })[];
};
