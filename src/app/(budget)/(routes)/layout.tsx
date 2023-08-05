import { ROUTES } from "@/constants";
import Link from "next/link";
import React from "react";

type BudgetLayout = {
  children: React.ReactNode;
};

export default function BudgetLayout({ children }: BudgetLayout) {
  return (
    <>
      <nav className="sticky top-0 bg-white">
        <div className="flex items-center justify-between px-[4%] py-[10px] w-full">
          <Link href="/">
            <p>Logo</p>
          </Link>
          <Link href={ROUTES.AUTH.LOGIN} className="text-slate-500 text-sm">
            Login
          </Link>
        </div>
      </nav>
      {children}
    </>
  );
}
