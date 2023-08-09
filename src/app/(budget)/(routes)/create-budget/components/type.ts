import { TBudget } from "@/types";
import { ChartData } from "chart.js";

export type DoughnutCardProps = {
  data: ChartData<"doughnut", number[], string>;
};

export type SummaryCardProps = {
  end: number;
  start?: number;
  isMounted: boolean;
  data: { order: string; price: number; type: TBudget; description?: string }[];
};

export type CreateNewBudgetFormProps = {
  onIncomeChange?: React.ChangeEventHandler<HTMLInputElement>;
  income: { value: string; description: string };
  onAddIncome?: () => void;
  isDisabled?: boolean;
};
