import { ChartData } from "chart.js";

type Data = ChartData<"line", number[], string>;

export type TrackingLineChartProps = {
  data: Data;
};
