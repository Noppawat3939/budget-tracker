import type { IFExpenseData, IFIncomeData, TCreateBudget } from "@/types";

export type UseDeleteBudgetStore = {
  isOpenModal: boolean;
  onOpenModal: (
    active: TCreateBudget,
    selectedData: { income?: IFIncomeData; expense?: IFExpenseData }
  ) => void;
  onCloseModal: () => void;
  onOpenModalChange: (open: boolean) => void;
  active: TCreateBudget | null;
  selectedData: { income?: IFIncomeData; expense?: IFExpenseData };
};
