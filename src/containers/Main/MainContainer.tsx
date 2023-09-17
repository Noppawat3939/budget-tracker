import { MainLayout, MainNavbar } from "@/components";
import React from "react";
import { Banner } from "./components";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";

function MainContainer() {
  return (
    <main>
      <MainNavbar />
      <MainLayout>
        <Banner />
        <section className="flex flex-col items-center w-full">
          <Link href={ROUTES.BUDGET.CREATE}>
            <Button className="items-center flex">
              Try free <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        </section>
      </MainLayout>
    </main>
  );
}

export default MainContainer;
