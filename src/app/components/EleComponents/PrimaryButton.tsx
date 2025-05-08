"use client";
import React from "react";
import { IButtonProps } from "../../features/Type/props";

export default function PrimaryButton({
  onClick,
  content,
  className,
  type,
  children,
  disabled,
}: IButtonProps) {
  return (
    <button
      className={`
           px-6 py-3 rounded-lg font-bold text-2xl hover:bg-cyan-500  transition-colors
           ${
             className ??
             "dark:bg-white bg-DarkPrimary text-amber-50 dark:text-black "
           }
           ${disabled ? "opacity-50 cursor-not-allowed" : ""}
           `}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children ?? content}
    </button>
  );
}
