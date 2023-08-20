import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { useUser } from "@/hooks";
import { isEmpty } from "lodash";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const { data } = useUser();

  return (
    <nav className="sticky top-0">
      <div className="px-[4%] py-[10px] w-full flex items-center justify-between">
        <p>Logo</p>
        <div className="flex items-center space-x-10">
          {isEmpty(data) && (
            <Link href={ROUTES.AUTH.LOGIN} className="text-slate-500 text-sm">
              Login
            </Link>
          )}
          <Link href={ROUTES.BUDGET.CREATE}>
            <Button size="sm">
              Try free <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
