import { formatDate, numberFormatter, toSubString } from "@/helper";
import type { BalanceData, BudgetData, SummaryColumns } from "../types";
import { DEFAULT_VALUE_NUMBER } from "@/constants";

export const renderSummaryRows = ({
  budgetData,
  balanceData,
}: {
  budgetData: BudgetData;
  balanceData: BalanceData;
}) => {
  const FORMAT_DATE = "DD MMM YYYY";

  const MAX_WORD_ON_ROW = 25;
  const ORDERS = 2;

  if (budgetData?.length && balanceData?.length) {
    const newMap = budgetData.map((items) => {
      const date = formatDate(items.createdAt, FORMAT_DATE);
      const income =
        items.incomes.map((incomeVal) => incomeVal.income).length >= ORDERS
          ? toSubString(
              items.incomes
                .map((incomeVal) => incomeVal.income)
                .sort()
                .join(", "),
              MAX_WORD_ON_ROW
            )
          : items.incomes.map((incomeVal) => incomeVal.income).toString();
      const expense =
        items.expenses.map((expenseVal) => expenseVal.expense).length >= ORDERS
          ? toSubString(
              items.expenses
                .map((expenseVal) => expenseVal.expense)
                .sort()
                .join(", "),
              MAX_WORD_ON_ROW
            )
          : items.expenses.map((expenseVal) => expenseVal.expense).toString();
      const balance = numberFormatter(
        balanceData.find((balance) => balance.budgetId === items.budgetId)
          ?.totalBalance || DEFAULT_VALUE_NUMBER
      );

      return { date, income, expense, balance };
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
