import React from "react";
import { MainLayout } from "@/components";
import { RenderTrackingComponents as RenderComponents } from "./components";
import { useTrackingBudget } from "@/hooks";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorContainer } from "@/containers";

const TrackingContainer = () => {
  const {
    queryExpenses,
    trackingChart,
    expenses,
    total,
    queriesTotal,
    loading,
    filter,
    percentChange,
  } = useTrackingBudget();

  const onReset = () => {
    queryExpenses.refetch();
    queriesTotal.cur.refetch();
    queriesTotal.prev.refetch();
  };

  const errorProps = {
    description:
      "At this time, the budget tracking information is not yet known.",
    onClick: onReset,
  };

  return (
    <ErrorBoundary fallback={<ErrorContainer {...errorProps} />}>
      <MainLayout>
        <RenderComponents
          filter={filter.renderFilter}
          trackingChart={trackingChart}
          expenses={expenses}
          total={total}
          loading={loading}
          onFilter={filter.onFilter}
          percentChange={percentChange}
        />
      </MainLayout>
    </ErrorBoundary>
  );
};

export default TrackingContainer;
