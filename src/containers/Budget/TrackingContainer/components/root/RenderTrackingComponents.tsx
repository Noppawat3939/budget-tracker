import React, { type FC, Fragment } from "react";
import { TrackingLineChart } from "..";
import { useRenderSkeleton, useTrackingChart } from "@/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { numberFormatter, toCapitalize } from "@/helper";
import { FIRST_INDEX } from "@/constants";
import type { RenderTrackingComponentsProps, TotalSpendLabel } from "./type";

const totalLabel: TotalSpendLabel[] = ["current", "previous", "balance"];

const MAX_TOP_SPENDING = 3;

const RenderTrackingComponents: FC<RenderTrackingComponentsProps> = ({
  trackingChart,
  expenses,
  total,
  loading,
}) => {
  const { renderSkeleton } = useRenderSkeleton({
    length: 3,
    isShow: loading.expenses || loading.getTotal,
  });
  const { chartData } = useTrackingChart(trackingChart);

  return (
    <main>
      <div className="flex max-w-[90%] h-[400px] mx-auto">
        <TrackingLineChart data={chartData} />
      </div>

      <div className="flex space-x-4 px-[5%] mt-[5%]">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle aria-label="expenses-title">
              {expenses.length >= MAX_TOP_SPENDING
                ? `Top 3 spending`
                : "Top spending"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading.expenses ? (
              <Fragment>{renderSkeleton}</Fragment>
            ) : (
              expenses
                .slice(
                  FIRST_INDEX,
                  expenses.length >= MAX_TOP_SPENDING
                    ? MAX_TOP_SPENDING
                    : expenses.length
                )
                .map(({ expense, value, expenseId }) => (
                  <div className="flex justify-between mb-2" key={expenseId}>
                    <p aria-label="expense-label" className="font-medium">
                      {toCapitalize(expense)}
                    </p>
                    <p aria-label="expense-value" className="text-[17px]">
                      {numberFormatter(value)} ฿
                    </p>
                  </div>
                ))
            )}
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Total spending</CardTitle>
          </CardHeader>
          <CardContent>
            {totalLabel.map((key) => (
              <div className="flex items-center justify-between mb-2" key={key}>
                {loading.getTotal ? (
                  <Fragment>{renderSkeleton}</Fragment>
                ) : (
                  <Fragment>
                    <p
                      aria-label={`total-${key}-spending-label`}
                      className="font-medium"
                    >{`${
                      key === "balance"
                        ? toCapitalize(key)
                        : `${toCapitalize(key)} month`
                    }:`}</p>
                    <p
                      aria-label={`total-${key}-spending-value`}
                      className="text-gray-700 text-[17px]"
                    >{`${numberFormatter(total[key])} ฿`}</p>
                  </Fragment>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default RenderTrackingComponents;
