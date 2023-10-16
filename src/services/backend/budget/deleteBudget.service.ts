import { PrismaClient } from "@prisma/client";

export const deleteBudgetService = async (budgetId: string) => {
  const prisma = new PrismaClient();

  const deletedBudget = await prisma.budget.delete({
    where: {
      budgetId,
    },
  });

  return deletedBudget;
};

export const deleteIncomeService = async (incomeId: string) => {
  const prisma = new PrismaClient();

  const deletedIncome = await prisma.income.delete({
    where: {
      incomeId,
    },
  });

  return deletedIncome;
};

export const deleteExpenseService = async (expenseId: string) => {
  const prisma = new PrismaClient();

  const deletedExpense = await prisma.expense.delete({
    where: {
      expenseId,
    },
  });

  return deletedExpense;
};
