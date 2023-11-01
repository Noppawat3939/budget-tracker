"use client";

import {
  useDebounceSearch,
  useGetBudgetBySearch,
  useGetBudgetList,
} from "@/hooks";
import { identity, isEmpty } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

type FilterSummary = "all" | "thisMonth";

const DEBOUNCE_DELAY = 500;

function useHandleSummaryList() {
  const { searchValue, memorizeOnDebounceChange: onDebounce } =
    useDebounceSearch(DEBOUNCE_DELAY);

  const { balanceData, budgetData, isLoading } = useGetBudgetList();
  const searchParams = useSearchParams();

  const router = useRouter();

  const { data: searchData, isFetching } = useGetBudgetBySearch(searchValue);

  const [isPending, startTransition] = useTransition();
  const [filterSummary, setFilterSummary] = useState<FilterSummary>("all");

  useEffect(() => {
    const queryFilter = searchParams.get("filter");

    if (queryFilter) {
      setFilterSummary(queryFilter === "all" ? "all" : "thisMonth");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get("filter")]);

  const searchDataId = {
    incomeId: searchData?.incomes.map((income) => income.incomeId),
    expenseId: searchData?.expenses.map((expense) => expense.expenseId),
  };

  const filterBudgetBySearch = budgetData?.filter((budget) => {
    if (!isEmpty(searchDataId.expenseId) && isEmpty(searchDataId.incomeId)) {
      return budget.expenses.some((expense) =>
        searchDataId.expenseId?.includes(expense.expenseId)
      );
    }

    if (!isEmpty(searchDataId.incomeId) && isEmpty(searchDataId.expenseId)) {
      return budget.incomes.some((income) =>
        searchDataId.incomeId?.includes(income.incomeId)
      );
    }
  });

  const onSelectedFilter = (selectedValue: string) => {
    const queryStrFilter = {
      thisMonth: "month",
      all: "all",
    };
    router.replace(
      `/summary?filter=${queryStrFilter[selectedValue as FilterSummary]}`
    );

    startTransition(() => setFilterSummary(selectedValue as FilterSummary));
  };

  const hasLoadingData = [isLoading, isFetching, isPending].some(identity);

  return {
    budgetData: searchValue ? filterBudgetBySearch! : budgetData!,
    balanceData: balanceData!,
    isLoading: hasLoadingData,
    debounceResponse: { onDebounce, debounceValue: searchValue },
    filterResponse: {
      onChange: onSelectedFilter,
      filter: filterSummary,
    },
  };
}

export default useHandleSummaryList;
