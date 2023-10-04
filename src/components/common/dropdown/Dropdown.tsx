import React, { FC } from "react";
import { FiMoreVertical } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { DropdownProps } from "./type";

const Dropdown: FC<DropdownProps> = ({ items, disabled }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className=" w-6 h-6 border-none rounded-full outline-none"
        disabled={disabled}
      >
        <Button
          variant="ghost"
          className="h-6 w-6 p-0 rounded-full"
          disabled={disabled}
        >
          <FiMoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
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

export default Dropdown;
