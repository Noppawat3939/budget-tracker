import { DEFAULT_TEXT, ROUTES, STORAGE_KEY } from "@/constants";
import { localStorage, toCapitalize } from "@/helper";
import { useUser } from "@/hooks";
import { useLogoutStore } from "@/store";
import { MenuBarList, NavbarMenuList } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";

const useHandleNavbar = () => {
  const pathname = usePathname();
  const search = useSearchParams();
  const budgetIdParams = search.get("");

  const { onOpenLogout } = useLogoutStore((store) => ({
    onOpenLogout: store.onOpen,
  }));

  const { data: user } = useUser();

  const hideDisplayNavbarMenu = ["summary-query"];

  const storage = localStorage();

  const navbarMenus: NavbarMenuList = [
    {
      key: "summary",
      label: "My Summary",
      url: ROUTES.BUDGET.SUMMARY,
    },
    {
      key: "create-budget",
      label: "Create budget",
      url: ROUTES.BUDGET.CREATE,
    },
    {
      key: "summary-query",
      label: "Summary detail",
      url: `/summary/query?=${budgetIdParams}`,
    },
  ];

  const filterMenu =
    pathname === "/summary/query"
      ? navbarMenus
      : navbarMenus.filter((menu) => !hideDisplayNavbarMenu.includes(menu.key));

  const menuBar: MenuBarList = [
    {
      position: "top",
      menus: [
        {
          key: "name",
          value: user?.name ? toCapitalize(user.name) : DEFAULT_TEXT,
        },
        {
          key: "email",
          value: user?.email ? toCapitalize(user.email) : DEFAULT_TEXT,
        },
      ],
    },
    {
      position: "mid",
      menus: [{ key: "settings", value: "Settings" }],
    },
    {
      position: "bottom",
      menus: [
        {
          key: "logout",
          value: "Log out",
          onClick: onOpenLogout,
        },
      ],
    },
  ];

  const handleRemoveNotification = () => {
    const _key = STORAGE_KEY.CREATED_NEW_BUDGET_NOTIFICATION;

    if (() => storage.get(_key)) return storage.remove(_key);
  };

  return {
    renderMenu: filterMenu,
    renderMenuBar: menuBar,
    hasNewNotification: () =>
      storage.get(STORAGE_KEY.CREATED_NEW_BUDGET_NOTIFICATION),
    handleRemoveNotification,
  };
};

export default useHandleNavbar;
