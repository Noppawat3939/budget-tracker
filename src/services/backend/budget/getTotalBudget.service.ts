import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

export const getTotalIncome = async <T extends string>({
  userId,
  startDate,
  endDate,
}: {
  userId: T;
  startDate?: T;
  endDate?: T;
}) => {
  const prisma = new PrismaClient();

  const startDateTime = dayjs(startDate ?? undefined).toISOString();
  const endDateTime = dayjs(endDate ?? undefined).toISOString();

  const incomeValues = await prisma.income.findMany({
    where: {
      OR: [
        {
          budget: { userId },
          updatedAt: {
            lte: endDateTime,
            gte: startDateTime,
          },
        },
        {
          budget: { userId },
          createdAt: {
            lte: endDateTime,
            gte: startDateTime,
          },
        },
      ],
    },
    select: { value: true },
  });

  return incomeValues;
};

export const getTotalExpense = async <T extends string>({
  userId,
  startDate,
  endDate,
}: {
  userId: T;
  startDate?: T;
  endDate?: T;
}) => {
  const prisma = new PrismaClient();

  const startDateTime = dayjs(startDate ?? undefined).toISOString();
  const endDateTime = dayjs(endDate ?? undefined).toISOString();

  const expenseValues = await prisma.expense.findMany({
    where: {
      OR: [
        {
          budget: { userId },
          updatedAt: {
            lte: endDateTime,
            gte: startDateTime,
          },
        },
        {
          budget: { userId },
          createdAt: {
            lte: endDateTime,
            gte: startDateTime,
          },
        },
      ],
    },
    select: { value: true },
  });

  return expenseValues;
};
