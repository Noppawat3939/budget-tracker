import React from "react";
import { MainLayout } from "@/components";
import { TrackingLineChart } from "./components";
import { useGetExpenseData } from "@/hooks";

const TrackingContainer = () => {
  const expenses = useGetExpenseData();

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
