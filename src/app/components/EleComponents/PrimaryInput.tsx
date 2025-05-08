import React from "react";
import { IInputProps } from "../../features/Type/props";

export default function PrimaryInput({
  placeholder,
  type = "text",
  className,

  children,
  name,
  value,
  onChange,
  accept,
  multiple,
}: IInputProps) {
  return (
    <div
      className={`rounded-lg hover:border-DarkPrimary border border-lightTextSecondary dark:border-lightBorder dark:hover:border-lightTextSecondary  space-x-2 p-2 dark:bg-darkSecondary  dark:text-white relative flex items-center ${
        className ?? "md:w-3/4"
      }  `}
    >
      <input
        className="w-full text-right text-sm outline-none  dark:text-white dark:border-darkBorder "
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange} // ✅ Now it's reactive
        accept={accept}
        multiple={multiple}
      />
      {children}
    </div>
  );
}
