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
}) => {
  return (
    <ShadSelect onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[130px]">
        {isShowFilterIcon && <BiFilter className="w-5 h-5 text-slate-600" />}
        <SelectValue placeholder="Select" className="text-sm" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{selectLabel || "Filter by"}</SelectLabel>
          {options.map(({ label, value }) => (
            <SelectItem value={value} key={value} className="cursor-pointer">
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </ShadSelect>
  );
};

export default Select;
