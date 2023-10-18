import {
  DoughnutChart,
  Expenses,
  IFBudgetTotal,
  Incomes,
  TCreateBudget,
} from "@/types";

export type SummaryCardProps = {
  budgetQuery: TCreateBudget;
  onNavigateToCreateNewBudget: (query: TCreateBudget) => void;
  renderDescription: (query: TCreateBudget) => React.ReactNode;
  data?: {
    budgetId: string;
    expenses: Expenses;
    incomes: Incomes;
    total: IFBudgetTotal;
  }[];
};

export type Total = "income" | "expense" | "balance";

export type SummaryTotalProps = {
  summary: Record<Total, string>;
  icon: JSX.Element;
  hasGoodDirection: boolean;
  isLoading: boolean;
};

export type SummaryByPercentageProps = {
  data: { label: string; value: number }[];
  total: number;
  isLoading: boolean;
};

export type SummaryDoughnutChartProps = {
  chartData: DoughnutChart;
};
