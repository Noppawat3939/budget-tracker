import { Card, CardContent } from "@/components/ui/card";
import { useRenderSkeleton, useRenderSummaryDetail } from "@/hooks";
import { useSearchParams } from "next/navigation";
import React from "react";
import {
  ModalDeleteBudget,
  ModalSummaryEdit,
  SummaryByPercentage,
  SummaryCardLoader,
  SummaryDoughnutChart,
  SummaryTotal,
  SummaryCard,
} from "./components";
import { MainLayout, Select } from "@/components";
import { EMPTY_STRING } from "@/constants";

import { priceFormatter, toAverage } from "@/helper";
import { getExpenses, getIncomes, renderChartBackground } from "./utils";

const BUDGET_DETAILS = ["income", "expense"];

const FILTER_OPTIONS = [
  { label: "Income", value: "income" },
  { label: "Expense", value: "expense" },
];

function SummaryDetailContainer() {
  const searchParam = useSearchParams();
  const budgetIdParam = searchParam.get(EMPTY_STRING);

  const {
    response,
    renderDescription,
    goToCreateNewBudget,
    onSelectedFilter,
    selectedFilter,
    renderArrowIcon,
    isDisabledFilter,
  } = useRenderSummaryDetail(budgetIdParam || EMPTY_STRING);

  const isFilterIncome = selectedFilter === "income";

  const { renderSkeleton } = useRenderSkeleton({
    length: 2,
    isShow: true,
  });

  const { incomeValues, totalIncomeValue, incomeData } = getIncomes(
    response.data
  );
  const { expenseValues, expenseData, totalExpenseValue } = getExpenses(
    response.data
  );

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

  const hasGoodDirection = totalIncomeValue >= totalExpenseValue;
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
            <div className="flex w-[60%] max-w-[600px]  mx-auto flex-col justify-between">
              <div className="flex flex-col">
                <p
                  className={`text-[14px] text-slate-500 ${
                    response.isSuccess ? "block" : "hidden"
                  }`}
                >
                  {`You have an average ${selectedFilter} of `}
                  <span
                    className={`${
                      isFilterIncome ? "text-green-600" : "text-red-600"
                    } font-medium`}
                  >
                    {renderAverage}
                  </span>{" "}
                  per month.
                </p>
                <ul className="my-2 max-h-[200px] pr-3 py-1 overflow-y-auto">
                  {isFilterIncome ? (
                    <SummaryByPercentage
                      isLoading={response.isLoading}
                      data={incomeData as { label: string; value: number }[]}
                      total={totalIncomeValue}
                    />
                  ) : (
                    <SummaryByPercentage
                      isLoading={response.isLoading}
                      data={expenseData as { label: string; value: number }[]}
                      total={totalExpenseValue}
                    />
                  )}
                </ul>
              </div>
              <SummaryTotal
                isLoading={response.isLoading}
                summary={summaryTotalMap}
                icon={renderArrowIcon(hasGoodDirection)}
                hasGoodDirection={hasGoodDirection}
              />
            </div>
          </CardContent>
        </Card>
        <div className="flex space-x-5">
          {response.isLoading &&
            BUDGET_DETAILS.map((render) => (
              <SummaryCardLoader key={render} renderSkeleton={renderSkeleton} />
            ))}

          {response.isSuccess && (
            <>
              <SummaryCard
                budgetQuery="income"
                onNavigateToCreateNewBudget={goToCreateNewBudget}
                renderDescription={renderDescription}
                data={response.data!}
              />
            </>
          )}

          {response.isSuccess && (
            <>
              <SummaryCard
                budgetQuery="expense"
                onNavigateToCreateNewBudget={goToCreateNewBudget}
                renderDescription={renderDescription}
                data={response.data!}
              />
            </>
          )}
        </div>
      </section>

      <ModalSummaryEdit />
      <ModalDeleteBudget />
    </MainLayout>
  );
}

export default SummaryDetailContainer;
