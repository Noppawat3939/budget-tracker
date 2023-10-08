import { SECOND_INDEX } from "@/constants";
import { toCapitalize } from "@/helper";
import { useRenderSkeleton } from "@/hooks";
import React, { FC } from "react";

type Total = "income" | "expense" | "balance";

type SummaryTotalProps = {
  summary: Record<Total, string>;
  icon: JSX.Element;
  hasGoodDirection: boolean;
  isLoading: boolean;
};

const SummaryTotal: FC<SummaryTotalProps> = ({
  summary,
  icon,
  hasGoodDirection,
  isLoading,
}) => {
  const { renderSkeleton } = useRenderSkeleton({
    length: Object.keys(summary).length,
    isShow: isLoading,
  });

  if (isLoading)
    return (
      <div className="flex flex-col gap-y-2 max-w-[250px]">
        {renderSkeleton}
      </div>
    );

  return (
    <div className="flex flex-col gap-y-1">
      {Object.keys(summary).map((key, keyIdx) => (
        <div
          className={`flex justify-between space-x-6 items-baseline w-[280px] ${
            keyIdx === Object.keys(summary).length - SECOND_INDEX
              ? "pb-2"
              : undefined
          }`}
          key={key}
        >
          <p className="text-slate-400 text-[14px]" aria-label="total-label">
            {`total ${toCapitalize(key)}:`}
          </p>
          <span className="flex space-x-2 items-center">
            {(key as Total) === "balance" && icon}
            <p
              aria-label="total-value"
              className={`text-[15px] font-medium ${
                (key as Total) === "balance"
                  ? hasGoodDirection
                    ? "text-green-600"
                    : "text-red-600"
                  : "text-slate-900"
              }`}
            >
              {summary[key as Total]}
            </p>
          </span>
        </div>
      ))}
    </div>
  );
};

export default SummaryTotal;
