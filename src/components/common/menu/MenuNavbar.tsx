import { eq } from "lodash";
import React, { Fragment } from "react";
import type { MenuNavbarProps } from "./type";

export default function MenuNavbar({ menuList }: MenuNavbarProps) {
  return (
    <div className="bg-white border rounded-sm">
      {menuList.map((menus) => (
        <div
          key={`menus_${menus.position}`}
          className={`py-1 my-1 px-2 mx-1 ${
            menus.position === "top" ? "cursor-default" : "cursor-pointer"
          } transition-all duration-200`}
        >
          {menus.menus.map((menu) => {
            return (
              <Fragment key={menu.key}>
                <div
                  className={`flex justify-between items-center transition-all duration-200 ${
                    menus.position !== "top" && "hover:bg-slate-100"
                  } p-1 rounded-sm text-[13px] ${
                    menus.position === "mid" && "mb-1"
                  } ${eq(menu.key, "email") && "text-[13px] font-light"} ${
                    eq(menu.key, "name") && "font-medium"
                  } `}
                  onClick={menu.onClick ?? undefined}
                >
                  {menu.value}
                  {menu.render && menu.render}
                </div>
              </Fragment>
            );
          })}
        </div>
      ))}
    </div>
  );
}
