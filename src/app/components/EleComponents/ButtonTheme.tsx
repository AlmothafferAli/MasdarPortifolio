"use client";

import { IButtonThemeProps } from "@/app/features/Type/props";
import { useState } from "react";

export default function ButtonTheme({
  className,
  onClick,
  children,
}: IButtonThemeProps) {
  return (
    <button
      className={`${
        className ?? ""
      } text-white hover:bg-darkPrimary shadow-2xl dark:bg-white bg-darkSecondary dark:text-lightTextPrimary  dark:hover:bg-textSecondary dark:hover:text-white dark:hover:border-white absolute  p-4 rounded-full top-4 right-4 `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
