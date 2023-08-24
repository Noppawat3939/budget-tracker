"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Banner } from "./components";
import { MainLayout, MainNavbar } from "@/components";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants";

function RootPage() {
  return (
    <>
      <MainNavbar />
      <MainLayout>
        <Banner />
        <section className="flex flex-col items-center w-full">
          <Link href={ROUTES.BUDGET.CREATE}>
            <Button size="sm">
              Try free <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        </section>
      </MainLayout>
    </>
  );
}

export default RootPage;
