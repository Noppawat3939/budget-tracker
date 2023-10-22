"use client";

import {
  DEFAULT_VALUE_NUMBER,
  EMPTY_ARRAY,
  FIRST_INDEX,
  ROUTES,
} from "@/constants";
import { useGetBudgetByBudgetId } from "@/hooks";
import { useCallback, useEffect, useState } from "react";
import { CardDescription } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { isEmpty } from "lodash";
import type { Expenses, IFBudgetTotal, Incomes, TCreateBudget } from "@/types";

type BudgetKey = TCreateBudget;
type Budget =
  | {
      budgetId: string;
      expenses: Expenses;
      incomes: Incomes;
      total: IFBudgetTotal;
    }[]
  | undefined;

const MIN_LENGTH = 1;

function useRenderSummaryDetail(budgetId: string) {
  const { push } = useRouter();

  const {
    data: budget,
    isLoading,
    isSuccess,
  } = useGetBudgetByBudgetId({
    budgetId,
  });

  const [selectedFilter, setSelectedFilter] = useState<BudgetKey>("expense");

  const hasData = {
    income: !isEmpty(budget?.flatMap((item) => item.incomes)),
    expense: !isEmpty(budget?.flatMap((item) => item.expenses)),
  };

  const isDisabledFilter = Object.values(hasData).includes(false);

  useEffect(() => {
    if (!hasData.income) return setSelectedFilter("expense");

    if (!hasData.expense) return setSelectedFilter("income");
  }, [hasData.expense, hasData.income]);

  const renderDescription = useCallback(
    (key: BudgetKey) => {
      return (
        budget?.at(FIRST_INDEX)?.total && (
          <CardDescription>{`${
            budget.at(FIRST_INDEX)!.total?.[key] > MIN_LENGTH
              ? `${budget?.[FIRST_INDEX].total[key]} items`
              : `${budget?.[FIRST_INDEX].total[key]} item`
          } of all your ${key}`}</CardDescription>
        )
      );
    },
    [budget]
  );

  const onSelectedFilter = (selectedValue: string) =>
    setSelectedFilter(selectedValue as BudgetKey);

  const goToCreateNewBudget = (query: BudgetKey) =>
    push(`${ROUTES.BUDGET.CREATE}?selected=${query}&id=${budgetId}`);

  const renderArrowIcon = (hasGoodDirection: boolean) => {
    const iconStyles = `w-3 h-3 ${
      hasGoodDirection ? "text-green-600" : "text-red-600"
    }`;

    return hasGoodDirection ? (
      <BiSolidUpArrow className={iconStyles} />
    ) : (
      <BiSolidDownArrow className={iconStyles} />
    );
  };

  const getIncomes = (data: Budget) => {
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

  const getExpenses = (data: Budget) => {
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

  return {
    response: {
      data: budget,
      isLoading,
      isSuccess,
    },
    renderDescription,
    goToCreateNewBudget,
    onSelectedFilter,
    selectedFilter,
    renderArrowIcon,
    isDisabledFilter,
    get: {
      incomes: getIncomes(budget),
      expenses: getExpenses(budget),
    },
  };
}

export default useRenderSummaryDetail;
