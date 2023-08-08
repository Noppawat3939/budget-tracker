"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Drawer } from "@/components";
import { Button } from "@/components/ui/button";
import type { CreateNewBudgetFormProps } from "./type";
import { isEmpty } from "lodash";

export default function CreateNewBudgetForm({
  onIncomeChange,
  income,
  onSubmit,
  isDisabled,
  onAddIncome,
}: CreateNewBudgetFormProps) {
  const isShowAddIncome =
    !isEmpty(income.value) && !isEmpty(income.description);

  return (
    <Drawer title="Add a new">
      <div className=" bg-gray-50 relative py-5 px-6 rounded-md">
        <h1 className="font-bold mb-[20px]">💰 Incomes</h1>
        <Button
          className={`${
            isShowAddIncome ? "block" : "hidden"
          } absolute text-xs right-2 top-2`}
          size="sm"
          type="submit"
          variant="outline"
          onClick={onAddIncome}
        >
          Add income
        </Button>
        <div className="flex space-x-5">
          <div className=" w-auto flex-auto">
            <h3
              className="font-medium w-full mb-3"
              aria-label="income-description-label"
            >
              Income description
            </h3>
            <Input
              inputMode="text"
              id="description"
              value={income.description}
              className="w-full outline-none bg-transparent border-hidden focus:border-hidden focus:outline-none focus-within:border-hidden focus-within:outline-none"
              onChange={onIncomeChange}
              aria-label="income-value-input"
              placeholder="Add your income categories such as Salary, rent, royalties, dividends, etc."
            />
          </div>
          <div className="flex-auto">
            <h3 className="font-medium mb-3" aria-label="income-value-label">
              Income value (฿)
            </h3>
            <Input
              id="value"
              inputMode="numeric"
              value={income.value}
              className="outline-none bg-transparent border-hidden focus:border-hidden focus:outline-none focus-within:border-hidden focus-within:outline-none"
              onChange={onIncomeChange}
              aria-label="income-value-input"
              placeholder="Fill in numbers only (0-9)"
            />
          </div>
        </div>
      </div>
      <div className=" bg-gray-50 py-5 px-6 rounded-md mt-2">
        <h1 className="font-medium mb-[20px]">💸 Expenses</h1>
        <Input
          inputMode="numeric"
          className="outline-none bg-transparent border-hidden focus:border-hidden focus:outline-none focus-within:border-hidden focus-within:outline-none"
          aria-label="income-value-input"
          placeholder="Fill in numbers only (0-9)"
        />
      </div>

      <Button
        disabled={isDisabled}
        type="submit"
        className="w-fit flex mx-auto mt-10"
        onClick={onSubmit}
      >
        Create new
      </Button>
    </Drawer>
  );
}
