import { DEFAULT_VALUE_NUMBER, PERCENT } from "@/constants";
import { toPercent } from "@/helper";
import type { TCreateBudget } from "@/types";

export const renderChartBackground = (key: TCreateBudget, values: number[]) => {
  const total = values.reduce((pre, cur) => pre + cur, DEFAULT_VALUE_NUMBER);
  const ADDED_INTENSE = 2;

  if (key === "income")
    return values.map(
      (val) =>
        `rgba(27,156,135,${String(
          (+toPercent(val, total).replaceAll(" %", "") / PERCENT) *
            ADDED_INTENSE
        )})`
    );

  return values.map(
    (val) =>
      `rgba(199,0,57,${String(
        (+toPercent(val, total).replaceAll(" %", "") / PERCENT) * ADDED_INTENSE
      )})`
  );
};
