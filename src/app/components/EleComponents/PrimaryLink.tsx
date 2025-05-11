import Link from "next/link";
import React from "react";

export default function PrimaryLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`${
        className ?? ""
      } text-bold flex items-center justify-center   gap-2 text-lg md:text-xl lg:text-xl xl:text-2xl  text-DarkPrimary hover:text-lightText transition-all duration-300 text-shadow-2xs `}
    >
      {children}
    </Link>
  );
}
