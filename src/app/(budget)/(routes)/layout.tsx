"use client";
import { ROUTES } from "@/constants";
import { toCapitalize } from "@/helper";
import { useUser } from "@/hooks";
import { eq, isEmpty } from "lodash";
import { LogIn } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, MainNavbar } from "@/components";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type BudgetLayout = {
  children: React.ReactNode;
};

type MenuSections = "top" | "mid" | "bottom";
type MenuSection = "name" | "email" | "settings" | "logout";

export default function BudgetLayout({ children }: BudgetLayout) {
  const { data } = useUser();

  const menuBar: {
    position: MenuSections;
    menus: { key: MenuSection; value?: string }[];
  }[] = [
    {
      position: "top",
      menus: [
        {
          key: "name",
          value: toCapitalize(data?.name!),
        },
        {
          key: "email",
          value: toCapitalize(data?.email!),
        },
      ],
    },
    {
      position: "mid",
      menus: [{ key: "settings", value: "Settings" }],
    },
    {
      position: "bottom",
      menus: [{ key: "logout", value: "Log out" }],
    },
  ];

  const renderRightNavbar = () => {
    if (isEmpty(data)) {
      return (
        <Link
          href={ROUTES.AUTH.LOGIN}
          className="text-slate-500 hover:text-slate-600 flex items-center text-sm"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Login
        </Link>
      );
    } else {
      return (
        <>
          <Popover>
            <PopoverTrigger>
              <Avatar src={data.profile} fallback={data?.name?.at(0)} />
            </PopoverTrigger>
            <PopoverContent align="end" className="w-fit p-0">
              {menuBar.map((menus) => (
                <div
                  key={`menus_${menus.position}`}
                  className="py-2 my-1 px-2 mx-1 cursor-pointer transition-all duration-200 hover:bg-slate-50 hover:rounded-md"
                >
                  {menus.menus.map((menu) => {
                    return (
                      <>
                        <p
                          className={`text-sm ${
                            eq(menu.key, "email") && "text-[13px] font-light"
                          } ${eq(menu.key, "name") && "font-medium"} `}
                          key={menu.key}
                        >
                          {menu.value}
                        </p>
                      </>
                    );
                  })}
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </>
      );
    }
  };

  return (
    <>
      {/* <nav className="sticky top-0 bg-white">
        <div className="flex items-center justify-between px-[4%] py-[10px] w-full">
          <Link href="/">
            <p>Logo</p>
          </Link>
          {renderRightNavbar()}
        </div>
      </nav> */}
      <MainNavbar />
      {children}
    </>
  );
}
