/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import type { LoginLayout } from "./type";
import { useUser } from "@/hooks";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";

const { BUDGET } = ROUTES;

export default function LoginLayout({ children }: LoginLayout) {
  const router = useRouter();
  const { data } = useUser();

  useEffect(() => {
    if (data?.data) {
      router.push(BUDGET.CREATE);
    }
  }, [data?.data]);

  return (
    <>
      <nav className="sticky top-0 bg-white">
        <div className="flex items-center justify-between px-[4%] py-[10px] w-full">
          <Link href="/">
            <p>Logo</p>
          </Link>
        </div>
      </nav>
      {children}
    </>
  );
}
