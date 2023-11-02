import { PrismaClient } from "@prisma/client";

export const getBudgetTimestampService = async (userId: string) => {
  const prisma = new PrismaClient();

  return await prisma.budget.findMany({
    where: {
      userId,
    },
    select: {
      createdAt: true,
    },
  });
};
