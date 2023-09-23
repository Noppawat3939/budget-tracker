import { TableColumns } from "../type";

type MockTableRows = Record<string, string>[];

export const renderSkeletonTableRow = (columns: TableColumns) => {
  const mockRows = Array.from({
    length: columns.length,
  }).fill({
    render1: "mock",
    render2: "mock",
    render3: "mock",
    render4: "mock",
  }) as MockTableRows;

  return mockRows;
};
