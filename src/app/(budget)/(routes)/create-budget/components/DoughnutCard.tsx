import { Doughnut } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartData } from "chart.js";
import React from "react";

type DoughnutCardProps = {
  data: ChartData<"doughnut", number[], string>;
};

export default function DoughnutCard({ data }: DoughnutCardProps) {
  return (
    <Card className="w-full">
      <CardContent>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <Doughnut data={data} className="w-[300px] h-auto" />
      </CardContent>
    </Card>
  );
}
