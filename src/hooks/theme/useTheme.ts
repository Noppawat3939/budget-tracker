"use client";

import { STORAGE_KEY } from "@/constants";
import { localStorage } from "@/helper";
import { useEffect, useState } from "react";

type Theme = "dark-theme" | "light-theme";

const THEME = { DARK: "dark-theme", LIGHT: "light-theme" } as const;

function useTheme() {
  const [theme, setTheme] = useState<Theme>(THEME.LIGHT);

  const { set, remove, get } = localStorage();

  const onToggleTheme = () => {
    if (theme === THEME.LIGHT) {
      setTheme(THEME.DARK);
      set(STORAGE_KEY.THEME, THEME.DARK);
    } else {
      setTheme(THEME.LIGHT);
      remove(STORAGE_KEY.THEME);
    }
  };

  useEffect(() => {
    const themeOnLocalStorage = get(STORAGE_KEY.THEME);

    if (themeOnLocalStorage) {
      setTheme(THEME.DARK);
    } else {
      setTheme(THEME.LIGHT);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { onToggleTheme, theme };
}

export default useTheme;
