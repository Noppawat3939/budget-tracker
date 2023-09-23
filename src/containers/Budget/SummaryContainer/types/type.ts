import type { Expenses, Incomes } from "@/types";

export type Columns = "date" | "income" | "expense" | "balance";

export type RowData = Record<Columns, string>;

type TotalBudget = { income: number; expense: number };

export type SummaryColumns = {
  label: string;
  key: Columns;
}[];

export type TRows<T extends string> = Partial<
  Record<T, string | number | React.ReactNode>
>[];

export type SummaryRowsData = TRows<Columns>;

export type BalanceData = {
  budgetId: string;
  incomeValues: number;
  expenseValues: number;
  totalBalance: number;
}[];

export type BudgetData = {
  budgetId: string;
  createdAt: Date;
  expenses: Expenses;
  incomes: Incomes;
  total: TotalBudget;
}[];
