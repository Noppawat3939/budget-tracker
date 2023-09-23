"use client";

import { SummaryDetailContainer } from "@/containers";
import React, { Suspense, type FC } from "react";

const SummaryByIdPage: FC = () => {
  return (
    <Suspense>
      <SummaryDetailContainer />
    </Suspense>
  );
};

export default SummaryByIdPage;
