import { IFExpenseData } from "@/types";

export type TotalSpendLabel = "current" | "previous" | "balance";
export type LoadingData = "getTotal" | "expenses";

export type RenderTrackingComponentsProps = {
  trackingChart: { value: number; date: string; expense: string }[];
  expenses: (IFExpenseData & {
    budgetId: string;
  })[];
  total: Record<TotalSpendLabel, number>;
  loading: Record<LoadingData, boolean>;
  filter: string[];
};
