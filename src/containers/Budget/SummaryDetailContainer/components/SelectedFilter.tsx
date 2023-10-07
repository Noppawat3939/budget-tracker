import React, { FC } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectedFilterProps = {
  options: { label: string; value: string }[];
  selectLabel?: string;
  defaultValue?: string;
  onValueChange: (value: string) => void;
};

const SelectedFilter: FC<SelectedFilterProps> = ({
  options,
  selectLabel,
  onValueChange,
  defaultValue,
}) => {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Select" />
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
    </Select>
  );
};

export default SelectedFilter;
