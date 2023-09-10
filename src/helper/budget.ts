type Incomes = {
  incomeId: string;
  budgetId: string;
  income: string;
  description: string | null;
  value: number;
}[];

type Expenses = {
  expenseId: string;
  budgetId: string;
  expense: string;
  value: number;
  description: string | null;
}[];

type BudgetData = { incomes?: Incomes; expenses?: Expenses };

export const mapBudgetData = (data: BudgetData) => {
  if (data?.incomes) {
    const mapIncome = data.incomes.map((income) => ({
      incomeId: income.incomeId,
      income: income.income,
      value: income.value,
      description: income.description,
    }));

    return mapIncome;
  }

  if (data?.expenses) {
    const mapExpense = data.expenses.map((expense) => ({
      expenseId: expense.expenseId,
      expense: expense.expense,
      value: expense.value,
      description: expense.description,
    }));

    return mapExpense;
  }
};
