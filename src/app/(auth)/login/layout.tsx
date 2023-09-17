/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";
import React from "react";
import { useProtectedRoute, useUser } from "@/hooks";
import { isEmpty } from "lodash";
import { LayoutProps } from "@/types";

export default function LoginLayout({ children }: LayoutProps) {
  const { data } = useUser();

  useProtectedRoute();

  return (
    <>
      <nav className="sticky top-0 bg-white">
        <div className="flex items-center justify-between px-[4%] py-[10px] w-full">
          <Link href="/">
            <p>Logo</p>
          </Link>
        </div>
      </nav>
      {!isEmpty(data) ? <></> : <>{children}</>}
    </>
  );
}
