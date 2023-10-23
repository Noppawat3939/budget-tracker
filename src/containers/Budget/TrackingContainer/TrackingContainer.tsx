import React from "react";
import { MainLayout } from "@/components";
import { TrackingLineChart } from "./components";
import { useGetExpenseData } from "@/hooks";
import { ErrorBoundary } from "react-error-boundary";

const TrackingContainer = () => {
  const expenses = useGetExpenseData();

  console.log("🚀 ===> expenses:", expenses.data);

  return (
    <MainLayout>
      TrackingContainer
      <div className="flex max-w-[90%] h-[420px] mx-auto">
        <TrackingLineChart />
      </div>
    </MainLayout>
  );
};

export default TrackingContainer;
