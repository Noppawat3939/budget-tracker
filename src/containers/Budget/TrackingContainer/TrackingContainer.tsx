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

  if (queryExpenses.status === "error")
    return <ErrorContainer {...errorProps} />;

  return (
    <ErrorBoundary fallback={<ErrorContainer />}>
      <MainLayout>
        <RenderComponents
          trackingChart={trackingChart}
          expenses={expenses}
          total={total}
          loading={loading}
        />
      </MainLayout>
    </ErrorBoundary>
  );
};

export default TrackingContainer;
