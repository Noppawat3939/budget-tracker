import React from "react";
import { useCreateBudget } from "./hooks";
import { CreateNewBudgetForm, DoughnutCard, SummaryCard } from "./components";
import { DEFAULT_CHART_DATA, DEFAULT_SUMMARY_LIST } from "./constants";
import { useMounted } from "@/hooks";
import { MainLayout } from "@/components";

const defaultIncomeValue = 30000;

function CreateBudgetContainer() {
  const isMounted = useMounted();

  const {
    onCreateBudgetChange,
    isPending,
    createBudgetValues,
    handleAddValues,
    handleRemoveBudgetValue,
    budgetStorage,
    sumIncome,
    handleCreateNewBudget,
  } = useCreateBudget();

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
        handleCreateNewBudget={handleCreateNewBudget}
      />
    </MainLayout>
  );
}

export default CreateBudgetContainer;
