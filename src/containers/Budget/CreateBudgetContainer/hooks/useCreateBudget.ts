/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from "lodash";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { TCreateBudget } from "@/types";
import {
  cleanUpCreateBudgetValue,
  setCreateBudgetToLocalStorage,
} from "../helper";
import { BudgetStorage, TCreateBudgetValues } from "./type";
import { useMutation } from "@tanstack/react-query";
import { createIncomeOrExpense } from "@/services";
import { useUser } from "@/hooks";

const initialCreateBudgetValues = {
  income: { value: "", description: "", title: "" },
  expense: { value: "", description: "", title: "" },
};

const initialBudgetStorage = { income: [], expense: [] };

const debounceTime = 1000;

export default function useCreateBudget() {
  const [budgetStorage, setBudgetStorage] =
    useState<BudgetStorage>(initialBudgetStorage);

  const { data } = useUser();

  const [createBudgetValues, setCreateBudgetValues] =
    useState<TCreateBudgetValues>(initialCreateBudgetValues);

   useEffect(() => {
    if (budgetStorage.income.length >= 1) {
      debounce(() => {
        setCreateBudgetToLocalStorage(JSON.stringify(budgetStorage));
      }, debounceTime)();
    }
  }, [budgetStorage.income]);

  const onCreateBudgetChange = useCallback(
    (
      evt: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
      key: TCreateBudget
    ) => {
      const { value, id } = evt.target;

      setCreateBudgetValues((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [id]: cleanUpCreateBudgetValue(id as "value" | "description", value),
        },
      }));
    },
    []
  );

  const createBudgetMutate = useMutation({
    mutationFn: createIncomeOrExpense,
    onSuccess: ({ data }) => {
      console.log("data", data);
    },
    onError: (err) => {
      console.log("err", err);
    },
  });

  const handleAddValues = (key: TCreateBudget) => {
    if (data?.idToken) {
      createBudgetMutate.mutate({
        body: {
          income: {
            income: createBudgetValues[key]?.title,
            description: createBudgetValues[key]?.description,
            value: Number(createBudgetValues[key]?.value),
          },
        },
        query: key,
        idToken: data?.idToken!,
      });
    }

    //TODO: create budget without login
  };

  const handleCreateNewBudget = () => {
    console.log("create new budget", createBudgetValues);
  };

  const handleRemoveBudgetValue = (key: TCreateBudget, removeId: string) => {
    const removeBudgetStorage = budgetStorage[key].filter(
      (budget) => budget.id !== removeId
    );

    setBudgetStorage((prev) => ({ ...prev, [key]: removeBudgetStorage }));
  };

  const sumIncome = useMemo(() => {
    return budgetStorage?.income?.reduce((sum, entry) => {
      return sum + +entry.value;
    }, 0);
  }, [budgetStorage.income]);

  return {
    createBudgetValues,
    onCreateBudgetChange,
    handleAddValues,
    isPending: createBudgetMutate.isLoading,
    budgetStorage,
    handleRemoveBudgetValue,
    sumIncome,
    handleCreateNewBudget,
  };
}
