  "use client";

import { usePathname } from "next/navigation";
import Header from "./header";
import Footer from "./footer";
import HeaderOverlay from "./HeaderOverlay";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage =
    pathname?.startsWith("/auth") ||
    pathname?.startsWith("/signin") ||
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/Admin");

  return (
    <>
      {!isAuthPage && <Header />}
      {!isAuthPage && <HeaderOverlay />}
      <main className="flex-grow">{children}</main>
      {!isAuthPage && <Footer />}
    </>
  );
}
