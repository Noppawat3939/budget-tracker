export type MenuPosition = "top" | "mid" | "bottom";
export type MenuSection = "name" | "email" | "settings" | "logout";
export type NavbarMenu = "create_budget" | "summary";

export type MenuBarList = {
  position: MenuPosition;
  menus: { key: MenuSection; value: string }[];
}[];

export type NavbarMenuList = { key: NavbarMenu; label: string; url: string }[];
