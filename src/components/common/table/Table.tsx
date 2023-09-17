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

const Table: FC<Table> = ({ columns, rows }) => {
  return (
    <ShadTable>
      <TableHeader className="border bg-slate-100">
        {columns?.map((column) => (
          <TableHead key={column.key}>{column.label}</TableHead>
        ))}
      </TableHeader>
      <TableBody>
        {rows?.map((row, rowIndex) => (
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
