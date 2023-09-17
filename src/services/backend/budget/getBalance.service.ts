import { getBudgetService } from ".";

export const getBudgetBalanceService = async ({
  userId,
}: {
  userId: string;
}) => {
  const budgets = await getBudgetService({ userId });

  if (budgets.length) {
    const data = budgets.map((budget) => {
      if (budget.incomes || budget.expenses) {
        const sumIncomes = budget.incomes.reduce(
          (total, income) => total + income.value,
          0
        );
        const sumExpenses = budget.expenses.reduce(
          (total, expense) => total + expense.value,
          0
        );

        return {
          budgetId: budget.budgetId,
          incomeValues: sumIncomes,
          expenseValues: sumExpenses,
          totalBalance: sumIncomes - sumExpenses,
        };
      }
    });

    return data;
  }
};
