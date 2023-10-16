import { Switch } from "@/components/ui/switch";
import { DEFAULT_TEXT, ROUTES, STORAGE_KEY } from "@/constants";
import { localStorage, toCapitalize, toSubString } from "@/helper";
import { useTheme, useUser } from "@/hooks";
import { useLogoutStore } from "@/store";
import { MenuBarList, NavbarMenuList } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";

const MAX_LENGTH = 20;

const useHandleNavbar = () => {
  const pathname = usePathname();
  const search = useSearchParams();
  const budgetIdParams = search.get("");

  const { onToggleTheme, theme } = useTheme();

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
      menus: [
        { key: "settings", value: "Settings" },
        // {
        //   key: "theme",
        //   value: "Theme",
        //   render: (
        //     <Switch
        //       id="theme"
        //       checked={theme === "dark-theme"}
        //       onCheckedChange={onToggleTheme}
        //       disabled
        //     />
        //   ),
        // },
      ],
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
