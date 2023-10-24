import { EMPTY_STRING, QUERY_KEY } from "@/constants";
import { useUser } from "@/hooks";
import { getBudgetTotal } from "@/services";
import { TCreateBudget } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";

function useGetBudgetTotal(queryParam: TCreateBudget) {
  const { data: user } = useUser();

  const enabled = !isEmpty(user?.idToken || queryParam);

  const queryRes = useQuery({
    queryKey: [QUERY_KEY.GET_BUDGET_TOTAL, queryParam],
    queryFn: () =>
      getBudgetTotal({
        idToken: user?.idToken || EMPTY_STRING,
        query: queryParam,
      }),
    enabled,
    select: ({ data: { count, value } }) => ({ count, value }),
  });

  return queryRes;
}

export default useGetBudgetTotal;
