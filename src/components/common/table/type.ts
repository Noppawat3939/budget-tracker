type TableColumns = { key: string; label: string }[];
type TableRows = Partial<Record<string, string | number | React.ReactNode>>[];

export type Table = {
  columns: TableColumns;
  rows: TableRows;
  isLoading?: boolean;
};
