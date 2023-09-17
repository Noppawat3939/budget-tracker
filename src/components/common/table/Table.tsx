import React, { FC } from "react";

import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Table } from "./type";
import { Skeleton } from "@/components/ui/skeleton";

type MockTableRows = Record<string, string>[];

const Table: FC<Table> = ({ columns, rows, isLoading }) => {
  const mockRows = Array.from({
    length: columns.length,
  }).fill({
    render1: "mock",
    render2: "mock",
    render3: "mock",
    render4: "mock",
  }) as MockTableRows;

  return (
    <ShadTable className="border">
      <TableHeader className="border bg-slate-50">
        {columns?.map((column) => (
          <TableHead key={column.key}>{column.label}</TableHead>
        ))}
      </TableHeader>
      <TableBody>
        {isLoading &&
          mockRows.map((row, idx) => (
            <TableRow key={idx} className="border">
              {Object.values(row).map((_, idx) => (
                <TableCell key={idx}>
                  <Skeleton className="h-4" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        {!isLoading &&
          rows?.map((row, rowIndex) => (
            <TableRow key={`row_${rowIndex}`}>
              {Object.values(row).map((key, index) => (
                <TableCell key={index}>{key}</TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </ShadTable>
  );
};

export default Table;
