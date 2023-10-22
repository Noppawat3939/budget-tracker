import React, { type FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiPlusCircle, FiInbox } from "react-icons/fi";
import { isEmpty } from "lodash";
import type { SummaryCardProps } from "./type";
import { SummaryCardDetail } from "..";

const SummaryCard: FC<SummaryCardProps> = ({
  budgetQuery,
  renderDescription,
  onNavigateToCreateNewBudget,
  data,
}) => {
  const renderTitle = budgetQuery === "income" ? "Incomes" : "Expenses";

  const hasData = {
    income: !isEmpty(data?.flatMap((item) => item.incomes)),
    expense: !isEmpty(data?.flatMap((item) => item.expenses)),
  };

  const queryIncome = budgetQuery === "income";
  const queryExpense = budgetQuery === "expense";

  return (
    <Card className="flex-1" about="summary-card-section">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle aria-label="income-title">{`Recent ${renderTitle}`}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-[12px] px-1"
            onClick={() => onNavigateToCreateNewBudget(budgetQuery)}
          >
            <FiPlusCircle className="mr-1" />
            {`Add ${budgetQuery}`}
          </Button>
        </div>
        {hasData[budgetQuery] && renderDescription(budgetQuery)}
      </CardHeader>
      <CardContent>
        {!hasData[budgetQuery] ? (
          <div className="flex justify-center items-center flex-col gap-y-2 mt-3">
            <FiInbox className="w-6 h-6 text-gray-300" />
            <CardDescription>{`You don't have any ${budgetQuery} listed yet.`}</CardDescription>
          </div>
        ) : (
          <div className="flex flex-col gap-y-2 pr-3 overflow-y-auto max-h-[180px]">
            {queryIncome &&
              data?.map(
                (budget) =>
                  budget.incomes &&
                  budget.incomes.map((income) => (
                    <SummaryCardDetail income={income} key={income.incomeId} />
                  ))
              )}
            {queryExpense &&
              data?.map(
                (budget) =>
                  budget.expenses &&
                  budget.expenses.map((expense) => (
                    <SummaryCardDetail
                      expense={expense}
                      key={expense.expenseId}
                    />
                  ))
              )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
