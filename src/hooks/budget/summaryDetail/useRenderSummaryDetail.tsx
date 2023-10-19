"use client";

import { FIRST_INDEX, ROUTES } from "@/constants";
import { useGetBudgetByBudgetId } from "@/hooks";
import { useCallback, useEffect, useState } from "react";
import { CardDescription } from "@/components/ui/card";
import { useRouter } from "next/navigation";

import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { isEmpty } from "lodash";

type BudgetKey = "income" | "expense";
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
  };
}

export default useRenderSummaryDetail;