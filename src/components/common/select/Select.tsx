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
import { FiMoreVertical } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type SelectProps = {
  items: string[];
  label?: string;
};

const Select: FC<SelectProps> = ({ items, label }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" w-6 h-6 border-none rounded-full outline-none">
        <Button variant="ghost" className="h-6 w-6 p-0 rounded-full ">
          <span className="sr-only">Open menu</span>
          <FiMoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {items.map((item) => (
            <DropdownMenuItem key={item} className="text-slate-700 capitalize">
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Select;
