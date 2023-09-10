import { Badge } from "@/components/ui/badge";
import { XCircle } from "lucide-react";
import React from "react";

type BadgeBudgetProps = {
  text: string;
  onClick?: () => void;
};

export default function BadgeBudget({ text, onClick }: BadgeBudgetProps) {
  return (
    <Badge
      variant="outline"
      className="flex text-gray-400 font-normal text-[11px] items-center hover:bg-slate-100"
    >
      {text}
      <XCircle
        onClick={onClick}
        className="h-3 w-3 ml-1 cursor-pointer text-gray-400"
      />
    </Badge>
  );
}
