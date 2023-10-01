import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants";
import Link from "next/link";
import React, { useCallback } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHandleNavbar, useUser } from "@/hooks";
import { isEmpty } from "lodash";
import { Avatar, MenuNavbar } from "../..";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";

export default function MainNavbar() {
  const { data: user } = useUser();

  const pathname = usePathname();

  const { renderMenu, renderMenuBar } = useHandleNavbar();

  const renderRightMenu = useCallback(() => {
    if (user && pathname !== ROUTES.MAIN) {
      return (
        <React.Fragment>
          <Popover>
            <PopoverTrigger>
              <Avatar src={user.profile} fallback={user?.name?.at(0)} />
            </PopoverTrigger>
            <PopoverContent align="end" className="w-fit p-0 mt-2">
              <MenuNavbar menuList={renderMenuBar} />
            </PopoverContent>
          </Popover>
        </React.Fragment>
      );
    }
    if (pathname === ROUTES.MAIN) {
      return (
        <React.Fragment>
          {isEmpty(user) && (
            <React.Fragment>
              <Link
                href={ROUTES.AUTH.LOGIN}
                className="text-sm hover:opacity-50 transition-all duration-300"
              >
                Log in
              </Link>
              <Separator orientation="vertical" />
            </React.Fragment>
          )}

          <Link href={ROUTES.BUDGET.CREATE}>
            <Button className="flex items-center w-full">
              Try free <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        </React.Fragment>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cleanupPathname = pathname.slice(1).replaceAll("/", "-");

  return (
    <nav className="sticky top-0 bg-white">
      <div className="flex items-center py-4 justify-between px-[4%]">
        <Link href={ROUTES.MAIN} className="text-[20px] font-medium">
          Logo
        </Link>
        <div className="ml-10 flex space-x-4 w-full">
          {renderMenu.map((menu) => (
            <Link
              key={menu.key}
              href={menu.url}
              className={`cursor-pointer ${
                cleanupPathname === menu.key ? "text-gray-800" : "text-gray-300"
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
