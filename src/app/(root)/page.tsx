import React from "react";
import { Button } from "@/components/ui/button";
import { Banner } from "./components";
import { MainLayout, Navbar } from "@/components";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants";

function RootPage() {
  return (
    <>
      <Navbar />
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
