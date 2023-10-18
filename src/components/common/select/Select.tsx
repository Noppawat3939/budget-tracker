"use client";

import React, { FC } from "react";
import {
  Select as ShadSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SelectedProps } from "./type";

import { BiFilter } from "react-icons/bi";

const Select: FC<SelectedProps> = ({
  onValueChange,
  options,
  selectLabel,
  defaultValue,
  isShowFilterIcon = false,
  disabled = false,
}) => {
  return (
    <ShadSelect
      value={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-[130px] text-[12px]">
        {isShowFilterIcon && <BiFilter className="w-5 h-5 text-slate-600" />}
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-[12px]">
            {selectLabel || "Filter by"}
          </SelectLabel>
          {options.map(({ label, value }) => (
            <SelectItem
              value={value}
              key={value}
              className="cursor-pointer text-[12px]"
            >
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </ShadSelect>
  );
};

export default Select;
