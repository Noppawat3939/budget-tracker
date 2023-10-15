import React, { type FC } from "react";
import { FiMoreVertical } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import type { DropdownProps } from "./type";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Dropdown: FC<DropdownProps> = ({ items, disabled, onSelected }) => {
  return (
    <Popover>
      <PopoverTrigger
        asChild
        disabled={disabled}
        className="disabled:opacity-25"
      >
        <Button
          type="button"
          variant="ghost"
          className="h-6 w-6 p-0 rounded-full"
        >
          <FiMoreVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit p-0">
        <ul>
          {items.map((item) => (
            <li
              key={item}
              onClick={() => onSelected?.(item)}
              className="text-slate-700 capitalize text-[13px] cursor-pointer transition-all duration-300 hover:bg-slate-100 px-3 py-2"
            >
              {item}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default Dropdown;
