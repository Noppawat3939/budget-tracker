import { IFExpenseData, IFIncomeData, TCreateBudget } from "@/types";

export type UseEditBudgetDetailStore = {
  isOpenModal: boolean;
  active: TCreateBudget | null;
  onOpenModal: (
    active: TCreateBudget,
    selectedData: { income?: IFIncomeData; expense?: IFExpenseData }
  ) => void;
  onCloseModal: () => void;
  onOpenModalChange: (newOpen: boolean) => void;
  previousBudgetData: {
    income?: IFIncomeData;
    expense?: IFExpenseData;
  };
};
