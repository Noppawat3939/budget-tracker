import { formatDate } from "@/helper";
import { ChartData, type ScriptableContext } from "chart.js";

type Data = ChartData<"line", number[], string>;
type Param = { value: number; date: string; expense: string }[];
type UseTrackingChart = (param: Param) => { chartData: Data };

const useTrackingChart: UseTrackingChart = (param) => {
  const sortedParam = param.sort((a, b) => a.date.localeCompare(b.date));

  const mapParam = {
    labels: sortedParam.map(({ expense }) => expense.toUpperCase()),
    values: sortedParam.map(({ value }) => value),
    // dates: sortedParam.map(({ date }) => formatDate(date, "D MMM")),
  };

  const chartData = (): Data => {
    return {
      labels: mapParam.labels,
      datasets: [
        {
          label: "(฿) ",
          data: mapParam.values,
          fill: "start",
          pointBorderWidth: 2,
          showLine: true,
          backgroundColor: (context: ScriptableContext<"line">) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 350);
            gradient.addColorStop(0, "rgba(199,0,57,0.6)");
            gradient.addColorStop(1, "rgba(199,0,57,0.05)");
            return gradient;
          },
          borderColor: "rgba(199,0,57,0.8)",
          pointBackgroundColor: "white",
          pointHoverBorderWidth: 1,
        },
        // {
        //   label: "Second dataset",
        //   data: [33, 25, 35, 51, 54, 76],
        //   fill: "start",
        //   borderColor: "#742774",
        // },
      ],
    };
  };

  return {
    chartData: chartData(),
  };
};

export default useTrackingChart;
