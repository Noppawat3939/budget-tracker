import { ROUTES } from "@/constants";
import { localStorage } from "@/helper";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { create } from "zustand";

type UseLogoutStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
  onLogout: () => void;
};

export const useLogoutStore = create<UseLogoutStore>((set) => ({
  isOpen: false,
  onClose: () => set(() => ({ isOpen: false })),
  onOpen: () => set(() => ({ isOpen: true })),
  onOpenChange: (open) => set(() => ({ isOpen: open })),
  onLogout: () => {
    const { clear } = localStorage();
    clear();
    signOut();

    return redirect(ROUTES.MAIN);
  },
}));
