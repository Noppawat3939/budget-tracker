"use client";

import { DEFAULT_VALUE_NUMBER, EMPTY_STRING, QUERY_KEY } from "@/constants";
import { cleanUpFirstCharacter } from "@/helper";
import { useUser } from "@/hooks";
import { editBudget } from "@/services";
import { useEditBudgetDetailStore } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { identity } from "lodash";
import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";

const TIMEOUT_MS = 1000;

const initialFormValues = {
  title: EMPTY_STRING,
  value: DEFAULT_VALUE_NUMBER,
  description: EMPTY_STRING,
};

function useUpdateBudget() {
  const { data: user } = useUser();

  const queryClient = useQueryClient();

  const { onCloseModal, activeModal, isOpen, selectedData } =
    useEditBudgetDetailStore((store) => ({
      onCloseModal: store.onCloseModal,
      activeModal: store.active,
      isOpen: store.isOpenModal,
      selectedData: store.previousBudgetData,
    }));

  const [isPendingFn, startTransition] = useTransition();
  const [editFormValues, setEditFormValues] = useState(initialFormValues);

  useEffect(() => {
    if (activeModal && isOpen) {
      setEditFormValues({
        //@ts-ignore
        title: selectedData[activeModal][activeModal] || EMPTY_STRING,
        value: selectedData[activeModal]?.value || DEFAULT_VALUE_NUMBER,
        description: selectedData[activeModal]?.description || EMPTY_STRING,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeModal]);

  const onEditBudgetChange = useCallback(
    (
      evt: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
      formId: "value" | "title" | "description"
    ) => {
      const { value, id } = evt.target;

      const cleanedValue =
        formId === "value" ? cleanUpFirstCharacter(value) : value;

      setEditFormValues((prev) => ({
        ...prev,
        [id]: cleanedValue,
      }));
    },
    []
  );

  const handleUpdateSuccess = () => {
    queryClient.invalidateQueries([QUERY_KEY.GET_BUDGET_BY_ID]);

    startTransition(() => {
      setEditFormValues(initialFormValues);
      setTimeout(onCloseModal, TIMEOUT_MS);
    });
  };

  const handleUpdate = useMutation({
    mutationFn: editBudget,
    onSuccess: handleUpdateSuccess,
  });

  const handleSubmitEdit = () => {
    if (activeModal && user?.idToken) {
      const idToken = user.idToken;
      const payload =
        activeModal === "income"
          ? {
              incomeId: selectedData.income?.incomeId,
              income: editFormValues.title,
              value: +editFormValues.value,
              description: editFormValues.description,
            }
          : {
              expenseId: selectedData.expense?.expenseId,
              expense: editFormValues.title,
              value: +editFormValues.value,
              description: editFormValues.description,
            };

      handleUpdate.mutate({
        idToken,
        body: {
          [activeModal]: payload,
        },
      });
    }
  };

  const hasLoading = [handleUpdate.isLoading, isPendingFn].some(identity);

  return {
    mutation: handleUpdate,
    isLoading: hasLoading,
    formState: {
      values: editFormValues,
      onChange: onEditBudgetChange,
      onSubmit: handleSubmitEdit,
    },
  };
}

export default useUpdateBudget;
