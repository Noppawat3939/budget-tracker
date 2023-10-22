import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useRenderSkeleton, useRenderSummaryDetail } from "@/hooks";
import { useSearchParams } from "next/navigation";
import {
  ModalDeleteBudget,
  ModalSummaryEdit,
  SummaryCardLoader,
  SummaryDoughnutChart,
  SummaryCard,
  SummaryInfo,
} from "./components";
import { MainLayout, Select } from "@/components";
import { EMPTY_STRING } from "@/constants";

import { priceFormatter, toAverage } from "@/helper";
import { renderChartBackground } from "./utils";

const BUDGET_DETAILS = ["income", "expense"];

const FILTER_OPTIONS = [
  { label: "Income", value: "income" },
  { label: "Expense", value: "expense" },
];

function SummaryDetailContainer() {
  const searchParam = useSearchParams();
  const budgetIdParam = searchParam.get(EMPTY_STRING);

  const {
    response: { data: budgetData, isSuccess, isLoading },
    renderDescription,
    goToCreateNewBudget,
    onSelectedFilter,
    selectedFilter,
    renderArrowIcon,
    isDisabledFilter,
    get,
  } = useRenderSummaryDetail(budgetIdParam || EMPTY_STRING);

  const { incomeData, incomeValues, totalIncomeValue } = get.incomes;
  const { expenseData, expenseValues, totalExpenseValue } = get.expenses;

  const isFilterIncome = selectedFilter === "income";

  const { renderSkeleton } = useRenderSkeleton({
    length: 2,
    isShow: true,
  });

  const renderIncomeLabels = incomeData?.map((income) =>
    income?.label?.toUpperCase()
  );
  const renderExpenseLabels = expenseData?.map((expense) =>
    expense?.label?.toUpperCase()
  );

  const renderChartData = () => {
    const labels = isFilterIncome ? renderIncomeLabels : renderExpenseLabels;
    const data = isFilterIncome ? incomeValues : expenseValues;
    const backgroundColor = renderChartBackground(
      selectedFilter,
      isFilterIncome ? incomeValues : expenseValues
    );

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor,
        },
      ],
    };
  };

  const renderAverage = priceFormatter(
    toAverage(isFilterIncome ? incomeValues : expenseValues)
  );

  const summaryTotalMap = {
    income: priceFormatter(totalIncomeValue),
    expense: priceFormatter(totalExpenseValue),
    balance: priceFormatter(totalIncomeValue - totalExpenseValue),
  };

  const hasPositiveDirection = totalIncomeValue >= totalExpenseValue;
  const chartData = renderChartData();

  return (
    <MainLayout>
      <section className="flex flex-col gap-y-4 h-[85vh]">
        <Card>
          <div className="p-5 flex justify-between">
            <h1 className="text-2xl font-medium">
              {`Top ${isFilterIncome ? "Income" : "Expense"}`}
            </h1>
            <Select
              defaultValue={selectedFilter}
              onValueChange={onSelectedFilter}
              options={FILTER_OPTIONS}
              disabled={isDisabledFilter}
            />
          </div>
          <CardContent className="flex items-stretch ">
            <SummaryDoughnutChart chartData={chartData} />
            <SummaryInfo
              isSuccess={isSuccess}
              icon={renderArrowIcon(hasPositiveDirection)}
              hasPositiveDirection={hasPositiveDirection}
              isLoading={isLoading}
              average={renderAverage}
              total={summaryTotalMap}
              isFilterIncome={isFilterIncome}
              selectedFilter={selectedFilter}
              percentageIncomes={incomeData}
              percentageExpenses={expenseData}
              totalExpenses={totalExpenseValue}
              totalIncomes={totalIncomeValue}
            />
          </CardContent>
        </Card>
        <div className="flex space-x-5">
          {isLoading &&
            BUDGET_DETAILS.map((render) => (
              <SummaryCardLoader key={render} renderSkeleton={renderSkeleton} />
            ))}

          {isSuccess && (
            <SummaryCard
              budgetQuery="income"
              onNavigateToCreateNewBudget={goToCreateNewBudget}
              renderDescription={renderDescription}
              data={budgetData}
            />
          )}

          {isSuccess && (
            <SummaryCard
              budgetQuery="expense"
              onNavigateToCreateNewBudget={goToCreateNewBudget}
              renderDescription={renderDescription}
              data={budgetData}
            />
          )}
        </div>
      </section>

      <ModalSummaryEdit />
      <ModalDeleteBudget />
    </MainLayout>
  );
}

export default SummaryDetailContainer;
