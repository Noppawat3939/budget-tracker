"use client";

import { getBudgetByBudgetId } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../..";
import { EMPTY_STRING, QUERY_KEY } from "@/constants";
import { isUndefined } from "lodash";

type UseGetBudgetByBudgetIdParams = {
  budgetId: string;
};

function useGetBudgetByBudgetId(params: UseGetBudgetByBudgetIdParams) {
  const { data } = useUser();
  const { budgetId } = params;

  const budgetByIdQuery = useQuery({
    queryKey: [QUERY_KEY.GET_BUDGET_BY_ID, { budgetId }],
    queryFn: () =>
      getBudgetByBudgetId({
        idToken: data!.idToken || EMPTY_STRING,
        budgetId: budgetId,
      }),
    select: (res) => res.data.data,
    enabled: !isUndefined(data?.idToken),
  });

  return budgetByIdQuery;
}

export default useGetBudgetByBudgetId;
