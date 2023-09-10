/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useUser } from "..";
import { useMutation } from "@tanstack/react-query";
import { getAllBudget } from "@/services";

function useGetBudget() {
  const { data } = useUser();

  const getBudgetMutate = useMutation({
    mutationFn: getAllBudget,
    onSuccess: ({ data }) => {
      console.log("🚀 ===> data:", data);
    },
  });

  useEffect(() => {
    if (data?.idToken) {
      getBudgetMutate.mutate({ idToken: data.idToken });
    }
  }, [data?.idToken]);

  return;
}

export default useGetBudget;
