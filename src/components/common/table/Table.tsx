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
import { renderSkeletonTableRow } from "./mock";

const Table: FC<Table> = ({ columns, rows, isLoading, onRowClick }) => {
  const renderSkeletonRow = renderSkeletonTableRow(columns);

  return (
    <ShadTable className="border">
      <TableHeader className="border bg-slate-50">
        {columns?.map((column) => (
          <TableHead key={column.key}>{column.label}</TableHead>
        ))}
      </TableHeader>
      <TableBody>
        {isLoading &&
          renderSkeletonRow.map((row, idx) => (
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
            <TableRow key={`row_${rowIndex}`} onClick={() => onRowClick?.(row)}>
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
