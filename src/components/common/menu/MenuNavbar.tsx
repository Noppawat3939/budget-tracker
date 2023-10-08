import { eq } from "lodash";
import React, { Fragment } from "react";
import type { MenuNavbarProps } from "./type";

export default function MenuNavbar({ menuList }: MenuNavbarProps) {
  return (
    <div className="bg-white border rounded-sm">
      {menuList.map((menus) => (
        <div
          key={`menus_${menus.position}`}
          className={`py-2 my-1 px-2 mx-1 ${
            menus.position === "top" ? "cursor-default" : "cursor-pointer"
          } transition-all duration-200 ${
            menus.position !== "top" && "hover:bg-slate-50 hover:rounded-md"
          }`}
        >
          {menus.menus.map((menu) => {
            return (
              <React.Fragment key={menu.key}>
                <p
                  className={`text-[13px] ${
                    eq(menu.key, "email") && "text-[13px] font-light"
                  } ${eq(menu.key, "name") && "font-medium"} `}
                >
                  {menu.value}
                </p>
              </React.Fragment>
            );
          })}
        </div>
      ))}
    </div>
  );
}
