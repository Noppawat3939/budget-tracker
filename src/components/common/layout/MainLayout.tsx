import React from "react";
import type { MainLayoutProps } from "./type";

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="h-[90vh] max-w-[1280px] mx-auto px-[3%]">{children}</main>
  );
}
