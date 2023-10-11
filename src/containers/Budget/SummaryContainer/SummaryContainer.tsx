"use client";
import React, { useState } from "react";

import { MainLayout, Select, Table } from "@/components";
import { useGetBudgetList } from "@/hooks";
import { renderSummaryRows, renderSummaryColumns } from "./utils";
import { Input } from "@/components/ui/input";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import type { RowData } from "./types";
import { EMPTY_ARRAY } from "@/constants";

const FILTER_OPTIONS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Current Month",
    value: "currentMonth",
  },
];

type FilterSummary = "all" | "currentMonth";

const SummaryContainer = () => {
  const { push } = useRouter();

  const { balanceData, budgetData, isLoading } = useGetBudgetList();

  const [filterSummary, setFilterSummary] = useState<FilterSummary>("all");

  const rowData = renderSummaryRows({
    budgetData: budgetData!,
    balanceData: balanceData!,
  });

  const currentMonth = rowData?.filter((data) => {
    const [_, m, y] = data.date.split(" ");

    if (`${m} ${y}` === dayjs().format("MMM YYYY")) return data;
  });

  const renderRows = {
    all: rowData,
    currentMonth,
  };

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
        <div className="flex items-center justify-between">
          <Input placeholder="Search..." className="w-[300px] h-[36px]" />
          <Select
            options={FILTER_OPTIONS}
            isShowFilterIcon
            defaultValue={filterSummary}
            onValueChange={(selectedFilter) =>
              setFilterSummary(selectedFilter as FilterSummary)
            }
          />
        </div>
        <div className="max-h-[75vh] overflow-y-auto">
          <Table
            columns={renderSummaryColumns}
            rows={renderRows[filterSummary] ?? EMPTY_ARRAY}
            isLoading={isLoading}
            onRowClick={(data) => onRow(data as RowData)}
          />
        </div>
      </section>
    </MainLayout>
  );
};

export default SummaryContainer;
