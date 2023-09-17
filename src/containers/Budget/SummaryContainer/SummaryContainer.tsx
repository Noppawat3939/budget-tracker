"use client";
import React, { type FC } from "react";

import { MainLayout, Table } from "@/components";
import { useGetBudget } from "@/hooks";
import { renderSummaryRows, renderSummaryColumns } from "./utils";

const SummaryContainer: FC = () => {
  const { data } = useGetBudget();

  const rowData = renderSummaryRows(data!);

  return (
    <MainLayout>
      <Table columns={renderSummaryColumns} rows={rowData!} />
    </MainLayout>
  );
};

export default SummaryContainer;
