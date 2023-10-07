"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut as ChartDoughnut } from "react-chartjs-2";
import { DoughnutProps } from "./type";

export default function Doughnut({
  data,
  width,
  height,
  isShowLegend = true,
  ...divProps
}: DoughnutProps) {
  isShowLegend
    ? ChartJS.register(ArcElement, Tooltip, Legend)
    : ChartJS.register(ArcElement, Tooltip);

  return (
    <div {...divProps}>
      <ChartDoughnut data={data} width={width} height={height} />
    </div>
  );
}
