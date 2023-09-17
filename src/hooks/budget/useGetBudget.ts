/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import { useUser } from "..";
import { useMutation } from "@tanstack/react-query";
import { getAllBudget, getBudgetBalance } from "@/services";

function useGetBudget() {
  const { data } = useUser();

  const handleGetBudget = useMutation({
    mutationFn: getAllBudget,
  });
  const handleGetBudgetBalance = useMutation({
    mutationFn: getBudgetBalance,
  });

  useEffect(() => {
    if (data?.idToken) {
      handleGetBudget.mutate({ idToken: data.idToken });
      handleGetBudgetBalance.mutate({ idToken: data.idToken });
    }
  }, [data?.idToken]);

  const hasError = handleGetBudget.isError || handleGetBudgetBalance.isError;
  const hasLoading =
    handleGetBudget.isLoading || handleGetBudgetBalance.isLoading;
  const hasSuccess =
    handleGetBudget.isSuccess || handleGetBudgetBalance.isSuccess;

  return {
    budgetData: handleGetBudget.data?.data,
    balanceData: handleGetBudgetBalance.data?.data,
    isError: hasError,
    isSuccess: hasSuccess,
    isLoading: hasLoading,
  };
}

export default useGetBudget;
