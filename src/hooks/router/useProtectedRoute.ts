"use client";

import { useRouter } from "next/navigation";
import { useUser } from "..";
import { useEffect } from "react";
import { isEmpty } from "lodash";
import { ROUTES } from "@/constants";

const useProtectedRoute = () => {
  const router = useRouter();
  const { data } = useUser();

  useEffect(() => {
    if (!isEmpty(data)) {
      router.push(ROUTES.BUDGET.CREATE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return;
};

export default useProtectedRoute;
