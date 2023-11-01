import { QUERY_KEY } from "@/constants";
import { toString } from "@/helper";
import { useUser } from "@/hooks";
import { getBudgetTotal } from "@/services";
import { TCreateBudget } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";

type UseGetBudgetTotalParams = {
  query: TCreateBudget;
  startDate?: string;
  endDate?: string;
};

function useGetBudgetTotal(params: UseGetBudgetTotalParams) {
  const { data: user } = useUser();

  const enabled = !isEmpty(user?.idToken && params.query);

  const queryRes = useQuery({
    queryKey: [
      QUERY_KEY.GET_BUDGET_TOTAL,
      params.query,
      params.endDate,
      params.startDate,
    ],
    queryFn: () =>
      getBudgetTotal({
        idToken: toString(user?.idToken),
        query: params.query,
        startDate: params.startDate,
        endDate: params.endDate,
      }),
    enabled,
    select: ({ data: { count, value } }) => ({ count, value }),
  });

  return queryRes;
}

export default useGetBudgetTotal;
