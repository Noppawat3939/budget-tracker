import { PrismaClient } from "@prisma/client";
import type {
  CreateBudgetParams,
  CreateExpenseParams,
  CreateIncomeParams,
} from "./type";

export const createIncomeByBudgetIdService = async (
  params: CreateIncomeParams
) => {
  const prisma = new PrismaClient();

  const createIncomeResponse = await prisma.income.create({
    data: {
      budgetId: params.budgetId,
      income: params.income,
      value: params.value,
      description: params.description,
    },
  });

  return createIncomeResponse;
};

export const createExpenseByBudgetIdService = async (
  params: CreateExpenseParams
) => {
  const prisma = new PrismaClient();

  const createExpenseResponse = await prisma.expense.create({
    data: {
      budgetId: params.budgetId,
      expense: params.expense,
      value: params.value,
      description: params.description,
    },
  });

  return createExpenseResponse;
};

export const createBudgetService = async (params: CreateBudgetParams) => {
  const prisma = new PrismaClient();

  const createBudgetResponse = await prisma.budget.create({
    data: {
      userId: params.userId,
      incomes: {
        create: {
          income: params.incomes.income,
          value: params.incomes.value,
          description: params.incomes.description,
        },
      },
      expenses: {
        create: {
          expense: params.expenses.expense,
          value: params.expenses.value,
          description: params.expenses.description,
        },
      },
    },
    include: {
      expenses: true,
      incomes: true,
    },
  });

  return createBudgetResponse;
};
