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
      (num) => `rgba(155, 102, 255, ${(+num / income).toFixed(3)})`
    );
  }

  return `rgba(155, 102, 255, ${amount / income})`;
};
