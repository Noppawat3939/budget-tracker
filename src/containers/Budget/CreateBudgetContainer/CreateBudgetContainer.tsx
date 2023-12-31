import React, { Fragment } from "react";
import {
  BudgetNotFound,
  CreateNewBudgetForm,
  DoughnutCard,
  SummaryCard,
} from "./components";
import { DEFAULT_CHART_DATA, DEFAULT_SUMMARY_LIST } from "./constants";
import {
  useMounted,
  useNotification,
  useRenderCreateNewBudget,
  useCreateBudget,
} from "@/hooks";
import { MainLayout } from "@/components";
import { Card } from "@/components/ui/card";
import { isEmpty } from "lodash";
import { useSearchParams } from "next/navigation";

const defaultIncomeValue = 30000;

function CreateBudgetContainer() {
  const isMounted = useMounted();

  const search = useSearchParams();

  const selectedParam = search.get("selected");

  const { summaryList, sumIncome, isFetched, renderChartData } =
    useRenderCreateNewBudget();

  const {
    onCreateBudgetChange,
    createBudgetValues,
    handleAddValues,
    handleRemoveBudgetValue,
    budgetStorage,
    handleCreateNewBudget,
    isError,
    isDisabledCreateBudget,
    isSuccess,
    isPending,
  } = useCreateBudget();

  useNotification({
    isError,
    errorMessage: `Can't create budget, Please try again`,
    isSuccess,
    successMessage: "Create new budget successfully",
  });

  const hasNotQuery = Boolean(selectedParam && isEmpty(summaryList));

  return (
    <MainLayout>
      <Card className="h-full px-5">
        <section className="flex space-x-5 py-5 items-center justify-between h-fit mb-5">
          {hasNotQuery ? (
            <BudgetNotFound />
          ) : (
            <Fragment>
              <DoughnutCard data={renderChartData || DEFAULT_CHART_DATA} />
              <SummaryCard
                end={sumIncome || defaultIncomeValue}
                isMounted={isFetched || isMounted}
                data={summaryList || DEFAULT_SUMMARY_LIST}
              />
            </Fragment>
          )}
        </section>
        <CreateNewBudgetForm
          isPending={isPending}
          onValueChange={onCreateBudgetChange}
          values={createBudgetValues}
          handleAddValues={handleAddValues}
          isDisabled={isDisabledCreateBudget}
          budgetStorage={budgetStorage}
          handleRemoveBudgetValue={handleRemoveBudgetValue}
          handleCreateNewBudget={handleCreateNewBudget}
          isNoExpenseData={hasNotQuery}
        />
      </Card>
    </MainLayout>
  );
}

export default CreateBudgetContainer;
