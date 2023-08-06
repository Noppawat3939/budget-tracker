import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CountUp from "react-countup";
import { priceFormatter } from "@/helper";
import { Skeleton } from "@/components/ui/skeleton";
import { TBudget } from "@/types";
import Image from "next/image";

import Expense from "@/assets/images/expense.png";

type SummaryCardProps = {
  end: number;
  start?: number;
  isMounted: boolean;
  data: { label: string; price: number; type: TBudget }[];
};

export default function SummaryCard({
  end,
  start,
  isMounted,
  data,
}: SummaryCardProps) {
  return (
    <Card className="w-full h-[396px]">
      <CardHeader>
        <p>Available amount</p>
        <CardTitle className="text-4xl">
          <CountUp
            duration={0.5}
            start={start || 0}
            decimals={2}
            suffix="฿"
            end={end}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.map(({ label, price, type }, index) => (
          <div
            key={index}
            className={`flex justify-between items-center mb-3 pt-2  ${
              type === "balance" && isMounted ? "border-t" : "border-t-0 "
            }`}
          >
            <div className="flex space-x-3 items-center">
              <Image
                alt="expense-icon"
                src={Expense}
                className={`${
                  isMounted && type !== "balance" ? "flex" : "hidden"
                } object-cover bg-slate-100 h-8 w-8 rounded-full p-1`}
              />
              <Skeleton
                className={`${
                  isMounted ? "hidden" : "block"
                } w-[300px] h-[20px]`}
              />
              <p className={`${isMounted ? "flex" : "hidden"}`}>{label}</p>
            </div>
            <Skeleton
              className={`${isMounted ? "hidden" : "block"} w-[100px] h-[20px]`}
            />
            <p className={`${isMounted ? "flex" : "hidden"} font-medium`}>
              {priceFormatter(price)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
