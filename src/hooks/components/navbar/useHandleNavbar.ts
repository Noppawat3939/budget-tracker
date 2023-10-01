import { ROUTES } from "@/constants";
import { toCapitalize } from "@/helper";
import { useUser } from "@/hooks";
import { MenuBarList, NavbarMenuList } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";

type UseHandleNavbar = () => {
  renderMenu: NavbarMenuList;
  renderMenuBar: MenuBarList;
};

const useHandleNavbar: UseHandleNavbar = () => {
  const pathname = usePathname();
  const search = useSearchParams();
  const budgetIdParams = search.get("");

  const { data: user } = useUser();

  const hideDisplayNavbarMenu = ["summary-query"];

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
          value: toCapitalize(user?.name!),
        },
        {
          key: "email",
          value: toCapitalize(user?.email!),
        },
      ],
    },
    {
      position: "mid",
      menus: [{ key: "settings", value: "Settings" }],
    },
    {
      position: "bottom",
      menus: [{ key: "logout", value: "Log out" }],
    },
  ];

  return {
    renderMenu: filterMenu,
    renderMenuBar: menuBar,
  };
};

export default useHandleNavbar;
