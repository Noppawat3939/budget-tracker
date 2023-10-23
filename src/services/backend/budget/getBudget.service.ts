import { PrismaClient } from "@prisma/client";
import type { GetBudgetByIdParams, GetBudgetParams } from "./type";
import { EMPTY_ARRAY } from "@/constants";
import dayjs from "dayjs";

export const getBudgetService = async ({
  userId,
  selectedExpense = true,
  selectedIncome = true,
}: GetBudgetParams) => {
  const prisma = new PrismaClient();

  const budgetResponse = await prisma.budget.findMany({
    where: {
      userId: userId,
    },
    include: {
      incomes: selectedIncome,
      expenses: selectedExpense,
    },
  });

  return budgetResponse || EMPTY_ARRAY;
};

export const getBudgetByIdService = async (params: GetBudgetByIdParams) => {
  const prisma = new PrismaClient();

  const budgetIdResponse = await prisma.budget.findMany({
    where: {
      budgetId: params.budgetId,
    },
    include: {
      expenses: params.isExpenses,
      incomes: params.isIncome,
    },
  });

  return budgetIdResponse;
};

export const getBudgetBySearchService = async (query: string) => {
  const prisma = new PrismaClient();

  const searchIncomeResponse = await prisma.income.findMany({
    where: {
      OR: [
        {
          income: { contains: query },
        },
        {
          description: { contains: query },
        },
      ],
    },
  });

  const searchExpenseResponse = await prisma.expense.findMany({
    where: {
      OR: [
        {
          expense: { contains: query },
        },
        {
          description: { contains: query },
        },
      ],
    },
  });

  return { incomes: searchIncomeResponse, expenses: searchExpenseResponse };
};

export const getIncomeByIdService = async (incomeId: string) => {
  const prisma = new PrismaClient();

  const foundIncome = await prisma.income.findMany({
    where: {
      incomeId,
    },
  });

  return foundIncome;
};

export const getExpenseByIdService = async (expenseId: string) => {
  const prisma = new PrismaClient();

  const foundExpense = await prisma.expense.findMany({
    where: {
      expenseId,
    },
  });

  return foundExpense;
};

export const getIncomeDataService = async (userId: string) => {
  const prisma = new PrismaClient();

  const incomesData = await prisma.income.findMany({
    where: {
      budget: { userId },
    },
  });

  return incomesData;
};

export const getExpenseDataService = async <T extends string>({
  userId,
  startDate,
  endDate,
}: {
  userId: T;
  startDate?: T;
  endDate?: T;
}) => {
  const prisma = new PrismaClient();

  const startDateTime = dayjs(startDate ?? "2000-01-30").toISOString();
  const endDateTime = dayjs(endDate ?? "2023-10-30").toISOString();

  const expensesData = await prisma.expense.findMany({
    where: {
      budget: { userId },
      createdAt: {
        lte: endDateTime,
        gte: startDateTime,
      },
    },
  });

  return expensesData;
};
