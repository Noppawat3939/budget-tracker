import { QUERY_KEY } from "@/constants";
import { toString } from "@/helper";
import { useUser } from "@/hooks";
import { getExpenseData } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";

function useGetExpenseData({
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
}) {
  const { data: user } = useUser();
  const enabled = !isEmpty(user?.idToken);

  return useQuery({
    queryKey: [QUERY_KEY.GET_EXPENSES, startDate, endDate],
    queryFn: () =>
      getExpenseData({ idToken: toString(user?.idToken), startDate, endDate }),
    enabled,
    select: ({ data }) => data.data,
    refetchOnWindowFocus: false,
  });
}

export default useGetExpenseData;
