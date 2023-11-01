import { EMPTY_ARRAY, QUERY_KEY } from "@/constants";
import { useGetExpenseData } from "..";
import { useQueries } from "@tanstack/react-query";
import { getBudgetTotal } from "@/services";
import { useUser } from "@/hooks";
import { toNumber, toString } from "@/helper";
import { identity, isEmpty } from "lodash";
import dayjs from "dayjs";

type TotalResponse = { count: number; value: number; message: string };

const FORMAT_DATE = "YYYY-MM-DD";

function useTrackingBudget() {
  const expenses = useGetExpenseData();
  const { data: user } = useUser();

  const enabled = !isEmpty(user?.idToken);

  const currentMonth = {
    startDate: dayjs().startOf("month").format(FORMAT_DATE),
    endDate: dayjs().endOf("month").format(FORMAT_DATE),
  };
  const previousMonth = {
    startDate: dayjs().add(-1, "month").startOf("month").format(FORMAT_DATE),
    endDate: dayjs().add(-1, "month").endOf("month").format(FORMAT_DATE),
  };

  const [currentTotal, previousTotal] = useQueries({
    queries: [
      {
        queryFn: () =>
          getBudgetTotal({
            idToken: toString(user?.idToken),
            query: "expense",
            startDate: currentMonth.startDate,
            endDate: currentMonth.endDate,
          }),
        queryKey: [
          QUERY_KEY.GET_BUDGET_TOTAL,
          currentMonth.startDate,
          currentMonth.endDate,
        ],
        enabled,
        select: ({ data: { count, value } }: { data: TotalResponse }) => ({
          count,
          value,
        }),
      },
      {
        queryFn: () =>
          getBudgetTotal({
            idToken: toString(user?.idToken),
            query: "expense",
            startDate: previousMonth.startDate,
            endDate: previousMonth.endDate,
          }),
        queryKey: [
          QUERY_KEY.GET_BUDGET_TOTAL,
          previousMonth.startDate,
          previousMonth.endDate,
        ],
        enabled,
        select: ({ data: { count, value } }: { data: TotalResponse }) => ({
          count,
          value,
        }),
      },
    ],
  });

  const trackingChart = expenses.data
    ? expenses.data.map(({ expense, updatedAt, value, createdAt }) => ({
        expense,
        date: (updatedAt ?? createdAt) as string,
        value,
      }))
    : EMPTY_ARRAY;

  const sortedExpenses = expenses?.data
    ? expenses.data?.sort((a, b) => b.value - a.value)
    : EMPTY_ARRAY;

  const total = {
    current: toNumber(currentTotal.data?.value),
    previous: toNumber(previousTotal.data?.value),
    balance:
      toNumber(previousTotal.data?.value) - toNumber(currentTotal.data?.value),
  };

  const loading = {
    getTotal: [currentTotal.isLoading, previousTotal.isLoading].some(identity),
    expenses: expenses.isLoading,
  };

  return {
    queryExpenses: expenses,
    trackingChart,
    expenses: sortedExpenses,
    total,
    queriesTotal: {
      cur: currentTotal,
      prev: previousTotal,
    },
    loading,
  };
}

export default useTrackingBudget;
