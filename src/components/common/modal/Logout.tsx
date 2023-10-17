"use client";

import React, { FC, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLogoutStore } from "@/store";
import { useQueryClient } from "@tanstack/react-query";

const Logout: FC = () => {
  const { clear: clearCache } = useQueryClient();

  const { onClose, onLogout, open, onOpenChange } = useLogoutStore((store) => ({
    open: store.isOpen,
    onClose: store.onClose,
    onLogout: store.onLogout,
    onOpenChange: store.onOpenChange,
  }));

  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    clearCache();
    onLogout();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center my-4 text-2xl text-slate-900">
            Are you sure you want to logout?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <div className="flex justify-center space-x-3 w-full">
            <Button variant="outline" disabled={isPending} onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={isPending}
              onClick={() => startTransition(handleLogout)}
            >
              Logout
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Logout;
