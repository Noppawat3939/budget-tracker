/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllBudget, getBudgetBalance } from "@/services";
import { useUser } from "@/hooks";
import { identity, isEmpty, isUndefined } from "lodash";
import { EMPTY_STRING, QUERY_KEY } from "@/constants";

function useGetBudgetList() {
  const { data } = useUser();

  const budgetListQuery = useQuery({
    queryKey: [QUERY_KEY.GET_BUDGET_LIST],
    queryFn: () => getAllBudget({ idToken: data?.idToken || EMPTY_STRING }),
    select: (res) => res.data.data,
    enabled: !isUndefined(data?.idToken),
  });

  const budgetBalanceQuery = useQuery({
    queryKey: [QUERY_KEY.GET_BUDGET_BALANCE],
    queryFn: () => getBudgetBalance({ idToken: data?.idToken || EMPTY_STRING }),
    select: (res) => res.data.data,
    enabled: !isUndefined(data?.idToken) && !isEmpty(budgetListQuery.data),
  });

  const hasError = [budgetListQuery.isError, budgetBalanceQuery.isError].some(
    identity
  );

  const hasLoading = [
    budgetListQuery.isLoading || budgetBalanceQuery.isLoading,
  ].some(identity);

  const hasSuccess = [
    budgetListQuery.isSuccess || budgetBalanceQuery.isSuccess,
  ].some(identity);

  return {
    budgetData: budgetListQuery.data,
    balanceData: budgetBalanceQuery.data,
    isError: hasError,
    isSuccess: hasSuccess,
    isLoading: hasLoading,
    queries: {
      budgetListQuery,
      budgetBalanceQuery,
    },
  };
}

export default useGetBudgetList;
