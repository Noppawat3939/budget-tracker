import React, { type FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

type Data = ChartData<"line", number[], string>;

type TrackingLineChartProps = {
  data: Data;
};

const TrackingLineChart: FC<TrackingLineChartProps> = ({ data }) => {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          //TODO: handle this props
          stepSize: 2000,
          callback: (val: unknown) => {
            return val ? `${(val as number) / 1000}k` : "0";
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.65,
      },
    },
    plugins: {
      filler: {
        propagate: false,
      },
    },
    interaction: {
      intersect: true,
    },
  };

  return <Line options={options} data={data} />;
};

export default TrackingLineChart;
