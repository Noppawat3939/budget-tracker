import { debounce } from "lodash";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import {
  getCreateBudgetFromStorage,
  setNewBudgetWithoutLogin,
} from "../helper";
import { TIncomeValues } from "@/types";
import { DEFAULT_INCOME_VALUES } from "../constants";
import { onlyNumber } from "@/helper";

import { v4 as uuidv4 } from "uuid";

export default function useCreateBudget() {
  const [incomes, setIncomes] = useState<TIncomeValues[] | []>([]);
  const [incomeValues, setIncomeValues] = useState<{
    value: string;
    description: string;
  }>(DEFAULT_INCOME_VALUES);

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

  const onIncomeChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { value, id } = e.target;

      const cleanValue =
        onlyNumber(value)?.[0] === "0"
          ? `${onlyNumber(value)?.slice(1)}`
          : onlyNumber(value);

      const updateValue = id === "value" ? cleanValue : value;

      setIncomeValues((prev) => ({
        ...prev,
        [id]: updateValue,
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

  return { incomeValues, onIncomeChange, handleAddIncome };
}
