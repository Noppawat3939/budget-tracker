import React, { FC } from "react";
import { TrackingLineChart } from "..";
import { useTrackingChart } from "@/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IFExpenseData } from "@/types";
import { numberFormatter, toCapitalize } from "@/helper";

type RenderTrackingComponentsProps = {
  trackingChart: { value: number; date: string; expense: string }[];
  topExpenses: (IFExpenseData & {
    budgetId: string;
  })[];
};

const RenderTrackingComponents: FC<RenderTrackingComponentsProps> = ({
  trackingChart,
  topExpenses,
}) => {
  const { chartData } = useTrackingChart(trackingChart);

  return (
    <main>
      <div className="flex max-w-[90%] h-[400px] mx-auto">
        <TrackingLineChart data={chartData} />
      </div>

      <div className="flex space-x-4 px-[5%] mt-[5%]">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>
              {topExpenses.length >= 3 ? `Top 3 spending` : "Top spending"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topExpenses
              .slice(0, topExpenses.length >= 3 ? 3 : topExpenses.length)
              .map(({ expense, value, expenseId }) => (
                <div className="flex justify-between" key={expenseId}>
                  <p>{toCapitalize(expense)}</p>
                  <p>{numberFormatter(value)} ฿</p>
                </div>
              ))}
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Total spending</CardTitle>
          </CardHeader>
          <CardContent>
            <p>current month: 123123 baht</p>
            <p>previous month: 100000 baht</p>
            <p>balance: + 2000 baht</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default RenderTrackingComponents;
