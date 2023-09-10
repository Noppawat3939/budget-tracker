export type PostCreateNewBudgetResponse = {
  message: string;
  budget: Budget;
};

type Budget = {
  budgetId: string;
  incomes: Income[];
  expenses: Expenses;
};

type Expenses = {
  expense: Expense[];
};

type Expense = {
  expenseId: string;
  expense: string;
  value: number;
  description: string;
};

type Total = {
  income: number;
  expense: number;
};

type Income = {
  incomeId: string;
  income: string;
  value: number;
  description: string;
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

export type GetAllBudgetResponse = {
  message: string;
  data: {
    budgetId: string;
    incomes: Income[];
    expenses: Expense[];
    total: Total;
  };
};
