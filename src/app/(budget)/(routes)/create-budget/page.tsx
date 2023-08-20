"use client";
import { MainLayout } from "@/components";
import React, { useMemo } from "react";
import { CreateNewBudgetForm, DoughnutCard, SummaryCard } from "./components";
import { useMounted } from "@/hooks";
import { DEFAULT_CHART_DATA, DEFAULT_SUMMARY_LIST } from "./constants";

import { useCreateBudget } from "./hooks";

const defaultIncomeValue = 30000;

export default function CreateBudget() {
  const isMounted = useMounted();

  const {
    onCreateBudgetChange,
    isPending,
    createBudgetValues,
    handleAddValues,
    handleRemoveBudgetValue,
    budgetStorage,
  } = useCreateBudget();

  const sumIncome = useMemo(() => {
    return budgetStorage?.income?.reduce((sum, entry) => {
      return sum + +entry.value;
    }, 0);
  }, [budgetStorage.income]);

  return (
    <MainLayout>
      <section className="flex space-x-5 py-5 items-center justify-between h-fit mb-5">
        <DoughnutCard data={DEFAULT_CHART_DATA} />
        <SummaryCard
          end={sumIncome || defaultIncomeValue}
          isMounted={isMounted}
          data={DEFAULT_SUMMARY_LIST}
        />
      </section>
      <CreateNewBudgetForm
        onValueChange={onCreateBudgetChange}
        values={createBudgetValues}
        handleAddValues={handleAddValues}
        isDisabled={isPending}
        budgetStorage={budgetStorage}
        handleRemoveBudgetValue={handleRemoveBudgetValue}
      />
    </MainLayout>
  );
}
