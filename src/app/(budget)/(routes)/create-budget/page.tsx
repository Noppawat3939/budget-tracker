"use client";

import { MainLayout } from "@/components";
import React from "react";
import { CreateNewBudgetForm, DoughnutCard, SummaryCard } from "./components";
import { useMounted } from "@/hooks";
import { DEFAULT_CHART_DATA, DEFAULT_SUMMARY_LIST } from "./constants";

import { useCreateBudget } from "./hooks";

export default function CreateBudget() {
  const isMounted = useMounted();
  const { onCreateBudgetChange, createBudgetValues } = useCreateBudget();

  return (
    <MainLayout>
      CreateBudget page
      <section className="flex space-x-5 items-center justify-between h-fit mb-5">
        <DoughnutCard data={DEFAULT_CHART_DATA} />
        <SummaryCard
          end={30000}
          isMounted={isMounted}
          data={DEFAULT_SUMMARY_LIST}
        />
      </section>
      <CreateNewBudgetForm
        onValueChange={onCreateBudgetChange}
        values={createBudgetValues}
      />
    </MainLayout>
  );
}
