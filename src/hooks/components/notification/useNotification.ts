"use client";
import { useEffect } from "react";
import { toast } from "react-toastify";
import type { UseNotificationParams } from "./type";

function useNotification(params: UseNotificationParams) {
  useEffect(() => {
    if (params.isSuccess) {
      toast.success(params.successMessage || "success message");
    }

    if (params.isError) {
      toast.error(params.errorMessage || "error message");
    }
  }, [
    params.errorMessage,
    params.isError,
    params.isSuccess,
    params.successMessage,
  ]);

  return;
}

export default useNotification;
