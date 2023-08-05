import React from "react";
import type { MainLayoutProps } from "./type";

export default function MainLayout({ children }: MainLayoutProps) {
  return <main className="h-screen max-w-[90%] m-auto">{children}</main>;
}
