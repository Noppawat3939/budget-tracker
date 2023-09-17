import { formatDate, numberFormatter } from "@/helper";
import type { BalanceData, BudgetData, SummaryColumns } from "../types";

export const renderSummaryRows = ({
  budgetData,
  balanceData,
}: {
  budgetData: BudgetData;
  balanceData: BalanceData;
}) => {
  const FORMAT_DATE = "DD MMM YYYY";

  if (budgetData?.length && balanceData?.length) {
    const newMap = budgetData.map((items) => {
      return {
        date: formatDate(items.createdAt, FORMAT_DATE),
        income:
          items.incomes.map((incomeVal) => incomeVal.income).length > 1
            ? items.incomes.map((incomeVal) => incomeVal.income).join(",")
            : items.incomes.map((incomeVal) => incomeVal.income).toString(),
        expense: items.expenses.map((expenseVal) => expenseVal.expense)
          ? items.expenses.map((expenseVal) => expenseVal.expense).join(",")
          : items.expenses.map((expenseVal) => expenseVal.expense).toString(),
        balance: numberFormatter(
          balanceData.find((balance) => balance.budgetId === items.budgetId)
            ?.totalBalance || 0
        ),
      };
    });

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
    label: "Balance (฿)",
    key: "balance",
  },
];
