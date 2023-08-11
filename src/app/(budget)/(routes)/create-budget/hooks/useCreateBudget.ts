import { debounce } from "lodash";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  cleanUpCreateBudgetValue,
  getCreateBudgetFromStorage,
  setNewBudgetWithoutLogin,
} from "../helper";
import { TCreateBudget, TIncomeValues } from "@/types";
import { DEFAULT_INCOME_VALUES } from "../constants";

import { v4 as uuidv4 } from "uuid";

export default function useCreateBudget() {
  const [incomes, setIncomes] = useState<TIncomeValues[] | []>([]);
  const [incomeValues, setIncomeValues] = useState<{
    value: string;
    description: string;
  }>(DEFAULT_INCOME_VALUES);

  const [createBudgetValues, setCreateBudgetValues] = useState({
    income: { value: "", description: "" },
    expense: { value: "", description: "" },
  });

  useEffect(() => {
    const prevValue = getCreateBudgetFromStorage();

    if (prevValue) {
      setIncomes(JSON.parse(prevValue));
    }
  }, []);

  useEffect(() => {
    if (incomes.length) {
      debounce(() => {
        setNewBudgetWithoutLogin(JSON.stringify(incomes));
      }, 1000)();
    }
  }, [incomes]);

  const onCreateBudgetChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>, key: TCreateBudget) => {
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

  const handleAddIncome = () => {
    const newIncome: TIncomeValues = {
      ...incomeValues,
      id: `${uuidv4()}`,
      type: "income",
      createdBudget: new Date(Date.now()).toISOString(),
    };

    setIncomes((prev) => {
      if (prev.length) {
        return [...prev, ...[newIncome]];
      }

      return [newIncome];
    });

    setIncomeValues(DEFAULT_INCOME_VALUES);
  };

  return {
    createBudgetValues,
    onCreateBudgetChange,
  };
}
