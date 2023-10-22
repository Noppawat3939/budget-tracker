import { EMPTY_STRING, QUERY_KEY } from "@/constants";
import { useUser } from "@/hooks";
import { getExpenseData } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";

function useGetExpenseData() {
  const { data: user } = useUser();
  const enabled = !isEmpty(user?.idToken);

  return useQuery({
    queryKey: [QUERY_KEY.GET_EXPENSES],
    queryFn: () => getExpenseData({ idToken: user?.idToken || EMPTY_STRING }),
    enabled,
    select: ({ data }) => data.data,
  });
}

export default useGetExpenseData;
