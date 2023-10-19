import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { memo } from "react";
import { FiInbox } from "react-icons/fi";

const BudgetNotFound = () => {
  return (
    <Card className="w-full h-[398px]">
      <CardContent className="text-gray-400 flex justify-center gap-y-2 items-center flex-col h-full">
        <CardTitle className="font-medium">No expense data</CardTitle>
        <FiInbox className="w-8 h-8" />
      </CardContent>
    </Card>
  );
};

export default memo(BudgetNotFound);
