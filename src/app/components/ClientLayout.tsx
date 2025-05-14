"use client";

import { usePathname } from "next/navigation";
import Header from "./header";
import Footer from "./footer";
import HeaderOverlay from "./HeaderOverlay";
import { useDispatch } from "react-redux";
import useCompany from "../hooks/useCompany";
import { setUCompany } from "../features/appSlice/companySlices";
import { useEffect } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { data: companyData} = useCompany();
 
  useEffect(() => {
    if (companyData) {
      dispatch(setUCompany(companyData));
    }
  }, [companyData, dispatch]);

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
