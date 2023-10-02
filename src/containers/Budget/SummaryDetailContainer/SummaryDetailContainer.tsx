import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetBudgetByBudgetId, useRenderSkeleton } from "@/hooks";
import { useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { SummaryCard } from "./components";
import { MainLayout, Skeleton } from "@/components";
import { Skeleton as ShadSkeleton } from "@/components/ui/skeleton";
import { EMPTY_STRING, FIRST_INDEX } from "@/constants";
import { Button } from "@/components/ui/button";

const MIN_LENGTH = 1;
const BUDGET_DETAILS = ["income", "expense"];
type Description = "income" | "expense";

function SummaryDetailContainer() {
  const searchParam = useSearchParams();
  const budgetIdParam = searchParam.get("");

  const { renderSkeleton } = useRenderSkeleton({
    length: 2,
    isShow: true,
  });

  const { data, isLoading, isSuccess } = useGetBudgetByBudgetId({
    budgetId: budgetIdParam || EMPTY_STRING,
  });

  const renderDescription = useCallback((key: Description) => {
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
              <CardTitle>Recent Incomes</CardTitle>
              {renderDescription("income")}
            </CardHeader>
            <CardContent>
              {data?.map(
                (budget) =>
                  budget.incomes &&
                  budget.incomes.map((income) => (
                    <SummaryCard key={income.incomeId} income={income} />
                  ))
              )}
            </CardContent>
          </Card>
        )}

        {isSuccess && (
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
              {renderDescription("expense")}
            </CardHeader>
            <CardContent>
              {data?.map(
                (budget) =>
                  budget.expenses &&
                  budget.expenses.map((expense) => (
                    <SummaryCard key={expense.expenseId} expense={expense} />
                  ))
              )}
            </CardContent>
          </Card>
        )}
      </div>
      <div className="flex">
        <Button className="mx-auto mt-3" disabled={isLoading}>
          Add Expense
        </Button>
      </div>
    </MainLayout>
  );
}

export default SummaryDetailContainer;
