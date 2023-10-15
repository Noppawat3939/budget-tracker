import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRenderSkeleton, useRenderSummaryDetail } from "@/hooks";
import { useSearchParams } from "next/navigation";
import React from "react";
import {
  ModalSummaryEdit,
  SummaryByPercentage,
  SummaryCardDetail,
  SummaryCardLoader,
  SummaryDoughnutChart,
  SummaryTotal,
} from "./components";
import { MainLayout, Select } from "@/components";
import { EMPTY_STRING } from "@/constants";
import { Button } from "@/components/ui/button";
import { FiPlusCircle } from "react-icons/fi";

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
            <Card className="flex-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle aria-label="income-title">
                    Recent Incomes
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[12px] px-1"
                    onClick={() => goToCreateNewBudget("income")}
                  >
                    <FiPlusCircle className="mr-1" />
                    Add income
                  </Button>
                </div>
                {renderDescription("income")}
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-y-2 pr-3 overflow-y-auto max-h-[180px]">
                  {response.data?.map(
                    (budget) =>
                      budget.incomes &&
                      budget.incomes.map((income) => (
                        <SummaryCardDetail
                          key={income.incomeId}
                          income={income}
                        />
                      ))
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {response.isSuccess && (
            <Card className="flex-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Expenses</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[12px] px-1"
                    onClick={() => goToCreateNewBudget("expense")}
                  >
                    <FiPlusCircle className="mr-1" />
                    Add expense
                  </Button>
                </div>
                {renderDescription("expense")}
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-y-2 pr-3 overflow-y-auto max-h-[180px]">
                  {response.data?.map(
                    (budget) =>
                      budget.expenses &&
                      budget.expenses.map((expense) => (
                        <SummaryCardDetail
                          key={expense.expenseId}
                          expense={expense}
                        />
                      ))
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <ModalSummaryEdit />
    </MainLayout>
  );
}

export default SummaryDetailContainer;
