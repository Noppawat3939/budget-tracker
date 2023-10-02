import React from "react";
import Image from "next/image";
import incomeImage from "@/assets/images/income.png";
import { IFExpenseData, IFIncomeData } from "@/types";
import { priceFormatter } from "@/helper";
import { Select } from "@/components";

type SummaryCardProps = {
  income?: IFIncomeData;
  expense?: IFExpenseData;
};

function SummaryCard({ income, expense }: SummaryCardProps) {
  return (
    <React.Fragment>
      {income && (
        <div
          className="flex items-center justify-between"
          key={income.incomeId}
        >
          <div className="flex items-center space-x-4">
            <Image
              src={incomeImage}
              alt="income-img"
              className="h-8 w-8 rounded-full object-cover bg-slate-100"
            />
            <div className="flex-col">
              <p>{income.income}</p>
              {income.description && (
                <p className="text-sm text-gray-500">{income.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p>{priceFormatter(income.value)}</p>
            <Select items={["edit", "remove"]} />
          </div>
        </div>
      )}

      {expense && (
        <div
          className="flex items-center justify-between"
          key={expense.expenseId}
        >
          <div className="flex items-center space-x-4">
            <Image
              src={incomeImage}
              alt="income-img"
              className="h-8 w-8 rounded-full object-cover bg-slate-100"
            />
            <div className="flex-col">
              <p>{expense.expense}</p>
              {expense.description && (
                <p className="text-sm text-gray-500">{expense.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p>{priceFormatter(expense.value)}</p>
            <Select items={["edit", "remove"]} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default SummaryCard;
