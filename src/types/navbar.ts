export type MenuPosition = "top" | "mid" | "bottom";
export type MenuSection = "name" | "email" | "settings" | "logout";

export type MenuBarList = {
  position: MenuPosition;
  menus: { key: MenuSection; value: string }[];
}[];
