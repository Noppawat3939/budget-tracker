import { Doughnut } from "@/components";
import { DoughnutChart } from "@/types";
import React, { FC } from "react";

type SummaryDoughnutChartProps = {
  chartData: DoughnutChart;
};

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
