import { EMPTY_ARRAY, QUERY_KEY } from "@/constants";
import { useGetExpenseData } from "..";
import { useQueries } from "@tanstack/react-query";
import { getBudgetTimestamp, getBudgetTotal } from "@/services";
import { useUser } from "@/hooks";
import {
  formatDate,
  getEndDateOfCurrentMonth,
  getEndDateOfPreviousMonth,
  getStartDateOfCurrentMonth,
  getStartDateOfPreviousMonth,
  getUnique,
  toNumber,
  toString,
} from "@/helper";
import { identity, isEmpty } from "lodash";
import { AxiosResponse } from "axios";

type TotalResponse = { count: number; value: number; message: string };
type TimestampResponse = AxiosResponse<{ message: string; data: Date[] }>;

const FORMAT_DATE = "YYYY-MM-DD";

const currentMonth = {
  startDate: getStartDateOfCurrentMonth(FORMAT_DATE),
  endDate: getEndDateOfCurrentMonth(FORMAT_DATE),
};
const previousMonth = {
  startDate: getStartDateOfPreviousMonth(FORMAT_DATE),
  endDate: getEndDateOfPreviousMonth(FORMAT_DATE),
};

function useTrackingBudget() {
  const expenses = useGetExpenseData({
    startDate: currentMonth.startDate,
    endDate: currentMonth.endDate,
  });
  const { data: user } = useUser();

  const enabled = !isEmpty(user?.idToken);

  const [currentTotal, previousTotal, budgetTimestamp] = useQueries({
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
        refetchOnWindowFocus: false,
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
        refetchOnWindowFocus: false,
        select: ({ data: { count, value } }: { data: TotalResponse }) => ({
          count,
          value,
        }),
      },
      {
        queryFn: () => getBudgetTimestamp({ idToken: toString(user?.idToken) }),
        queryKey: [QUERY_KEY.GET_BUDGET_TIMESTAMP],
        enabled,
        refetchOnWindowFocus: false,
        select: ({ data }: TimestampResponse) => data.data,
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

  const formattedFilterTimestamp = budgetTimestamp.data?.map(
    (date) => formatDate(date, "MMM YYYY") || EMPTY_ARRAY
  );
  const uniqueFilterTracking = getUnique(formattedFilterTimestamp) as string[];

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
    renderFilter: uniqueFilterTracking,
  };
}

export default useTrackingBudget;
