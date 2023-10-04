import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetBudgetByBudgetId, useRenderSkeleton } from "@/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { SummaryCard } from "./components";
import { MainLayout, Skeleton } from "@/components";
import { Skeleton as ShadSkeleton } from "@/components/ui/skeleton";
import { EMPTY_STRING, FIRST_INDEX, ROUTES } from "@/constants";
import { Button } from "@/components/ui/button";
import { FiPlusCircle } from "react-icons/fi";

const MIN_LENGTH = 1;
const BUDGET_DETAILS = ["income", "expense"];
type BudgetKey = "income" | "expense";

function SummaryDetailContainer() {
  const searchParam = useSearchParams();
  const budgetIdParam = searchParam.get("");
  const { push } = useRouter();

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

  return (
    <MainLayout>
      <div className="flex space-x-5">
        {isLoading &&
          BUDGET_DETAILS.map((render) => (
            <Card className="flex-1" key={render}>
              <CardHeader>
                <Skeleton isShow />
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start space-x-2">
                  <ShadSkeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-col w-full space-y-2">
                    <React.Fragment>{renderSkeleton}</React.Fragment>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

        {isSuccess && (
          <Card className="flex-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle aria-label="income-title">Recent Incomes</CardTitle>
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
                      <SummaryCard key={income.incomeId} income={income} />
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
                      <SummaryCard key={expense.expenseId} expense={expense} />
                    ))
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}

export default SummaryDetailContainer;
