"use client";
import React from "react";
import { IButtonProps } from "../../features/Type/props";

export default function SecondaryButton({
  onClick,
  content,
  className,
  type,
}: IButtonProps) {
  return (
    <button
      className={`
        px-6 py-3 rounded-lg font-bold border-2 border-DarkPrimary hover:bg-cyan-500  text-2xl  transition-colors ${
          className ?? "text-DarkPrimary dark:text-amber-50 "
        } `}
      type={type}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
