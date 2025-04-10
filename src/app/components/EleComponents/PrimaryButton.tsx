"use client";
import React from "react";
import { IButtonProps } from "../../features/Type/props";

export default function PrimaryButton({
  onClick,
  content,
  className,
  type,
}: IButtonProps) {
  return (
    <button
      className={`
           px-6 py-3 rounded-lg font-bold text-2xl hover:bg-cyan-500  transition-colors
           ${className ?? "dark:bg-white bg-DarkPrimary text-amber-50 "}
           `}
      type={type}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
