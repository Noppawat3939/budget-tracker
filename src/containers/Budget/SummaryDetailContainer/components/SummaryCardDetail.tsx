import React from "react";
import Image from "next/image";
import incomeImage from "@/assets/images/income.png";
import { IFExpenseData, IFIncomeData, TCreateBudget } from "@/types";
import { priceFormatter } from "@/helper";
import { Dropdown } from "@/components";
import { DEFAULT_TEXT } from "@/constants";
import { useEditBudgetDetailStore } from "@/store";

type SummaryCardDetailProps = {
  income?: IFIncomeData;
  expense?: IFExpenseData;
};

function SummaryCardDetail({ income, expense }: SummaryCardDetailProps) {
  const { onOpenModal } = useEditBudgetDetailStore((store) => ({
    onOpenModal: store.onOpenModal,
  }));

  const onSelectedDropdown = (
    option: string,
    active: TCreateBudget,
    selectedData: IFIncomeData | IFExpenseData
  ) => {
    option === "edit"
      ? onOpenModal(active, { [active]: selectedData })
      : undefined;
  };

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
              <p aria-label="income-title">{income.income}</p>
              <p
                className="text-sm text-gray-500"
                aria-label="income-description"
              >
                {income?.description || DEFAULT_TEXT}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p aria-label="income-price">{priceFormatter(income.value)}</p>
            <Dropdown
              items={["edit", "remove"]}
              onSelected={(option) =>
                onSelectedDropdown(option, "income", income)
              }
            />
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
              alt="expense-img"
              className="h-8 w-8 rounded-full object-cover bg-slate-100"
            />
            <div className="flex-col">
              <p aria-label="expense-title">{expense.expense}</p>
              <p
                className="text-sm text-gray-500"
                aria-label="expense-description"
              >
                {expense?.description || DEFAULT_TEXT}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p aria-label="expense-price">{priceFormatter(expense.value)}</p>

            <Dropdown
              items={["edit", "remove"]}
              onSelected={(option) =>
                onSelectedDropdown(option, "expense", expense)
              }
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default SummaryCardDetail;
