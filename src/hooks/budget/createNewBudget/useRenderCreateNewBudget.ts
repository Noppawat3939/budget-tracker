"use client";

import {
  DEFAULT_TEXT,
  DEFAULT_VALUE_NUMBER,
  EMPTY_STRING,
  FIRST_INDEX,
  PERCENT,
} from "@/constants";
import { toPercent } from "@/helper";
import { useGetBudgetByBudgetId } from "@/hooks";
import { DoughnutChart, TBudget } from "@/types";
import { useSearchParams } from "next/navigation";

type SummaryList = {
  order: string;
  price: number;
  type: TBudget;
  description?: string;
}[];

const CACHE_TIME = 60000; //1 minute

function useRenderCreateNewBudget() {
  const search = useSearchParams();
  const budgetId = search.get("id") || EMPTY_STRING;

  const { data: budget, isFetched } = useGetBudgetByBudgetId({
    budgetId,
    cacheTime: CACHE_TIME,
  });

  const expensesMap = budget
    ?.flatMap((item) => item.expenses)
    ?.sort((exA, exB) => exB.value - exA.value)
    ?.map((expense) => ({
      order: expense.expense,
      price: expense.value,
      type: "expend",
      description: expense.description || DEFAULT_TEXT,
    }));

  const newBudgetMap = budget
    ?.map((item) => ({
      sumIncome: item.incomes
        .map((ic) => ic.value)
        .reduce((preIc, curIc) => preIc + curIc, DEFAULT_VALUE_NUMBER),
      sumExpense: item.expenses
        .map((ep) => ep.value)
        .reduce((preEp, curEp) => preEp + curEp, DEFAULT_VALUE_NUMBER),
    }))
    .at(FIRST_INDEX);

  const summaryList =
    expensesMap && budgetId ? ([...expensesMap] as SummaryList) : undefined;

  const sumIncome = budgetId
    ? newBudgetMap?.sumIncome! - newBudgetMap?.sumExpense!
    : DEFAULT_VALUE_NUMBER;

  const expenseValues = budget?.flatMap((item) =>
    item.expenses.map((exp) => exp.value)
  );

  const totalExpenses =
    expenseValues?.reduce((pre, cur) => pre + cur, DEFAULT_VALUE_NUMBER) ||
    DEFAULT_VALUE_NUMBER;

  const renderChartBackground = expenseValues?.map(
    (value) =>
      `rgba(250,0,0,${
        (+toPercent(value, totalExpenses).replaceAll(" %", "") / PERCENT) * 2
      })`
  );

  const renderChartData = budgetId
    ? ({
        labels: budget?.flatMap((item) =>
          item.expenses.map((exp) => exp.expense)
        ),
        datasets: [
          {
            data: expenseValues,
            backgroundColor: renderChartBackground,
          },
        ],
      } as DoughnutChart)
    : undefined;

  return {
    summaryList,
    sumIncome,
    isFetched,
    renderChartData,
  };
}

export default useRenderCreateNewBudget;
