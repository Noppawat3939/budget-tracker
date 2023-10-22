export type PercentageData = { label: string; value: number }[];

export type SummaryByPercentageProps = {
  data: PercentageData;
  total: number;
  isLoading: boolean;
};
