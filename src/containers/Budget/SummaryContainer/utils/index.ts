import { formatDate } from "@/helper";
import { GetAllBudgetResponse } from "@/services/frontend/budget/type";
import type { SummaryColumns, SummaryRowsData } from "../types";

export const renderSummaryRows = (data: GetAllBudgetResponse) => {
  const FORMAT_DATE = "DD MMM YYYY";

  if (data?.data) {
    const newMap: SummaryRowsData = data.data.map((items) => ({
      date: formatDate(items.createdAt, FORMAT_DATE),
      income:
        items.incomes.map((incomeVal) => incomeVal.income).length > 1
          ? items.incomes.map((incomeVal) => incomeVal.income).join(",")
          : items.incomes.map((incomeVal) => incomeVal.income).toString(),
      expense: items.expenses.map((expenseVal) => expenseVal.expense)
        ? items.expenses.map((expenseVal) => expenseVal.expense).join(",")
        : items.expenses.map((expenseVal) => expenseVal.expense).toString(),
      balance: 0,
    }));

    return newMap;
  }
};

export const renderSummaryColumns: SummaryColumns = [
  {
    label: "Date",
    key: "date",
  },
  {
    label: "Income",
    key: "income",
  },
  {
    label: "Expense",
    key: "expense",
  },
  {
    label: "Cash Balance",
    key: "balance",
  },
];
