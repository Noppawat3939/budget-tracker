import React from "react";
import { MainLayout } from "@/components";
import { RenderTrackingComponents as RenderComponents } from "./components";
import { useGetExpenseData } from "@/hooks";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorContainer } from "@/containers";

const TrackingContainer = () => {
  const expenses = useGetExpenseData();

  const errorProps = {
    description:
      "At this time, the budget tracking information is not yet known.",
    onClick: () => expenses.refetch(),
  };

  if (expenses.status === "error") return <ErrorContainer {...errorProps} />;

  return (
    <ErrorBoundary fallback={<ErrorContainer />}>
      <MainLayout>
        <RenderComponents />
      </MainLayout>
    </ErrorBoundary>
  );
};

export default TrackingContainer;
