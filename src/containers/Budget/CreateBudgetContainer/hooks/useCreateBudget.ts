/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { debounce, identity, isEmpty } from "lodash";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { TCreateBudget } from "@/types";
import {
  cleanUpCreateBudgetValue,
  setCreateBudgetToLocalStorage,
} from "../helper";
import { BudgetStorage, TCreateBudgetValues } from "./type";
import { useMutation } from "@tanstack/react-query";
import { createIncomeOrExpense, createNewBudget } from "@/services";
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

  const isDisabledCreateBudget = isEmpty(
    createBudgetValues.income.title &&
      createBudgetValues.income.value &&
      createBudgetValues.expense.title &&
      createBudgetValues.expense.value
  );

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

  const handleResetCreateBudgetValues = () =>
    setCreateBudgetValues(initialCreateBudgetValues);

  const createIncomeOrExpenseMutate = useMutation({
    mutationFn: createIncomeOrExpense,
    onSuccess: handleResetCreateBudgetValues,
    onError: (err) => {
      console.log("err", err);
    },
  });

  const createNewBudgetMutate = useMutation({
    mutationFn: createNewBudget,
    onSuccess: handleResetCreateBudgetValues,
  });

  const handleAddValues = (key: TCreateBudget, budgetId: string) => {
    if (data?.idToken) {
      const reqBody =
        key === "income"
          ? {
              [key]: {
                [key]: createBudgetValues[key]?.title,
                value: Number(createBudgetValues[key]?.value),
                description: createBudgetValues[key]?.description,
              },
              budgetId,
            }
          : {
              [key]: {
                [key]: createBudgetValues[key]?.title,
                value: Number(createBudgetValues[key]?.value),
                description: createBudgetValues[key]?.description,
              },
              budgetId,
            };

      createIncomeOrExpenseMutate.mutate({
        body: reqBody,
        query: key,
        idToken: data?.idToken!,
      });
    }

    //TODO: create budget without login
  };

  const handleCreateNewBudget = () => {
    const createBudgetParams = {
      income: {
        income: createBudgetValues.income.title,
        description: createBudgetValues.income.description,
        value: Number(createBudgetValues.income.value),
      },
      expense: {
        expense: createBudgetValues.expense.title,
        description: createBudgetValues.expense.description,
        value: Number(createBudgetValues.expense.value),
      },
    };

    createNewBudgetMutate.mutate({
      body: createBudgetParams,
      idToken: data?.idToken || "",
    });
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

  const hasFetchSuccess = [
    createIncomeOrExpenseMutate.isSuccess,
    createNewBudgetMutate.isSuccess,
  ].some(identity);

  const hasFetchFail = [
    createIncomeOrExpenseMutate.isError,
    createNewBudgetMutate.isError,
  ].some(identity);

  const hasFetching = [
    createIncomeOrExpenseMutate.isLoading,
    createNewBudgetMutate.isLoading,
  ].some(identity);

  return {
    createBudgetValues,
    onCreateBudgetChange,
    handleAddValues,
    budgetStorage,
    handleRemoveBudgetValue,
    sumIncome,
    handleCreateNewBudget,
    isError: hasFetchFail,
    isDisabledCreateBudget,
    isSuccess: hasFetchSuccess,
    isPending: hasFetching,
  };
}
