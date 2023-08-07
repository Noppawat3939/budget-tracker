"use client";
import { MainLayout } from "@/components";
import React, { ChangeEventHandler, useCallback, useState } from "react";
import {
  CreateBudgetDetailForm,
  CreateIncomeForm,
  DoughnutCard,
  SummaryCard,
} from "./components";
import { TBudget } from "@/types";
import { useMounted } from "@/hooks";
import { isEmpty } from "lodash";
import { calChartDoughnutColor, formatDate, onlyNumber } from "@/helper";
import { SelectSingleEventHandler } from "react-day-picker";

const data = {
  labels: ["Housing", "Food and drink", "Travel"],
  datasets: [
    {
      label: "# of Votes",
      data: [8500, 12000, 5000],
      backgroundColor: calChartDoughnutColor({
        amount: [8500, 12000, 5000],
        income: 30000,
      }),
    },
  ],
};

const summaryList: {
  order: string;
  price: number;
  type: TBudget;
  description?: string;
}[] = [
  { order: "Housing", price: 8500, type: "income", description: "lorem" },
  {
    order: "Food and drink",
    price: 12000,
    type: "expend",
    description: "lorem",
  },
  { order: "Travel", price: 5000, type: "expend", description: "lorem" },
  { order: "Balance", price: 6000, type: "balance" },
];

export default function CreateBudget() {
  const isMounted = useMounted();
  const [isStarted, setIsStarted] = useState(false);

  const [incomeValues, setIncomeValues] = useState<{
    income: string;
    date: Date | undefined;
  }>({
    income: "",
    date: undefined,
  });

  const onIncomeChanged: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { value } = e.target;
      const incomeFormatted = onlyNumber(value);

      setIncomeValues((prev) => ({
        ...prev,
        income: incomeFormatted,
      }));
    },
    []
  );

  const onSelectDateIncome = useCallback((date: Date) => {
    const dateFormatted = formatDate(date) as unknown as Date;

    setIncomeValues((prev) => ({ ...prev, date: dateFormatted }));
  }, []) as SelectSingleEventHandler;

  return (
    <MainLayout>
      CreateBudget page
      <section className="flex space-x-5 items-center justify-between h-fit mb-5">
        <DoughnutCard data={data} />
        <SummaryCard
          end={isStarted && incomeValues.income ? +incomeValues.income : 30000}
          isMounted={isMounted}
          data={summaryList}
        />
      </section>
      {!isStarted ? (
        <CreateIncomeForm
          onSelectDate={onSelectDateIncome}
          date={incomeValues.date}
          income={incomeValues.income}
          onChange={onIncomeChanged}
          isDisabled={isEmpty(incomeValues.date && incomeValues.income)}
          onSubmit={() => setIsStarted(true)}
        />
      ) : (
        <CreateBudgetDetailForm />
      )}
    </MainLayout>
  );
}
