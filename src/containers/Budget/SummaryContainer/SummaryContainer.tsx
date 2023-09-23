"use client";
import React, { Suspense, type FC } from "react";

import { MainLayout, Table } from "@/components";
import { useGetBudget } from "@/hooks";
import { renderSummaryRows, renderSummaryColumns } from "./utils";
import { Input } from "@/components/ui/input";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import type { RowData } from "./types";

const SummaryContainer: FC = () => {
  const { push } = useRouter();
  const { budgetData, balanceData, isLoading } = useGetBudget();

  const rowData = renderSummaryRows({
    budgetData: budgetData?.data!,
    balanceData: balanceData?.data!,
  });

  const onRow = (rowData: RowData) => {
    const [dateString] = dayjs(rowData.date).toISOString().split("T");

    const foundData = budgetData?.data.find(
      (data) =>
        dateString ===
        dayjs(data.createdAt).add(-1, "day").toISOString().split("T").at(0)
    );

    push(`/summary/query?=${foundData?.budgetId}`);
  };

  return (
    <Suspense fallback={<>loading...</>}>
      <MainLayout>
        <section className="flex flex-col space-y-6 py-2">
          <Input placeholder="Search..." className="w-[300px] h-[36px]" />
          <Table
            columns={renderSummaryColumns}
            rows={rowData!}
            isLoading={isLoading}
            onRowClick={(data) => onRow(data as RowData)}
          />
        </section>
      </MainLayout>
    </Suspense>
  );
};

export default SummaryContainer;
