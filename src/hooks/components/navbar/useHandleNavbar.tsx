import { DEFAULT_TEXT, ROUTES, STORAGE_KEY } from "@/constants";
import { localStorage, toCapitalize, toSubString } from "@/helper";
import { useUser } from "@/hooks";
import { useLogoutStore } from "@/store";
import { MenuBarList, NavbarMenuList } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";

const MAX_LENGTH = 20;

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
      order: 1,
    },
    {
      key: "create-budget",
      label: "Create budget",
      url: ROUTES.BUDGET.CREATE,
      order: 3,
    },
    {
      key: "summary-query",
      label: "Summary detail",
      url: `/summary/query?=${budgetIdParams}`,
      order: 4,
    },
    {
      key: "tracking",
      label: "Tracking",
      url: ROUTES.BUDGET.TRACKING,
      order: 2,
    },
  ];

  const sortedNavbarMenus = navbarMenus.sort((a, b) => a.order - b.order);

  const filterMenu =
    pathname === "/summary/query"
      ? sortedNavbarMenus
      : sortedNavbarMenus.filter(
          (menu) => !hideDisplayNavbarMenu.includes(menu.key)
        );

  const menuBar: MenuBarList = [
    {
      position: "top",
      menus: [
        {
          key: "name",
          value: user?.name
            ? toSubString(toCapitalize(user.name), MAX_LENGTH)
            : DEFAULT_TEXT,
        },
        {
          key: "email",
          value: user?.email
            ? toSubString(toCapitalize(user.email), MAX_LENGTH)
            : DEFAULT_TEXT,
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

    if (storage.get(_key)) return storage.remove(_key);
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
