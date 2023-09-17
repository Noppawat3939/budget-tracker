import { isArray } from "lodash";

type TCalChartDoughnutColor = {
  amount: number | number[];
  income: number;
};

export const calChartDoughnutColor = ({
  amount,
  income,
}: TCalChartDoughnutColor) => {
  if (isArray(amount)) {
    return amount.map(
      (num) => `rgba(82, 113, 255, ${((+num / income) * 2).toFixed(2)})`
    );
  }

  return `rgba(82, 1113, 255, ${amount / income})`;
};
