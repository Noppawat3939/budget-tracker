import React, { type FC } from "react";
import { SummaryByPercentage, SummaryTotal } from "..";
import type { PercentageData, SummaryInfoProps } from "./type";

const SummaryInfo: FC<SummaryInfoProps> = ({
  isLoading,
  icon,
  hasPositiveDirection,
  total,
  isFilterIncome,
  selectedFilter,
  average,
  isSuccess,
  percentageExpenses,
  percentageIncomes,
  totalExpenses,
  totalIncomes,
}) => {
  return (
    <section
      about="summary-info-section"
      className="flex w-[60%] max-w-[600px]  mx-auto flex-col justify-between"
    >
      <div className="flex flex-col">
        <p
          className={`text-[14px] text-slate-500 ${
            isSuccess ? "block" : "hidden"
          }`}
        >
          {`You have an average ${selectedFilter} of `}
          <span
            className={`${
              isFilterIncome ? "text-green-600" : "text-red-600"
            } font-medium`}
          >
            {average}
          </span>{" "}
          per month.
        </p>
        <ul className="my-2 max-h-[200px] pr-3 py-1 overflow-y-auto">
          {isFilterIncome ? (
            <SummaryByPercentage
              isLoading={isLoading}
              data={percentageIncomes as PercentageData}
              total={totalIncomes}
            />
          ) : (
            <SummaryByPercentage
              isLoading={isLoading}
              data={percentageExpenses as PercentageData}
              total={totalExpenses}
            />
          )}
        </ul>
      </div>
      <SummaryTotal
        isLoading={isLoading}
        summary={total}
        icon={icon}
        hasPositiveDirection={hasPositiveDirection}
      />
    </section>
  );
};

export default SummaryInfo;
