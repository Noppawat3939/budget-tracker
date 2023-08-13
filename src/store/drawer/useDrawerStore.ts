import { create } from "zustand";
import { UseDrawerStore } from "./type";

export const useDrawerStore = create<UseDrawerStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onOpenChange: (newValue) => set({ isOpen: newValue }),
}));
