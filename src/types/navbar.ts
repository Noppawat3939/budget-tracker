import { ReactNode } from "react";

export type MenuPosition = "top" | "mid" | "bottom";
export type MenuSection = "name" | "email" | "settings" | "logout" | "theme";
export type NavbarMenu = "create-budget" | "summary" | "summary-query";

export type MenuBarList = {
  position: MenuPosition;
  menus: {
    key: MenuSection;
    value: string;
    onClick?: <TArg>(arg?: TArg) => void;
    render?: ReactNode;
  }[];
}[];

export type NavbarMenuList = { key: NavbarMenu; label: string; url: string }[];
