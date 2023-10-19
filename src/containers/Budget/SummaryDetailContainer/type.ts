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

export type PercentageData = { label: string; value: number }[];
export type TotalLabel = "income" | "expense" | "balance";
export type Filter = TCreateBudget;

type Total = Record<TotalLabel, string>;

export type SummaryTotalProps = {
  summary: Total;
  icon: JSX.Element;
  hasPositiveDirection: boolean;
  isLoading: boolean;
};

export type SummaryByPercentageProps = {
  data: PercentageData;
  total: number;
  isLoading: boolean;
};

export type SummaryDoughnutChartProps = {
  chartData: DoughnutChart;
};

export type SummaryInfoProps = {
  isLoading: boolean;
  icon: JSX.Element;
  hasPositiveDirection: boolean;
  total: Total;
  isFilterIncome: boolean;
  selectedFilter: Filter;
  average: string;
  isSuccess: boolean;
  percentageIncomes?: PercentageData;
  percentageExpenses?: PercentageData;
  totalIncomes: number;
  totalExpenses: number;
};
