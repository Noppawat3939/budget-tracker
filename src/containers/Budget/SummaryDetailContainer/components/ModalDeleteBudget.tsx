import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { priceFormatter } from "@/helper";
import { useDeleteBudget, useNotification } from "@/hooks";
import { useDeleteBudgetStore } from "@/store";
import { isEmpty } from "lodash";
import React from "react";
import { RiAlertFill } from "react-icons/ri";

const ModalDeleteBudget = () => {
  const { onDelete, isLoading, isSuccess, isError } = useDeleteBudget();

  const { isOpen, onClose, onOpenChange, active, selectedData } =
    useDeleteBudgetStore((store) => ({
      isOpen: store.isOpenModal,
      onClose: store.onCloseModal,
      onOpenChange: store.onOpenModalChange,
      active: store.active,
      selectedData: store.selectedData,
    }));

  useNotification({
    isSuccess,
    isError,
    successMessage: "Delete success",
    errorMessage: "Can't delete, please try again",
  });

  return (
    <Dialog
      open={isOpen && !isEmpty(active)}
      onOpenChange={isLoading ? undefined : onOpenChange}
    >
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl justify-center">
              <RiAlertFill className="bg-red-100 text-red-500 rounded-full p-2 w-10 h-10 mr-3 capitalize" />
              {`Delete ${active} ?`}
            </DialogTitle>

            <DialogDescription className="text-center">
              <span>Are you sure you want to delete</span>
              <br />
              {`${
                //@ts-ignore
                selectedData?.[active]?.[active]
              } ${priceFormatter(
                selectedData?.[active as keyof typeof selectedData]?.value!
              )}`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="mt-5 flex items-center justify-center space-x-4 w-full">
              <Button
                variant="outline"
                onClick={onClose}
                aria-label="cancel-delete-budget-btn"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={onDelete}
                variant="destructive"
                aria-label="confirm-delete-budget-btn"
                disabled={isLoading}
              >
                Confirm
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default ModalDeleteBudget;
