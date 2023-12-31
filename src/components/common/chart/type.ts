import { ChartData } from "chart.js";

export type DoughnutProps = {
  data: ChartData<"doughnut", number[], string>;
  width?: number | string;
  height?: number | string;
  isShowLegend?: boolean;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
