"use client";
import React, { Suspense, type FC } from "react";

import { MainLayout, Table } from "@/components";
import { useGetBudget } from "@/hooks";
import { renderSummaryRows, renderSummaryColumns } from "./utils";
import { Input } from "@/components/ui/input";

const SummaryContainer: FC = () => {
  const { budgetData, balanceData, isLoading } = useGetBudget();

  const rowData = renderSummaryRows({
    budgetData: budgetData?.data!,
    balanceData: balanceData?.data!,
  });

  return (
    <Suspense fallback={<>loading...</>}>
      <MainLayout>
        <section className="flex flex-col space-y-6 py-2">
          <Input placeholder="Search..." className="w-[300px] h-[36px]" />
          <Table
            columns={renderSummaryColumns}
            rows={rowData!}
            isLoading={isLoading}
          />
        </section>
      </MainLayout>
    </Suspense>
  );
};

export default SummaryContainer;
