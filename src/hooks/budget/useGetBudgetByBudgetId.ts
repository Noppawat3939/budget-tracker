"use client";

import { getBudgetByBudgetId } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "..";
import { useEffect } from "react";

type UseGetBudgetByBudgetIdParams = {
  budgetId: string;
};

function useGetBudgetByBudgetId(params: UseGetBudgetByBudgetIdParams) {
  const { data } = useUser();

  const handleGetBudgetById = useMutation({
    mutationFn: getBudgetByBudgetId,
  });

  useEffect(() => {
    if (data?.idToken) {
      handleGetBudgetById.mutate({
        idToken: data.idToken,
        budgetId: params.budgetId,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.idToken, params.budgetId]);

  return {
    data: handleGetBudgetById.data?.data.data,
    isLoading: handleGetBudgetById.isLoading,
    isError: handleGetBudgetById.isError,
    isSuccess: handleGetBudgetById.isSuccess,
  };
}

export default useGetBudgetByBudgetId;
