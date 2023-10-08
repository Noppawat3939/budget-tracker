import { toPercent } from "@/helper";
import { useRenderSkeleton } from "@/hooks";
import React, { FC } from "react";

type SummaryByPercentageProps = {
  data: { label: string; value: number }[];
  total: number;
  isLoading: boolean;
};

const SummaryByPercentage: FC<SummaryByPercentageProps> = ({
  data,
  total,
  isLoading,
}) => {
  const { renderSkeleton } = useRenderSkeleton({
    isShow: isLoading,
    length: 4,
  });

  if (isLoading)
    return <div className="flex flex-col gap-y-4">{renderSkeleton}</div>;

  return (
    <React.Fragment>
      {data.map(({ label, value }, idx) => (
        <li
          className="flex justify-between items-center py-1 px-3 border border-slate-100 rounded-sm mb-2 transition-all duration-300 hover:bg-slate-50"
          key={idx}
        >
          <p aria-label="budget-label" className="text-lg font-medium">
            {label}
          </p>
          <p aria-label="budget-value" className="text-lg font-semibold">
            {toPercent(value, total)}
          </p>
        </li>
      ))}
    </React.Fragment>
  );
};

export default SummaryByPercentage;
