import { calChartDoughnutColor } from "@/helper";
import { TBudget } from "@/types";

export const DEFAULT_SUMMARY_LIST: {
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
  { order: "Balance", price: 4500, type: "balance" },
];

export const DEFAULT_CHART_DATA = {
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
