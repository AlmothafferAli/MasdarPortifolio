"use client";

import Image from "next/image";
import HeaderPull from "./EleComponents/headerPull";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../features/Store"; // make sure this path is correct
import {
  FaHome,
  FaMoon,
  FaSun,
  FaUser,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";
import ButtonTheme from "./EleComponents/ButtonTheme";

import { useCallback } from "react";
import { setTheme } from "../features/appSlice/headerSlice";

import PrimaryLink from "./EleComponents/PrimaryLink";
import { tokenUtils } from "../Utils/TokenUtils";

export default function Header() {
  const dispatch = useDispatch();

  const isToggled = useSelector((state: RootState) => state.header.isToggled);
  const isDark = useSelector((state: RootState) => state.header.isDark);

  const toggleTheme = useCallback(() => {
    const newTheme = !isDark;

    dispatch(setTheme(newTheme));
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  }, [isDark, dispatch]);
  const links = [
    {
      href: "/",
      text: "الرئيسية",
      icon: <FaHome />,
    },
    {
      href: "/about",
      text: "من نحن",
      icon: <FaInfoCircle />,
    },
    {
      href: "/profile",
      text: "الملف الشخصي",
      icon: <FaUser />,
    },
    {
      href: "/contact",
      text: "اتصل بنا",
      icon: <FaEnvelope />,
    },
  ];
  const userRole = tokenUtils.getUserRole();
  if (userRole === "Admin") {
    links.push({
      href: "/Admin",
      text: "المدير",
      icon: <FaUser />,
    });
  }

  return (
    <div className="flex flex-col justify-center fixed top-0 left-0  z-[999] right-0 items-center px-4">
      <div
        className={`flex justify-center items-center rounded-b-2xl w-full bg-lightBackground backdrop-blur-sm bg-opacity-95 w-screen md:w-4/5 shadow-lg ${
          isToggled ? "md:h-20  py-8 md:py-0" : "h-0 py-0"
        } transition-all duration-500 ease-in-out overflow-hidden`}
      >
        <div className="flex justify-between w-full md:w-full md:px-15 flex-col md:flex-row gap-4 md:gap-0">
          <div className="flex justify-center items-center">
            <Image
              className={`${
                isToggled ? "opacity-100 scale-75" : "opacity-0 scale-95"
              } transition-all duration-300`}
              src={"/images/masdarName.png"}
              alt="logo"
              width={200}
              height={200}
              priority
            />
          </div>

          <div
            className={`${
              isToggled
                ? "grid grid-cols-2 md:flex md:flex-row-reverse w-full md:min-w-xl gap-8 md:gap-0"
                : "hidden"
            } transition-all duration-300`}
          >
            {links.map((link) => (
              <div
                key={link.href}
                className="flex justify-center items-center sm:min-w-20 ml-10"
                onClick={() => {}}
              >
                <PrimaryLink
                  href={link.href}
                  className="hover:scale-105 transition-transform"
                >
                  {link.text} {link.icon}
                </PrimaryLink>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ButtonTheme
        className="z-[99999] transform hover:rotate-12 transition-transform duration-300"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          <FaSun className="text-yellow-400" />
        ) : (
          <FaMoon className="text-DarkPrimary" />
        )}
      </ButtonTheme>
      <HeaderPull />
    </div>
  );
}
