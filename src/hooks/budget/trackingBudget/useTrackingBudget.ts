"use client";

import { EMPTY_ARRAY, QUERY_KEY, _UDF } from "@/constants";
import { useGetExpenseData } from "..";
import { useQueries } from "@tanstack/react-query";
import { getBudgetTimestamp, getBudgetTotal } from "@/services";
import { useUser } from "@/hooks";
import {
  formatDate,
  getFirstDateOfMonth,
  getLastDateOfMonth,
  getPrevMonth,
  getUnique,
  toNumber,
  toString,
} from "@/helper";
import { identity, isEmpty } from "lodash";
import { AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import dayjs from "dayjs";

type TotalResponse = { count: number; value: number; message: string };
type TimestampResponse = AxiosResponse<{ message: string; data: Date[] }>;

const FORMAT_DATE = "YYYY-MM-DD";
const FORMAT_DATE_FILTER = "MMM YYYY";

function useTrackingBudget() {
  const { data: user } = useUser();

  const [selectedFilter, setSelectedFilter] = useState("");

  const [current, setCurrent] = useState({
    startDate: getFirstDateOfMonth(_UDF, FORMAT_DATE),
    endDate: getLastDateOfMonth(_UDF, FORMAT_DATE),
  });
  const [previous, setPrevious] = useState({
    startDate: getFirstDateOfMonth(getPrevMonth(), FORMAT_DATE),
    endDate: getLastDateOfMonth(getPrevMonth(), FORMAT_DATE),
  });

  const enabled = !isEmpty(user?.idToken);

  const [currentTotal, previousTotal, budgetTimestamp] = useQueries({
    queries: [
      {
        queryFn: () =>
          getBudgetTotal({
            idToken: toString(user?.idToken),
            query: "expense",
            startDate: current.startDate,
            endDate: current.endDate,
          }),
        queryKey: [
          QUERY_KEY.GET_BUDGET_TOTAL,
          current.startDate,
          current.endDate,
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
            startDate: previous.startDate,
            endDate: previous.endDate,
          }),
        queryKey: [
          QUERY_KEY.GET_BUDGET_TOTAL,
          previous.startDate,
          previous.endDate,
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
  const expenses = useGetExpenseData({
    startDate: current.startDate,
    endDate: current.endDate,
  });

  const onSelectedFilter = useCallback(
    (selected: string) => {
      const foundCurrentDate = budgetTimestamp.data?.find(
        (date) => formatDate(date, "MMM YYYY") === selected
      );

      setPrevious({
        startDate: getFirstDateOfMonth(
          dayjs(foundCurrentDate).add(-1),
          FORMAT_DATE
        ),
        endDate: getLastDateOfMonth(
          dayjs(foundCurrentDate).add(-1),
          FORMAT_DATE
        ),
      });

      setCurrent({
        startDate: getFirstDateOfMonth(foundCurrentDate, FORMAT_DATE),
        endDate: getLastDateOfMonth(foundCurrentDate, FORMAT_DATE),
      });

      setSelectedFilter(selected);
    },
    [budgetTimestamp.data]
  );

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

  const formattedFilterTimestamp = budgetTimestamp.data
    ?.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .map((date) => formatDate(date, FORMAT_DATE_FILTER) || EMPTY_ARRAY);

  const uniqueFilterTracking = getUnique(formattedFilterTimestamp) as string[];

  const loading = {
    total: [currentTotal.isLoading, previousTotal.isLoading].some(identity),
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
    filter: {
      selectedFilter,
      renderFilter: uniqueFilterTracking,
      onFilter: onSelectedFilter,
    },
  };
}

export default useTrackingBudget;
