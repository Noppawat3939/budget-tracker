"use client";

import React from "react";
import { MainLayout, Select, Table } from "@/components";
import { useHandleSummaryList } from "@/hooks";
import { renderSummaryRows, renderSummaryColumns } from "./utils";
import { Input } from "@/components/ui/input";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import type { RowData } from "./types";
import { EMPTY_ARRAY, FIRST_INDEX, INDEX_NOT_FOUND } from "@/constants";
import { FiSearch } from "react-icons/fi";
import { isEmpty } from "lodash";
import { numberFormatter } from "@/helper";

const FILTER_OPTIONS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "This month",
    value: "thisMonth",
  },
];

const SummaryContainer = () => {
  const { push } = useRouter();

  const {
    budgetData,
    balanceData,
    isLoading,
    debounceResponse: { onDebounce: onDebounceChange, debounceValue },
    filterResponse: { filter, onChange },
  } = useHandleSummaryList();

  const rowData = renderSummaryRows({ budgetData, balanceData });
  const sortedRowData = rowData?.sort((a, b) => b.date.localeCompare(a.date));

  const thisMonth = sortedRowData?.filter((data) => {
    const dateTableFormat = "MMM YYYY";

    const [_d, m, y] = data.date.split(" ");

    if (`${m} ${y}` === dayjs().format(dateTableFormat)) return data;
  });

  const renderRows = {
    all: sortedRowData,
    thisMonth,
  };

  const onRow = (rowData: RowData) => {
    const [dateString] = dayjs(rowData.date).toISOString().split("T");

    const balance = balanceData.find(
      (data) => numberFormatter(data.totalBalance) === rowData.balance
    );

    const foundData = budgetData
      ?.filter(
        (data) =>
          dateString ===
          dayjs(data.createdAt)
            .add(INDEX_NOT_FOUND, "day")
            .toISOString()
            .split("T")
            ?.at(FIRST_INDEX)
      )
      .find((item) => item.budgetId === balance?.budgetId);

    push(`/summary/query?=${foundData?.budgetId}`);
  };

  const isShowFooterTable = debounceValue && !isEmpty(budgetData);

  return (
    <MainLayout>
      <section className="flex flex-col space-y-6 py-2">
        <div className="flex items-center justify-between">
          <span className="flex relative">
            <Input
              placeholder="Search..."
              className="w-[300px] h-[36px]"
              onChange={onDebounceChange}
            />
          </span>
          <Select
            options={FILTER_OPTIONS}
            isShowFilterIcon
            defaultValue={filter}
            onValueChange={onChange}
          />
        </div>
        <div className="max-h-[75vh] overflow-y-auto">
          <Table
            columns={renderSummaryColumns}
            rows={renderRows[filter] ?? EMPTY_ARRAY}
            isLoading={isLoading}
            onRowClick={(data) => onRow(data as RowData)}
          />
        </div>

        {isShowFooterTable && (
          <div className="flex items-center space-x-2 mx-auto text-slate-300">
            <FiSearch className="w-6 h-6 " />
            <h1 className="text-sm">
              {budgetData.length === 1
                ? `found ${budgetData.length} item`
                : `found ${budgetData.length} items`}
            </h1>
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default SummaryContainer;
