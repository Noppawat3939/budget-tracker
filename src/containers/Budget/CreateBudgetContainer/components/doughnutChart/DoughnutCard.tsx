import { Doughnut } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import type { DoughnutCardProps } from "./type";

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
