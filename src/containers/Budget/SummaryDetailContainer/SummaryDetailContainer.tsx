import { useGetBudgetByBudgetId } from "@/hooks";
import { useSearchParams } from "next/navigation";
import React from "react";

function SummaryDetailContainer() {
  const searchParam = useSearchParams();
  const budgetIdParam = searchParam.get("");

  useGetBudgetByBudgetId({ budgetId: budgetIdParam || "" });

  return <div>SummaryDetailContainer</div>;
}

export default SummaryDetailContainer;
