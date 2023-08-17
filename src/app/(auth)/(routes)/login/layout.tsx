import Link from "next/link";
import React from "react";
import type { LoginLayout } from "./type";

export default function LoginLayout({ children }: LoginLayout) {
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
