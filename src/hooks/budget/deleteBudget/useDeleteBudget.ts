"use client";

import { QUERY_KEY } from "@/constants";
import { useUser } from "@/hooks";
import { deleteBudget } from "@/services";
import { useDeleteBudgetStore } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteBudget() {
  const { data: user } = useUser();
  const queryClient = useQueryClient();

  const idToken = user?.idToken;

  const { active, selected, onClose } = useDeleteBudgetStore((store) => ({
    active: store.active,
    selected: store.selectedData,
    onClose: store.onCloseModal,
  }));

  const handleDeleteSuccess = () => {
    onClose();
    queryClient.invalidateQueries([QUERY_KEY.GET_BUDGET_BY_ID]);
  };

  const handleDeleteBudget = useMutation({
    mutationFn: deleteBudget,
    onSuccess: handleDeleteSuccess,
  });

  const onDelete = () => {
    if (active === "income" && selected.income && idToken) {
      const {
        income: { incomeId },
      } = selected;

      handleDeleteBudget.mutate({
        idToken,
        param: { incomeId },
      });

      return;
    }

    if (active === "expense" && selected.expense && idToken) {
      const {
        expense: { expenseId },
      } = selected;
      handleDeleteBudget.mutate({
        idToken,
        param: { expenseId },
      });

      return;
    }
  };

  return { onDelete, ...handleDeleteBudget };
}

export default useDeleteBudget;
