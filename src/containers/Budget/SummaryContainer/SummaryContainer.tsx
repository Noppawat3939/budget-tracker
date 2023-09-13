"use client";
import React, { type FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MainLayout } from "@/components";
import { useGetBudget } from "@/hooks";
import { formatDate } from "@/helper";

type Columns = "date" | "income" | "expense" | "balance";
type SummaryColumns = {
  label: string;
  key: Columns;
}[];

type TRows<T extends string> = Partial<
  Record<T, string | number | React.ReactNode>
>[];

type SummaryRows = TRows<Columns>;

const SummaryContainer: FC = () => {
  const { data } = useGetBudget();

  // TODO: move this into utils
  const mapRows: SummaryRows = data!?.data.map((_data) => ({
    date: formatDate(_data.createdAt, "DD MMM YYYY"),
    income:
      _data.incomes.map((income) => income.income).length > 1
        ? _data.incomes.map((income) => income.income).join(",")
        : _data.incomes.map((income) => income.income).toString(),
    expense:
      _data.expenses.map((expense) => expense.expense).length > 1
        ? _data.expenses.map((expense) => expense.expense).join(",")
        : _data.expenses.map((expense) => expense.expense).toString(),
    balance: 0,
  }));

  const Columns: SummaryColumns = [
    {
      label: "Date",
      key: "date",
    },
    {
      label: "Income",
      key: "income",
    },
    {
      label: "Expense",
      key: "expense",
    },
    {
      label: "Cash Balance",
      key: "balance",
    },
  ];

  return (
    <MainLayout>
      <Table>
        <TableHeader>
          {Columns.map((col) => (
            <TableHead key={col.key}>{col.label}</TableHead>
          ))}
        </TableHeader>
        <TableBody>
          {mapRows?.map((row, idx) => (
            <TableRow key={idx}>
              {Object.values(row).map((key, id) => (
                <TableCell key={id}>{key}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </MainLayout>
  );
};

export default SummaryContainer;
