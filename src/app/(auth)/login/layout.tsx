/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Link from "next/link";
import React from "react";
import { useProtectedRoute, useUser } from "@/hooks";
import { isEmpty } from "lodash";
import { LayoutProps } from "@/types";
import DarkLogo from "@/assets/logo/dark-logo.png";
import Image from "next/image";

export default function LoginLayout({ children }: LayoutProps) {
  const { data } = useUser();

  useProtectedRoute();

  return (
    <>
      <nav className="sticky top-0 bg-white">
        <div className="flex items-center justify-between px-[4%] py-[10px] w-full">
          <Link href="/">
            <Image
              src={DarkLogo}
              alt="logo"
              className="w-[48px] h-[40px] object-cover rounded-md"
            />
          </Link>
        </div>
      </nav>
      {!isEmpty(data) ? <></> : <>{children}</>}
    </>
  );
}
