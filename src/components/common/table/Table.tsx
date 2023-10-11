import React, { FC, Fragment } from "react";

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
import { isEmpty } from "lodash";
import { AiOutlineTable } from "react-icons/ai";

const Table: FC<Table> = ({ columns, rows, isLoading, onRowClick }) => {
  const renderSkeletonRow = renderSkeletonTableRow(columns);

  return (
    <Fragment>
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
          {!isLoading && isEmpty(rows) ? (
            <TableRow className="w-full" />
          ) : (
            rows?.map((row, rowIndex) => (
              <TableRow
                key={`row_${rowIndex}`}
                onClick={() => onRowClick?.(row)}
                className="cursor-pointer"
              >
                {Object.values(row).map((key, index) => (
                  <TableCell key={index}>{key}</TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </ShadTable>
      {!isLoading && isEmpty(rows) && (
        <div className="border-l border-r border-b w-full flex justify-center items-center py-8 text-slate-400 text-sm">
          <AiOutlineTable className="mr-2 w-6 h-6" />
          no data
        </div>
      )}
    </Fragment>
  );
};

export default Table;
