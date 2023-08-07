import { TBudget } from "@/types";
import { ChartData } from "chart.js";
import { type SelectSingleEventHandler } from "react-day-picker";

export type DoughnutCardProps = {
  data: ChartData<"doughnut", number[], string>;
};

export type SummaryCardProps = {
  end: number;
  start?: number;
  isMounted: boolean;
  data: { order: string; price: number; type: TBudget; description?: string }[];
};

export type CreateIncomeFormProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  income: string;
  date: Date | undefined;
  onSubmit?: () => void;
  isDisabled?: boolean;
  onSelectDate?: SelectSingleEventHandler;
};
