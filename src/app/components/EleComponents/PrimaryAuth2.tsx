import React from "react";
import { IAouth2Props } from "../../features/Type/props";
export default function PrimaryAuth2({ children }: IAouth2Props) {
  return (
    <div className="w-1/3 py-2 border border-lightBorder flex items-center justify-center rounded-xl  dark:hover:bg-blue-500 dark:border-gray-500  dark:shadow-darkTransparent">
      {children}
    </div>
  );
}
