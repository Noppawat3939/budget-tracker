import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetBudgetByBudgetId, useRenderSkeleton } from "@/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import {
  SelectedFilter,
  SummaryCardDetail,
  SummaryCardLoader,
  SummaryDoughnutChart,
} from "./components";
import { MainLayout } from "@/components";
import { EMPTY_STRING, FIRST_INDEX, ROUTES, SECOND_INDEX } from "@/constants";
import { Button } from "@/components/ui/button";
import { FiPlusCircle } from "react-icons/fi";
import { BiSolidUpArrow } from "react-icons/bi";

import {
  numberFormatter,
  priceFormatter,
  toAverage,
  toCapitalize,
  toPercent,
} from "@/helper";
import { DoughnutChart } from "@/types";
import { getExpenses, getIncomes, renderChartBackground } from "./utils";

const MIN_LENGTH = 1;
const BUDGET_DETAILS = ["income", "expense"];

const FILTER_OPTIONS = [
  { label: "Income", value: "income" },
  { label: "Expense", value: "expense" },
];

type BudgetKey = "income" | "expense";

function SummaryDetailContainer() {
  const searchParam = useSearchParams();
  const budgetIdParam = searchParam.get("");
  const { push } = useRouter();

  const [selectedFilter, setSelectedFilter] = useState<BudgetKey>("expense");

  const isFilterIncome = selectedFilter === "income";

  const { renderSkeleton } = useRenderSkeleton({
    length: 2,
    isShow: true,
  });

  const { data, isLoading, isSuccess } = useGetBudgetByBudgetId({
    budgetId: budgetIdParam || EMPTY_STRING,
  });

  const renderDescription = useCallback((key: BudgetKey) => {
    return (
      data?.at(FIRST_INDEX)?.total && (
        <CardDescription>{`${
          data.at(FIRST_INDEX)!.total?.[key] > MIN_LENGTH
            ? `${data?.[FIRST_INDEX].total[key]} items`
            : `${data?.[FIRST_INDEX].total[key]} item`
        } of all your ${key}`}</CardDescription>
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToCreateNewBudget = (query: BudgetKey) =>
    push(`${ROUTES.BUDGET.CREATE}?selected=${query}&id=${budgetIdParam}`);

  const { incomeValues, totalIncomeValue, incomeData } = getIncomes(data);
  const { expenseValues, expenseData, totalExpenseValue } = getExpenses(data);

  const renderIncomeLabels = incomeData?.map((income) =>
    income?.label?.toUpperCase()
  );
  const renderExpenseLabels = expenseData?.map((expense) =>
    expense?.label?.toUpperCase()
  );

  const chartBackground = renderChartBackground(
    selectedFilter,
    isFilterIncome ? incomeValues : expenseValues
  );

  // filter all
  const chartData: DoughnutChart = {
    labels: isFilterIncome ? renderIncomeLabels : renderExpenseLabels,
    datasets: [
      {
        data: isFilterIncome ? incomeValues : expenseValues,
        backgroundColor: chartBackground,
      },
    ],
  };

  const onSelectedFilter = (selectedValue: string) =>
    setSelectedFilter(selectedValue as BudgetKey);

  const renderAverage = priceFormatter(
    toAverage(isFilterIncome ? incomeValues : expenseValues)
  );

  const summaryTotalMap = {
    income: numberFormatter(totalIncomeValue),
    expense: numberFormatter(totalExpenseValue),
    balance: numberFormatter(totalIncomeValue - totalExpenseValue),
  };

  return (
    <MainLayout>
      <section className="flex flex-col gap-y-4 h-[85vh]">
        <Card>
          <div className="p-5 flex justify-between">
            <h1 className="text-2xl font-medium">{`Top ${
              isFilterIncome ? "Income" : "Expense"
            }`}</h1>
            <SelectedFilter
              defaultValue={selectedFilter}
              onValueChange={onSelectedFilter}
              options={FILTER_OPTIONS}
            />
          </div>
          <CardContent className="flex items-stretch ">
            <SummaryDoughnutChart chartData={chartData} />
            <div className="flex w-[60%] max-w-[600px]  mx-auto flex-col justify-between">
              <div className="flex flex-col">
                <p className="text-[14px] text-slate-500">
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
                <ul className="mt-2 max-h-[300px] overflow-y-auto">
                  {isFilterIncome
                    ? incomeData.map((income, incomeIdx) => (
                        <li
                          className="flex justify-between items-center py-1 px-3 border border-slate-100 rounded-sm mb-2 transition-all duration-300 hover:bg-slate-50"
                          key={incomeIdx}
                        >
                          <p
                            aria-label="budget-label"
                            className="text-lg font-medium"
                          >
                            {income.label}
                          </p>
                          <p
                            aria-label="budget-value"
                            className="text-lg font-semibold"
                          >
                            {toPercent(income.value, totalIncomeValue)}
                          </p>
                        </li>
                      ))
                    : expenseData.map((expense, expenseIdx) => (
                        <li
                          className="flex justify-between items-center py-1 px-3 border border-slate-100 rounded-sm mb-2 transition-all duration-300 hover:bg-slate-50"
                          key={expenseIdx}
                        >
                          <p
                            aria-label="budget-label"
                            className="text-lg font-medium"
                          >
                            {expense.label}
                          </p>
                          <p
                            aria-label="budget-value"
                            className="text-lg font-semibold"
                          >
                            {toPercent(expense.value, totalExpenseValue)}
                          </p>
                        </li>
                      ))}
                </ul>
              </div>

              <div className="flex flex-col gap-y-1">
                {Object.keys(summaryTotalMap).map((key, keyIdx) => (
                  <div
                    className={`flex justify-between space-x-6 items-baseline w-[280px] ${
                      keyIdx ===
                      Object.keys(summaryTotalMap).length - SECOND_INDEX
                        ? "pb-2"
                        : undefined
                    }`}
                    key={key}
                  >
                    <p
                      className="text-slate-400 text-[14px]"
                      aria-label="total-label"
                    >
                      {`total ${toCapitalize(key)}:`}
                    </p>
                    <span className="flex space-x-2 items-center">
                      {key === "balance" && (
                        <BiSolidUpArrow
                          className={`w-3 h-3 ${
                            totalExpenseValue > totalIncomeValue
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        />
                      )}
                      <p
                        aria-label="total-value"
                        className={`text-[15px] font-medium ${
                          key === "balance"
                            ? totalExpenseValue > totalIncomeValue
                              ? "text-red-600"
                              : "text-green-500"
                            : "text-slate-900"
                        }`}
                      >
                        {summaryTotalMap[key as keyof typeof summaryTotalMap]}
                      </p>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex space-x-5">
          {isLoading &&
            BUDGET_DETAILS.map((render) => (
              <SummaryCardLoader key={render} renderSkeleton={renderSkeleton} />
            ))}

          {isSuccess && (
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
                <div className="flex flex-col gap-y-2">
                  {data?.map(
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

          {isSuccess && (
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
                <div className="flex flex-col gap-y-2">
                  {data?.map(
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
    </MainLayout>
  );
}

export default SummaryDetailContainer;
