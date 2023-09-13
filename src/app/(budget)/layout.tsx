"use client";

import { MainNavbar } from "@/components";
import { LayoutProps } from "@/types";
import React, { type FC } from "react";

const BudgetLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <MainNavbar />
      {children}
    </React.Fragment>
  );
};

export default BudgetLayout;
