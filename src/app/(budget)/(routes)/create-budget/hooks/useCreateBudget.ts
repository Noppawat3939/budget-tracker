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
  getCreateBudgetFromStorage,
  setNewBudgetWithoutLogin,
} from "../helper";
import { BudgetStorage } from "./type";

const initialCreateBudgetValues = {
  income: { value: "", description: "" },
  expense: { value: "", description: "" },
};

export default function useCreateBudget() {
  const [budgetStorage, setBudgetStorage] = useState<BudgetStorage>({
    income: [],
    expense: [],
  });

  const [isPending, startTransition] = useTransition();

  const [createBudgetValues, setCreateBudgetValues] = useState(
    initialCreateBudgetValues
  );

  useEffect(() => {
    const prevValue = getCreateBudgetFromStorage();

    if (prevValue) {
      setBudgetStorage(JSON.parse(prevValue));
    }
  }, []);

  useEffect(() => {
    if (budgetStorage.income.length || budgetStorage.expense.length) {
      debounce(() => {
        setNewBudgetWithoutLogin(JSON.stringify(budgetStorage));
      }, 1000)();
    }
  }, [budgetStorage]);

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

  const handleAddValues = (key: TCreateBudget) => {
    const update = {
      id: uuidv4(),
      description: createBudgetValues.income.description,
      value: createBudgetValues.income.value,
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

  return {
    createBudgetValues,
    onCreateBudgetChange,
    handleAddValues,
    isPending,
  };
}
