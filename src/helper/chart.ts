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
      (num) => `rgba(0, 125, 240, ${((+num / income) * 3).toFixed(2)})`
    );
  }

  return `rgba(82, 1113, 255, ${amount / income})`;
};
