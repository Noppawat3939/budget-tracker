import { PrismaClient } from "@prisma/client";
import type { UpdateExpenseParams, UpdateIncomeParams } from "./type";

export const updateIncome = async ({
  incomeId,
  newIncome,
}: UpdateIncomeParams) => {
  const prisma = new PrismaClient();

  const updatedIncomeResponse = await prisma.income.update({
    where: {
      incomeId,
    },
    data: {
      income: newIncome.income,
      value: newIncome.value,
      description: newIncome.description,
    },
  });

  return updatedIncomeResponse;
};

export const updateExpense = async ({
  expenseId,
  newExpense,
}: UpdateExpenseParams) => {
  const prisma = new PrismaClient();

  const updatedExpenseResponse = await prisma.expense.update({
    where: {
      expenseId,
    },
    data: {
      expense: newExpense.expense,
      value: newExpense.value,
      description: newExpense.description,
    },
  });

  return updatedExpenseResponse;
};
