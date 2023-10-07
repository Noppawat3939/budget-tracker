import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CountUp from "react-countup";
import { priceFormatter } from "@/helper";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

import Expense from "@/assets/images/expense.png";
import type { SummaryCardProps } from "./type";

export default function SummaryCard({
  end,
  start,
  isMounted,
  data,
}: SummaryCardProps) {
  return (
    <Card className="w-full h-[398px]">
      <CardHeader>
        <p aria-label="available-amount">Available amount</p>
        <CardTitle className="text-4xl">
          <CountUp
            duration={0.5}
            start={start || 0}
            decimals={2}
            suffix=" ฿"
            end={end}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.map(({ order, price, type, description }, index) => (
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
              <div className="flex-col items-left">
                <p
                  className={`${isMounted ? "flex" : "hidden"}`}
                  about="budget-order"
                >
                  {order}
                </p>
                <p
                  about="budget-description"
                  className={`${
                    isMounted ? "flex" : "hidden"
                  } text-slate-400 text-xs`}
                >
                  {description}
                </p>
              </div>
            </div>
            <Skeleton
              className={`${isMounted ? "hidden" : "block"} w-[100px] h-[20px]`}
            />
            <p
              className={`${isMounted ? "flex" : "hidden"} font-medium`}
              about="price-order"
            >
              {priceFormatter(price)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
