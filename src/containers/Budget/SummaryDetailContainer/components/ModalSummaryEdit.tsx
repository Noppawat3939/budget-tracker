/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEditBudgetDetailStore } from "@/store";
import { useGetContent, useNotification, useUpdateBudget } from "@/hooks";
import { GetCreateBudgetFormsResponse } from "../../CreateBudgetContainer/components/type";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ModalSummaryEdit = () => {
  const { isOpen, onOpenChange, activeModal, onClose } =
    useEditBudgetDetailStore((store) => ({
      isOpen: store.isOpenModal,
      activeModal: store.active,
      onOpenChange: store.onOpenModalChange,
      onClose: store.onCloseModal,
      selectedData: store.previousBudgetData,
    }));

  const {
    mutation: { isError, isSuccess },
    isLoading,
    formState,
  } = useUpdateBudget();

  const { data } = useGetContent<GetCreateBudgetFormsResponse>({
    params: "?form=create-budget",
  });

  useNotification({
    isError,
    errorMessage: `Can't update budget, Please try again`,
    isSuccess,
    successMessage: "Updated successfully",
  });

  const selectedFormByActive = data?.form.find(
    (item) => item.key === activeModal
  );

  return (
    <Dialog open={isOpen} onOpenChange={isLoading ? undefined : onOpenChange}>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`Editing your "${activeModal}"`}</DialogTitle>
            <DialogDescription className="text-[12px]">
              You can choose to edit any information or if you don't want to
              edit information. You can cancel data edits as well.
            </DialogDescription>
          </DialogHeader>
          <form>
            <h1 className="text-lg font-medium my-2">
              {selectedFormByActive?.title}
            </h1>
            <div className="flex flex-col gap-y-3">
              {selectedFormByActive?.forms.map((form) => {
                if (form.id === "description") {
                  return (
                    <span key={form.id}>
                      <label htmlFor={form.label} className="text-sm">
                        {form.label}
                      </label>
                      <Textarea
                        className="mt-2 max-h-[180px] overflow-y-auto outline-none focus:border-hidden focus:outline-none focus-within:border-hidden focus-within:outline-none resize-none placeholder:text-gray-400"
                        placeholder={form.placeholder}
                        value={formState.values.description}
                        onChange={(evt) => formState.onChange(evt, form.id)}
                        id={form.id}
                      />
                    </span>
                  );
                }

                return (
                  <span key={form.id}>
                    <label htmlFor={form.label} className="text-sm">
                      {form.label}
                    </label>
                    <Input
                      value={
                        form.id === "value"
                          ? formState.values.value
                          : formState.values.title
                      }
                      className="placeholder:text-gray-400 mt-2 outline-none focus:border-hidden focus:outline-none focus-within:border-hidden focus-within:outline-none"
                      placeholder={form.placeholder}
                      onChange={(evt) => formState.onChange(evt, form.id)}
                      id={form.id}
                      inputMode={form.id === "value" ? "numeric" : "text"}
                    />
                  </span>
                );
              })}
            </div>
          </form>
          <DialogFooter>
            <div className="flex justify-center space-x-3 w-full">
              <Button
                size="sm"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                type="submit"
                onClick={formState.onSubmit}
                disabled={isLoading}
              >
                Confirm edit
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default ModalSummaryEdit;
