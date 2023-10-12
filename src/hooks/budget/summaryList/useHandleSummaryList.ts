import {
  useDebounceSearch,
  useGetBudgetBySearch,
  useGetBudgetList,
} from "@/hooks";
import { identity, isEmpty } from "lodash";
import { useState, useTransition } from "react";

type FilterSummary = "all" | "thisMonth";

const DEBOUNCE_DELAY = 500;

function useHandleSummaryList() {
  const { searchValue, debouncedResults } = useDebounceSearch(DEBOUNCE_DELAY);

  const { balanceData, budgetData, isLoading } = useGetBudgetList();

  const { data: searchData, isFetching } = useGetBudgetBySearch(searchValue);

  const [isPending, startTransition] = useTransition();
  const [filterSummary, setFilterSummary] = useState<FilterSummary>("all");

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
    startTransition(() => setFilterSummary(selectedValue as FilterSummary));
  };

  const hasLoadingData = [isLoading, isFetching, isPending].some(identity);

  return {
    budgetData: searchValue ? filterBudgetBySearch! : budgetData!,
    balanceData: balanceData!,
    isLoading: hasLoadingData,
    debounceResponse: {
      onDebounce: debouncedResults,
      debounceValue: searchValue,
    },
    filterResponse: {
      onChange: onSelectedFilter,
      filter: filterSummary,
    },
  };
}

export default useHandleSummaryList;
