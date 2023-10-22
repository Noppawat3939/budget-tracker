import type {
  Expenses,
  IFBudgetTotal,
  IFExpenseData,
  IFIncomeData,
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

export type ExcludeTime = "createdAt" | "updatedAt";

export type SummaryCardDetailProps = {
  income?: IFIncomeData;
  expense?: IFExpenseData;
};

export type SelectedDropdownData =
  | Omit<IFIncomeData, ExcludeTime>
  | Omit<IFExpenseData, ExcludeTime>;

export type SummaryCardLoaderProps = {
  renderSkeleton: JSX.Element[];
};

export type TotalLabel = TCreateBudget | "balance";
type Total = Record<TotalLabel, string>;
type Filter = TCreateBudget;
export type PercentageData = { label: string; value: number }[];

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
