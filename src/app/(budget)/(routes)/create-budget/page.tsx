"use client";

import { MainLayout } from "@/components";
import React, { ChangeEventHandler, useCallback, useState } from "react";
import { CreateNewBudgetForm, DoughnutCard, SummaryCard } from "./components";
import { useMounted } from "@/hooks";
import { onlyNumber } from "@/helper";
import {
  DEFAULT_CHART_DATA,
  DEFAULT_INCOME_VALUES,
  DEFAULT_SUMMARY_LIST,
} from "./constants";

import { v4 as uuidv4 } from "uuid";
import { setNewBudgetWithoutLogin } from "./helper";

export default function CreateBudget() {
  const isMounted = useMounted();
  const [isStarted, setIsStarted] = useState(false);

  const [incomeValues, setIncomeValues] = useState<{
    value: string;
    description: string;
  }>(DEFAULT_INCOME_VALUES);

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
    const newIncome = {
      [uuidv4()]: {
        ...incomeValues,
        type: "I",
        created: new Date(Date.now()).toISOString(),
      },
    };

    setNewBudgetWithoutLogin(JSON.stringify(newIncome));
    setIncomeValues(DEFAULT_INCOME_VALUES);
  };

  return (
    <MainLayout>
      CreateBudget page
      <section className="flex space-x-5 items-center justify-between h-fit mb-5">
        <DoughnutCard data={DEFAULT_CHART_DATA} />
        <SummaryCard
          end={isStarted && incomeValues.value ? +incomeValues.value : 30000}
          isMounted={isMounted}
          data={DEFAULT_SUMMARY_LIST}
        />
      </section>
      <CreateNewBudgetForm
        income={incomeValues}
        onIncomeChange={onIncomeChange}
        onSubmit={() => setIsStarted(true)}
        onAddIncome={handleAddIncome}
      />
    </MainLayout>
  );
}
