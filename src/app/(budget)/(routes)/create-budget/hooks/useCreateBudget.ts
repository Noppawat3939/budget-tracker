/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from "lodash";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { TCreateBudget } from "@/types";

import { v4 as uuidv4 } from "uuid";
import {
  cleanUpCreateBudgetValue,
  setCreateBudgetToLocalStorage,
} from "../helper";
import { BudgetStorage, TBudgetValues, TCreateBudgetValues } from "./type";

const initialCreateBudgetValues = {
  income: { value: "", description: "", title: "" },
  expense: { value: "", description: "", title: "" },
};

const initialBudgetStorage = { income: [], expense: [] };

const debounceTime = 1000;

export default function useCreateBudget() {
  const [budgetStorage, setBudgetStorage] =
    useState<BudgetStorage>(initialBudgetStorage);
  const [isPending, startTransition] = useTransition();

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

  const handleAddValues = (key: TCreateBudget) => {
    const update: TBudgetValues = {
      id: uuidv4(),
      title: createBudgetValues[key]?.title,
      description: createBudgetValues[key]?.description,
      value: createBudgetValues[key]?.value,
      createdAt: new Date(Date.now()).toISOString(),
    };

    startTransition(() => {
      setBudgetStorage((prevState) => ({
        ...prevState,
        [key]: [...prevState[key], update],
      }));

      debounce(() => {
        setCreateBudgetValues(initialCreateBudgetValues);
      }, debounceTime)();
    });
  };

  const handleRemoveBudgetValue = (key: TCreateBudget, removeId: string) => {
    const removeBudgetStorage = budgetStorage[key].filter(
      (budget) => budget.id !== removeId
    );

    setBudgetStorage((prev) => ({ ...prev, [key]: removeBudgetStorage }));
  };

  return {
    createBudgetValues,
    onCreateBudgetChange,
    handleAddValues,
    isPending,
    budgetStorage,
    handleRemoveBudgetValue,
  };
}
