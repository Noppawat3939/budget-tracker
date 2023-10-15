import { create } from "zustand";
import type { UseEditBudgetDetailStore } from "./type";

const initialState = {
  isOpenModal: false,
  active: null,
  previousBudgetData: {
    expense: undefined,
    income: undefined,
  },
};

const useEditBudgetDetailStore = create<UseEditBudgetDetailStore>((set) => ({
  isOpenModal: initialState.isOpenModal,
  previousBudgetData: initialState.previousBudgetData,
  active: initialState.active,
  onCloseModal: () =>
    set(() => ({
      isOpenModal: false,
      previousBudgetData: initialState.previousBudgetData,
      active: initialState.active,
    })),
  onOpenModal: (active, selectedData) =>
    set(() => ({
      isOpenModal: true,
      active,
      previousBudgetData: selectedData,
    })),
  onOpenModalChange: (open) =>
    set(() => ({
      isOpenModal: open,
      previousBudgetData: initialState.previousBudgetData,
      active: initialState.active,
    })),
}));

export default useEditBudgetDetailStore;
