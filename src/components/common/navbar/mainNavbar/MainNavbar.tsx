"use client";

import { ROUTES, SECOND_INDEX } from "@/constants";
import Link from "next/link";
import React, { Fragment } from "react";
import { useHandleNavbar, useUser } from "@/hooks";
import { eq, isEmpty } from "lodash";
import { Avatar, MenuNavbar, ModalLogout } from "@/components";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";
import Image from "next/image";

import DarkLogo from "@/assets/logo/dark-logo.png";

export default function MainNavbar() {
  const { data: user } = useUser();

  const pathname = usePathname();

  const {
    renderMenu,
    renderMenuBar,
    hasNewNotification,
    handleRemoveNotification,
  } = useHandleNavbar();

  const renderRightMenu = () => {
    if (user && pathname !== ROUTES.MAIN) {
      return (
        <React.Fragment>
          <Popover>
            <PopoverTrigger>
              <Avatar src={user.profile} fallback={user?.name?.at(0)} />
            </PopoverTrigger>
            <PopoverContent align="end" className=" z-10 w-fit p-0 mt-2">
              <MenuNavbar menuList={renderMenuBar} />
            </PopoverContent>
          </Popover>
        </React.Fragment>
      );
    }

    if (eq(pathname, ROUTES.MAIN)) {
      return (
        <React.Fragment>
          {isEmpty(user) && (
            <React.Fragment>
              <Link
                href={ROUTES.AUTH.LOGIN}
                className="text-sm hover:bg-slate-100 py-1 px-2 rounded-sm transition-all duration-300"
              >
                Log in
              </Link>
            </React.Fragment>
          )}
        </React.Fragment>
      );
    }
  };

  const cleanupPathname = pathname.slice(SECOND_INDEX).replaceAll("/", "-");

  return (
    <Fragment>
      <nav
        className={`top-0 ${
          pathname === ROUTES.MAIN
            ? `fixed w-full backdrop-blur supports-[backdrop-filter]:bg-background/50`
            : `bg-white static`
        }`}
      >
        <div className="flex items-center py-4 justify-between px-[4%]">
          <Link href={ROUTES.MAIN} className="text-[20px] font-medium">
            <Image
              src={DarkLogo}
              alt="logo-icon"
              className="w-[48px] h-[40px] object-cover rounded-md"
            />
          </Link>
          <div className="ml-10 mr-auto flex space-x-6">
            {user &&
              renderMenu.map((menu) => (
                <Link
                  onClick={() =>
                    menu.key === "summary"
                      ? handleRemoveNotification()
                      : undefined
                  }
                  key={menu.key}
                  href={menu.url}
                  className={`cursor-pointer relative ${
                    cleanupPathname === menu.key
                      ? "text-gray-800"
                      : "text-gray-300"
                  } hover:text-gray-800 transition-all duration-200 text-sm`}
                >
                  {menu.label}
                  {menu.key === "summary" && hasNewNotification() && (
                    <span className="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-[-10px]" />
                  )}
                </Link>
              ))}
          </div>
          <div className="flex h-5 items-center space-x-3 text-sm">
            {renderRightMenu()}
          </div>
        </div>
      </nav>

      <ModalLogout />
    </Fragment>
  );
}
