export type Columns = "date" | "income" | "expense" | "balance";

export type SummaryColumns = {
  label: string;
  key: Columns;
}[];

export type TRows<T extends string> = Partial<
  Record<T, string | number | React.ReactNode>
>[];

export type SummaryRowsData = TRows<Columns>;
