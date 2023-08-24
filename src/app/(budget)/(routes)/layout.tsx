"use client";
import React from "react";
import { MainNavbar } from "@/components";

type BudgetLayout = {
  children: React.ReactNode;
};

export default function BudgetLayout({ children }: BudgetLayout) {
  return (
    <>
      <MainNavbar />
      {children}
    </>
  );
}
