import { PrismaClient } from "@prisma/client";

export const getBudgetService = async (param: { userId: string }) => {
  const prisma = new PrismaClient();

  const budgetResponse = await prisma.budget.findMany({
    where: {
      userId: param.userId,
    },
    include: {
      incomes: true,
      expenses: true,
    },
  });

  return budgetResponse || [];
};

type GetBudgetByIdParams = {
  budgetId: string;
  isIncome?: boolean;
  isExpenses?: boolean;
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
