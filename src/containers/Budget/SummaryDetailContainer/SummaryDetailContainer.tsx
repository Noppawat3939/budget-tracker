import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetBudgetByBudgetId, useRenderSkeleton } from "@/hooks";
import { useSearchParams } from "next/navigation";
import React from "react";
import { SummaryCard } from "./components";
import { Skeleton } from "@/components";
import { Skeleton as ShadSkeleton } from "@/components/ui/skeleton";

const MIN_LENGTH = 1;

function SummaryDetailContainer() {
  const searchParam = useSearchParams();
  const budgetIdParam = searchParam.get("");

  const { renderSkeleton } = useRenderSkeleton({
    length: 2,
    isShow: true,
  });

  const { data, isLoading, isSuccess } = useGetBudgetByBudgetId({
    budgetId: budgetIdParam || "",
  });

  return (
    <div className="flex space-x-5">
      {isLoading &&
        ["income", "expense"].map((render) => (
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
            {data?.at(0)?.total && (
              <CardDescription>{`${
                data.at(0)!.total?.income > MIN_LENGTH
                  ? `${data?.[0].total.income} items`
                  : `${data?.[0].total.income} item`
              } of all your income`}</CardDescription>
            )}
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
            {data?.at(0)?.total && (
              <CardDescription>{`${
                data.at(0)!.total?.expense > MIN_LENGTH
                  ? `${data?.[0].total.expense} items`
                  : `${data?.[0].total.expense} item`
              } of all your expense`}</CardDescription>
            )}
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
  );
}

export default SummaryDetailContainer;
