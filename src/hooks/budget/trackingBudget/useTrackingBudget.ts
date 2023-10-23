import { EMPTY_ARRAY } from "@/constants";
import { useGetExpenseData } from "..";

function useTrackingBudget() {
  const expenses = useGetExpenseData();

  const trackingChart = expenses.data
    ? expenses.data.map(({ expense, updatedAt, value, createdAt }) => ({
        expense,
        date: (updatedAt ?? createdAt) as string,
        value,
      }))
    : EMPTY_ARRAY;

  const topExpenses = expenses?.data
    ? expenses.data?.sort((a, b) => b.value - a.value)
    : EMPTY_ARRAY;

  return {
    queryExpenses: expenses,
    trackingChart,
    topExpenses,
  };
}

export default useTrackingBudget;
