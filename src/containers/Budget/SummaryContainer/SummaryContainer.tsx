"use client";
import React, { Suspense } from "react";

import { MainLayout, Table } from "@/components";
import { useGetBudgetList } from "@/hooks";
import { renderSummaryRows, renderSummaryColumns } from "./utils";
import { Input } from "@/components/ui/input";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import type { RowData } from "./types";

const SummaryContainer = () => {
  const { push } = useRouter();

  const { balanceData, budgetData, isLoading } = useGetBudgetList();

  const rowData = renderSummaryRows({
    budgetData: budgetData!,
    balanceData: balanceData!,
  });

  const onRow = (rowData: RowData) => {
    const [dateString] = dayjs(rowData.date).toISOString().split("T");

    const foundData = budgetData?.find(
      (data) =>
        dateString ===
        dayjs(data.createdAt).add(-1, "day").toISOString().split("T").at(0)
    );

    push(`/summary/query?=${foundData?.budgetId}`);
  };

  return (
    <MainLayout>
      <section className="flex flex-col space-y-6 py-2">
        <Input placeholder="Search..." className="w-[300px] h-[36px]" />
        <div className="max-h-[75vh] overflow-y-auto">
          <Table
            columns={renderSummaryColumns}
            rows={rowData!}
            isLoading={isLoading}
            onRowClick={(data) => onRow(data as RowData)}
          />
        </div>
      </section>
    </MainLayout>
  );
};

export default SummaryContainer;
