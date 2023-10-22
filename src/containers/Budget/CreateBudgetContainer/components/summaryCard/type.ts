import type { TBudget } from "@/types";

export type SummaryCardProps = {
  end: number;
  start?: number;
  isMounted: boolean;
  data: { order: string; price: number; type: TBudget; description?: string }[];
};
