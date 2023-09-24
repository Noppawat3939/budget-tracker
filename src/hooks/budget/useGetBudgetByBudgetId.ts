/* eslint-disable react-hooks/exhaustive-deps */
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
  }, [data?.idToken, params.budgetId]);

  return {
    data: handleGetBudgetById.data?.data.data,
    isLoading: handleGetBudgetById.isLoading,
    isError: handleGetBudgetById.isError,
  };
}

export default useGetBudgetByBudgetId;
