import {
  DEFAULT_VALUE_NUMBER,
  EMPTY_ARRAY,
  FIRST_INDEX,
  PERCENT,
} from "@/constants";
import { toPercent } from "@/helper";
import type { Expenses, IFBudgetTotal, Incomes, TCreateBudget } from "@/types";

type Data =
  | {
      budgetId: string;
      expenses: Expenses;
      incomes: Incomes;
      total: IFBudgetTotal;
    }[]
  | undefined;

export const getIncomes = (data: Data) => {
  const incomeData =
    data
      ?.map((item) =>
        item["incomes"]
          ?.sort((inA, inB) => inB?.value - inA?.value)
          ?.map((income) => ({
            label: income?.income,
            value: income?.value,
          }))
      )
      ?.at(FIRST_INDEX) ?? EMPTY_ARRAY;

  const incomeValues = incomeData?.map((income) => income?.value);
  const totalIncomeValue = incomeValues?.reduce(
    (prev, cur) => prev + cur,
    DEFAULT_VALUE_NUMBER
  );

  return { incomeData, incomeValues, totalIncomeValue };
};

export const getExpenses = (data: Data) => {
  const expenseData =
    data
      ?.map((item) =>
        item["expenses"]
          ?.sort((exA, exB) => exB?.value - exA?.value)
          ?.map((expense) => ({
            label: expense?.expense,
            value: expense?.value,
          }))
      )
      ?.at(FIRST_INDEX) ?? EMPTY_ARRAY;

  const expenseValues = expenseData?.map((expense) => expense?.value);
  const totalExpenseValue = expenseValues?.reduce(
    (prev, cur) => prev + cur,
    DEFAULT_VALUE_NUMBER
  );

  return { expenseData, expenseValues, totalExpenseValue };
};

export const renderChartBackground = (key: TCreateBudget, values: number[]) => {
  const total = values.reduce((pre, cur) => pre + cur, DEFAULT_VALUE_NUMBER);
  const ADDED_INTENSE = 2;

  if (key === "income")
    return values.map(
      (val) =>
        `rgba(27,156,135,${String(
          (+toPercent(val, total).replaceAll(" %", "") / PERCENT) *
            ADDED_INTENSE
        )})`
    );

  return values.map(
    (val) =>
      `rgba(199,0,57,${String(
        (+toPercent(val, total).replaceAll(" %", "") / PERCENT) * ADDED_INTENSE
      )})`
  );
};
