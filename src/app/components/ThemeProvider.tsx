"use client";

import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/Store";
import { setTheme } from "../features/appSlice/headerSlice";

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.header.isDark);
  const isToggled = useSelector((state: RootState) => state.header.isToggled);
  // Apply theme class to html element when theme changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    if (isToggled) {
      document.documentElement.classList.add("headerToggled");
    } else {
      document.documentElement.classList.remove("headerToggled");
    }
  }, [isDark]);

  // Initialize theme from localStorage on first load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      dispatch(setTheme(true));
    } else if (savedTheme === "light") {
      dispatch(setTheme(false));
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      dispatch(setTheme(prefersDark));
    }
  }, [dispatch]);

  return <>{children}</>;
}
