import React, { type FC } from "react";
import type { SummaryDoughnutChartProps } from "./type";
import { Doughnut } from "@/components";

const SummaryDoughnutChart: FC<SummaryDoughnutChartProps> = ({ chartData }) => {
  return (
    <React.Fragment>
      <Doughnut
        data={chartData}
        className="w-[350px] h-[350px]"
        isShowLegend={false}
      />
    </React.Fragment>
  );
};

export default SummaryDoughnutChart;
