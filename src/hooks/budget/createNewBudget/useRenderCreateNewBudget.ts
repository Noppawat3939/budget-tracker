import {
  DEFAULT_TEXT,
  DEFAULT_VALUE_NUMBER,
  EMPTY_STRING,
  FIRST_INDEX,
} from "@/constants";
import { useGetBudgetByBudgetId } from "@/hooks";
import { TBudget } from "@/types";
import { useSearchParams } from "next/navigation";

type SummaryList = {
  order: string;
  price: number;
  type: TBudget;
  description?: string;
}[];

function useRenderCreateNewBudget() {
  const search = useSearchParams();
  const budgetId = search.get("id") || EMPTY_STRING;

  const { data: budget } = useGetBudgetByBudgetId({ budgetId });

  const expensesMap = budget
    ?.map((item) => item.expenses)
    .at(0)
    ?.sort((exA, exB) => exB.value - exA.value)
    ?.map((expense) => ({
      order: expense.expense,
      price: expense.value,
      type: "expend",
      description: expense.description || DEFAULT_TEXT,
    }));

  const newBudgetMap = budget
    ?.map((item) => ({
      sumIncome: item.incomes
        .map((ic) => ic.value)
        .reduce((preIc, curIc) => preIc + curIc, DEFAULT_VALUE_NUMBER),
      sumExpense: item.expenses
        .map((ep) => ep.value)
        .reduce((preEp, curEp) => preEp + curEp, DEFAULT_VALUE_NUMBER),
    }))
    .at(FIRST_INDEX);

  const summaryList = expensesMap
    ? ([
        ...expensesMap,
        {
          order: "Balance",
          price: newBudgetMap!.sumIncome - newBudgetMap!.sumExpense,
          type: "balance",
        },
      ] as SummaryList)
    : undefined;

  const sumIncome = budget
    ?.map((item) => item.incomes.map((income) => income.value))
    .at(FIRST_INDEX)
    ?.reduce((prev, cur) => prev + cur, DEFAULT_VALUE_NUMBER);

  return {
    summaryList,
    sumIncome,
  };
}

export default useRenderCreateNewBudget;
