import { formatDate, numberFormatter, toSubString } from "@/helper";
import type { BalanceData, BudgetData, SummaryColumns } from "../types";

export const renderSummaryRows = ({
  budgetData,
  balanceData,
}: {
  budgetData: BudgetData;
  balanceData: BalanceData;
}) => {
  const FORMAT_DATE = "DD MMM YYYY";

  const MAX_WORD_ON_ROW = 25;

  if (budgetData?.length && balanceData?.length) {
    const newMap = budgetData.map((items) => {
      return {
        date: formatDate(items.createdAt, FORMAT_DATE),
        income:
          items.incomes.map((incomeVal) => incomeVal.income).length > 1
            ? toSubString(
                items.incomes
                  .map((incomeVal) => incomeVal.income)
                  .sort()
                  .join(", "),
                MAX_WORD_ON_ROW
              )
            : items.incomes.map((incomeVal) => incomeVal.income).toString(),
        expense: items.expenses.map((expenseVal) => expenseVal.expense)
          ? toSubString(
              items.expenses
                .map((expenseVal) => expenseVal.expense)
                .sort()
                .join(", "),
              MAX_WORD_ON_ROW
            )
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
