"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut as ChartDoughnut } from "react-chartjs-2";
import { DoughnutProps } from "./type";

export default function Doughnut({
  data,
  width,
  height,
  ...divProps
}: DoughnutProps) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <div {...divProps}>
      <ChartDoughnut data={data} width={width} height={height} />
    </div>
  );
}
