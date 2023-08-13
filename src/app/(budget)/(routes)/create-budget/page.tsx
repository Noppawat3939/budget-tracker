"use client";

import { MainLayout } from "@/components";
import React from "react";
import { CreateNewBudgetForm, DoughnutCard, SummaryCard } from "./components";
import { useMounted } from "@/hooks";
import { DEFAULT_CHART_DATA, DEFAULT_SUMMARY_LIST } from "./constants";

import { useCreateBudget } from "./hooks";
import { getCreateBudgetFromStorage } from "./helper";
import { BudgetStorage } from "./hooks/type";

export default function CreateBudget() {
  const isMounted = useMounted();
  const {
    onCreateBudgetChange,
    isPending,
    createBudgetValues,
    handleAddValues,
  } = useCreateBudget();

  const budget = getCreateBudgetFromStorage();
  const parseBudget = JSON.parse(budget || "{}") as BudgetStorage;

  const sumIncome = parseBudget.income.reduce((sum, entry) => {
    return sum + +entry.value;
  }, 0);

  return (
    <MainLayout>
      CreateBudget page
      <section className="flex space-x-5 items-center justify-between h-fit mb-5">
        <DoughnutCard data={DEFAULT_CHART_DATA} />
        <SummaryCard
          end={sumIncome || 30000}
          isMounted={isMounted}
          data={DEFAULT_SUMMARY_LIST}
        />
      </section>
      <CreateNewBudgetForm
        onValueChange={onCreateBudgetChange}
        values={createBudgetValues}
        handleAddValues={handleAddValues}
        isDisabled={isPending}
      />
    </MainLayout>
  );
}
