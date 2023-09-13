import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants";
import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks";
import { isEmpty } from "lodash";
import { Avatar, MenuNavbar } from "../..";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { toCapitalize } from "@/helper";
import { MenuBarList, NavbarMenuList } from "@/types";
import { usePathname } from "next/navigation";

export default function MainNavbar() {
  const { data } = useUser();

  const pathName = usePathname();

  const menuBar: MenuBarList = [
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

  const navbarMenus: NavbarMenuList = [
    {
      key: "summary",
      label: "My Summary",
      url: ROUTES.BUDGET.SUMMARY,
    },
    {
      key: "create_budget",
      label: "Create budget",
      url: ROUTES.BUDGET.CREATE,
    },
  ];

  const renderRightMenu = () => {
    if (data && pathName !== ROUTES.MAIN) {
      return (
        <>
          <Popover>
            <PopoverTrigger>
              <Avatar src={data.profile} fallback={data?.name?.at(0)} />
            </PopoverTrigger>
            <PopoverContent align="end" className="w-fit p-0 mt-2">
              <MenuNavbar menuList={menuBar} />
            </PopoverContent>
          </Popover>
        </>
      );
    }
    if (pathName === ROUTES.MAIN) {
      return (
        <>
          {isEmpty(data) && (
            <>
              <Link
                href={ROUTES.AUTH.LOGIN}
                className="text-sm hover:opacity-50 transition-all duration-300"
              >
                Log in
              </Link>
              <Separator orientation="vertical" />
            </>
          )}

          <Link href={ROUTES.BUDGET.CREATE}>
            <Button size="sm">
              Try free <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        </>
      );
    }
  };

  return (
    <nav className="sticky top-0 bg-white">
      <div className="flex items-center py-4 justify-between px-[4%]">
        <Link href={ROUTES.MAIN} className="text-[20px] font-medium">
          Logo
        </Link>
        <div className="ml-10 flex space-x-4 w-full">
          {navbarMenus.map((menu) => (
            <Link
              key={menu.key}
              href={menu.url}
              className={`cursor-pointer ${
                pathName === menu.url ? "text-gray-800" : "text-gray-300"
              } hover:opacity-80 font-medium transition-all duration-200 text-sm`}
            >
              {menu.label}
            </Link>
          ))}
        </div>
        <div className="flex h-5 items-center space-x-3 text-sm">
          {renderRightMenu()}
        </div>
      </div>
    </nav>
  );
}
