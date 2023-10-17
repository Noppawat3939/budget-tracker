import { IFExpenseData, IFIncomeData, TCreateBudget } from "@/types";
import { create } from "zustand";

type UseDeleteBudgetStore = {
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

const initialState = {
  isOpenModal: false,
  active: null,
  selectedData: {
    income: undefined,
    expense: undefined,
  },
};

const useDeleteBudgetStore = create<UseDeleteBudgetStore>((set) => ({
  isOpenModal: initialState.isOpenModal,
  selectedData: initialState.selectedData,
  active: initialState.active,
  onOpenModal: (active, selectedData) =>
    set({ isOpenModal: true, active, selectedData }),
  onCloseModal: () =>
    set({
      isOpenModal: initialState.isOpenModal,
      active: initialState.active,
      selectedData: initialState.selectedData,
    }),
  onOpenModalChange: (open) =>
    set({
      isOpenModal: open,
      active: initialState.active,
      selectedData: initialState.selectedData,
    }),
}));

export default useDeleteBudgetStore;
