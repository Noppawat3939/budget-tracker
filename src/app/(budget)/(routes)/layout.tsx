"use client";
import { ROUTES } from "@/constants";
import { toSubString } from "@/helper";
import { useUser } from "@/hooks";
import { isEmpty } from "lodash";
import { LogIn } from "lucide-react";
import Link from "next/link";
import React from "react";

type BudgetLayout = {
  children: React.ReactNode;
};

export default function BudgetLayout({ children }: BudgetLayout) {
  const { data } = useUser();

  const renderRightNavbar = () => {
    if (isEmpty(data)) {
      return (
        <Link
          href={ROUTES.AUTH.LOGIN}
          className="text-slate-500 hover:text-slate-600 flex items-center text-sm"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Login
        </Link>
      );
    } else {
      return (
        <h1 className="text-slate-500 hover:text-slate-600 flex items-center text-sm">
          {toSubString(data.name, 10)}
        </h1>
      );
    }
  };

  return (
    <>
      <nav className="sticky top-0 bg-white">
        <div className="flex items-center justify-between px-[4%] py-[10px] w-full">
          <Link href="/">
            <p>Logo</p>
          </Link>
          {renderRightNavbar()}
        </div>
      </nav>
      {children}
    </>
  );
}
