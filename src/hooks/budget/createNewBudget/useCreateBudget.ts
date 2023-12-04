/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { identity, isEmpty } from "lodash";
import { type ChangeEvent, useCallback, useState } from "react";
import { TCreateBudget } from "@/types";
import { cleanUpCreateBudgetValue } from "@/helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createIncomeOrExpense, createNewBudget } from "@/services";
import { useUser } from "@/hooks";
import { EMPTY_STRING, QUERY_KEY, STORAGE_KEY } from "@/constants";
import { localStorage } from "@/helper";

type TBudgetValues = {
  id: string;
  title: string;
  description?: string;
  value: string;
  createdAt: string;
};

type BudgetStorage = Record<TCreateBudget, TBudgetValues[]>;

type TCreateBudgetValues = Record<
  TCreateBudget,
  { value: string; title: string; description: string }
>;

const initialCreateBudgetValues = {
  income: { value: "", description: "", title: "" },
  expense: { value: "", description: "", title: "" },
};

const initialBudgetStorage = { income: [], expense: [] };

export default function useCreateBudget() {
  const { data } = useUser();

  const queryClient = useQueryClient();

  const [budgetStorage, setBudgetStorage] =
    useState<BudgetStorage>(initialBudgetStorage);

  const [createBudgetValues, setCreateBudgetValues] =
    useState<TCreateBudgetValues>(initialCreateBudgetValues);

  const storage = localStorage();

  const isDisabledCreateBudget = [
    createBudgetValues.income.title,
    createBudgetValues.income.value,
    createBudgetValues.expense.title,
    createBudgetValues.expense.value,
  ].some(isEmpty);

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
          [id]: cleanUpCreateBudgetValue(
            id as Exclude<
              keyof typeof initialCreateBudgetValues.income,
              "title"
            >,
            value
          ),
        },
      }));
    },
    []
  );

  const handleResetCreateBudgetValues = () =>
    setCreateBudgetValues(initialCreateBudgetValues);

  const handleCreatedIncomeOrExpenseSuccess = () => {
    storage.set(STORAGE_KEY.CREATED_NEW_BUDGET_NOTIFICATION, "1");
    handleResetCreateBudgetValues();

    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_BUDGET_BY_ID] });
  };

  const createIncomeOrExpenseMutate = useMutation({
    mutationFn: createIncomeOrExpense,
    onSuccess: handleCreatedIncomeOrExpenseSuccess,
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
                value: +createBudgetValues[key]?.value,
                description: createBudgetValues[key]?.description,
              },
              budgetId,
            }
          : {
              [key]: {
                [key]: createBudgetValues[key]?.title,
                value: +createBudgetValues[key]?.value,
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
  };

  const handleCreateNewBudget = () => {
    const createBudgetParams = {
      income: {
        income: createBudgetValues.income.title,
        description: createBudgetValues.income.description,
        value: +createBudgetValues.income.value,
      },
      expense: {
        expense: createBudgetValues.expense.title,
        description: createBudgetValues.expense.description,
        value: +createBudgetValues.expense.value,
      },
    };

    createNewBudgetMutate.mutate({
      body: createBudgetParams,
      idToken: data?.idToken || EMPTY_STRING,
    });
  };

  const handleRemoveBudgetValue = (key: TCreateBudget, removeId: string) => {
    const removeBudgetStorage = budgetStorage[key].filter(
      (budget) => budget.id !== removeId
    );

    setBudgetStorage((prev) => ({ ...prev, [key]: removeBudgetStorage }));
  };

  const hasFetchedSuccess = [
    createIncomeOrExpenseMutate.isSuccess,
    createNewBudgetMutate.isSuccess,
  ].some(identity);

  const hasFetchedFail = [
    createIncomeOrExpenseMutate.isError,
    createNewBudgetMutate.isError,
  ].some(identity);

  const hasFetching = [
    createIncomeOrExpenseMutate.isPending,
    createNewBudgetMutate.isPending,
  ].some(identity);

  return {
    createBudgetValues,
    onCreateBudgetChange,
    handleAddValues,
    budgetStorage,
    handleRemoveBudgetValue,
    handleCreateNewBudget,
    isError: hasFetchedFail,
    isDisabledCreateBudget,
    isSuccess: hasFetchedSuccess,
    isPending: hasFetching,
  };
}
