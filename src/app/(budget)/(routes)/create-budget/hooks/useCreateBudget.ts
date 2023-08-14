/* eslint-disable react-hooks/exhaustive-deps */
import { debounce, isEmpty } from "lodash";
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
  removeCreateBudgetFromStorage,
  setCreateBudgetToLocalStorage,
} from "../helper";
import { BudgetStorage, TBudgetValues, TCreateBudgetValues } from "./type";

const initialCreateBudgetValues = {
  income: { value: "", description: "", title: "" },
  expense: { value: "", description: "", title: "" },
};

const initialBudgetStorage = { income: [], expense: [] };

export default function useCreateBudget() {
  const [budgetStorage, setBudgetStorage] =
    useState<BudgetStorage>(initialBudgetStorage);
  const [isPending, startTransition] = useTransition();

  const [createBudgetValues, setCreateBudgetValues] =
    useState<TCreateBudgetValues>(initialCreateBudgetValues);

  useEffect(() => {
    if (budgetStorage.income.length) {
      debounce(() => {
        setCreateBudgetToLocalStorage(JSON.stringify(budgetStorage));
      }, 1000)();
    } else if (isEmpty(budgetStorage.income)) {
      debounce(() => {
        removeCreateBudgetFromStorage();
      }, 1000)();
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
      }, 1000)();
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
