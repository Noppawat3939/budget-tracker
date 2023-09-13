/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useUser } from "..";
import { useMutation } from "@tanstack/react-query";
import { getAllBudget } from "@/services";

function useGetBudget() {
  const { data } = useUser();

  const handleGetBudget = useMutation({
    mutationFn: getAllBudget,
  });

  useEffect(() => {
    if (data?.idToken) {
      handleGetBudget.mutate({ idToken: data.idToken });
    }
  }, [data?.idToken]);

  return {
    data: handleGetBudget.data?.data,
    isError: handleGetBudget.isError,
    isSuccess: handleGetBudget.isSuccess,
    isLoading: handleGetBudget.isLoading,
  };
}

export default useGetBudget;
