import type { TCreateBudget } from "@/types";

export type TotalLabel = TCreateBudget | "balance";

type Total = Record<TotalLabel, string>;

export type SummaryTotalProps = {
  summary: Total;
  icon: JSX.Element;
  hasPositiveDirection: boolean;
  isLoading: boolean;
};
