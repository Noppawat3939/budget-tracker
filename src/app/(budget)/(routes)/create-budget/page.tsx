"use client";
import { MainLayout } from "@/components";
import React, { useLayoutEffect, useState } from "react";
import { DoughnutCard, SummaryCard } from "./components";
import { TBudget } from "@/types";

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
      ],
    },
  ],
};

const summaryList: { label: string; price: number; type: TBudget }[] = [
  { label: "Housing", price: 8500, type: "income" },
  { label: "Food and categories", price: 12000, type: "expend" },
  { label: "Travel", price: 5000, type: "expend" },
  { label: "Balance", price: 6000, type: "balance" },
];

export default function CreateBudget() {
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    if (!mounted) setTimeout(() => setMounted(true), 750);
  }, []);

  return (
    <MainLayout>
      CreateBudget page
      <section className="flex space-x-5 items-center justify-between h-fit">
        <DoughnutCard data={data} />
        <SummaryCard end={30000} isMounted={mounted} data={summaryList} />
      </section>
    </MainLayout>
  );
}
