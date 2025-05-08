import { Idecimal } from "@/app/features/Type/props";
import React from "react";

export default function Decimal({ children, dec = 0, className }: Idecimal) {
  return (
    <div
      className={`${
        className ?? ""
      } text-center  p-6 rounded-xl bg-gradient-to-br from-DarkPrimary/5  dark:from-white/5 dark:to-transparent`}
    >
      <div className="text-5xl md:text-6xl font-bold text-DarkPrimary dark:text-white relative z-10">
        {dec}
      </div>

      <div className="mt-2 text-gray-600 dark:text-gray-300 text-sm md:text-base">
        {children}
      </div>
    </div>
  );
}
