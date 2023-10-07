import { Skeleton } from "@/components";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton as ShadSkeleton } from "@/components/ui/skeleton";
import React, { FC } from "react";

type SummaryCardLoaderProps = {
  renderSkeleton: JSX.Element[];
};

const SummaryCardLoader: FC<SummaryCardLoaderProps> = ({ renderSkeleton }) => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <Skeleton isShow />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-start space-x-2">
          <ShadSkeleton className="h-10 w-10 rounded-full" />
          <div className="flex-col w-full space-y-2">
            <React.Fragment>{renderSkeleton}</React.Fragment>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCardLoader;
