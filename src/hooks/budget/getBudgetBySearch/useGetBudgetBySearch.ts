import { EMPTY_STRING, QUERY_KEY } from "@/constants";
import { useUser } from "@/hooks";
import { getBudgetByQuerySearch } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useGetBudgetBySearch = (search: string) => {
  const { data } = useUser();

  const idToken = data?.idToken || EMPTY_STRING;

  const searchBudget = useQuery({
    queryKey: [QUERY_KEY.GET_BUDGET_BY_SEARCH, { search }],
    queryFn: () =>
      getBudgetByQuerySearch({
        idToken,
        search: search,
      }),
    select: (res) => res.data.data,
    enabled: Boolean(idToken && search),
  });

  return searchBudget;
};

export default useGetBudgetBySearch;
