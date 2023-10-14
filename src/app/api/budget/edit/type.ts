import type { IFExpenseData, IFIncomeData } from "@/types";

export type UpdatedRequestBody = {
  income?: Partial<IFIncomeData>;
  expense?: Partial<IFExpenseData>;
};
