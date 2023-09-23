export type TableColumns = { key: string; label: string }[];
type RowData = Partial<Record<string, string | number | React.ReactNode>>;
type TableRows = RowData[];

export type Table = {
  columns: TableColumns;
  rows: TableRows;
  isLoading?: boolean;
  onRowClick?: (rowData: RowData) => void;
};
