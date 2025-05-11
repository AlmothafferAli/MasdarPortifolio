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

import { setTheme } from "../features/appSlice/headerSlice";

import PrimaryLink from "./EleComponents/PrimaryLink";
import { tokenUtils } from "../Utils/TokenUtils";
import ImageWithLoader from "./ImageWithLoader";
import { useState } from "react";
import { useEffect } from "react";
export default function Header() {
  const dispatch = useDispatch();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(tokenUtils.getUserRole());
  }, []);
  const isToggled = useSelector((state: RootState) => state.header.isToggled);
  const isDark = useSelector((state: RootState) => state.header.isDark);

  const toggleTheme = () => {
    const newTheme = !isDark;
    dispatch(setTheme(newTheme));
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };
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
    if (role === "Admin") {
    links.push({
      href: "/Admin",
      text: "المدير",
      icon: <FaUser />,
    });
  }

  return (
    <div className="flex flex-col justify-center fixed top-0 left-0 z-[999] right-0 items-center px-2 sm:px-6 "
    dir="rtl"
    >
      <div
        className={`flex justify-center items-center rounded-b-2xl w-full bg-lightBackground backdrop-blur-sm bg-opacity-95 w-screen md:w-3/4 lg:w-2/3 shadow-lg ${
          isToggled ? "min-h-[180px] md:min-h-[80px] py-4 md:py-4" : "h-0 min-h-0 py-0"
        } transition-all duration-700 ease-in-out overflow-hidden`}
      >
        <div className="flex justify-between w-full md:w-full md:px-8 flex-col md:flex-row-reverse">
        <div className="flex justify-center items-center order-2 md:order-1">
            <ImageWithLoader
              className={`${
                isToggled ? "opacity-100 scale-50 md:scale-75" : "opacity-0 scale-95"
              } transition-all duration-500 ease-in-out hidden md:block`}
              src={"/images/iconBlue.png"}
              alt="logo"
              width={100}
              height={100}
              priority
            />
          </div>

          <div
            className={`${
              isToggled
                ? "grid grid-cols-2 md:flex md:flex-row w-full md:min-w-md gap-8 md:gap-2 order-1 md:order-2 px-16 md:px-0"
                : "hidden"
            } transition-all duration-700 ease-in-out`}
            style={{
              visibility: isToggled ? 'visible' : 'hidden',
              transition: 'visibility 0s linear 0.7s'
            }}
          >
            {links.map((link) => (
              <div
                key={link.href}
                className="flex sm:min-w-20 px-4"
                onClick={() => {}}
              >
                <PrimaryLink
                  href={link.href}
                  className="text-base md:text-xl hover:scale-105 transition-all duration-500 ease-in-out flex items-center gap-2 md:gap-3 group relative"
                >
                  <div className="flex items-center transition-all duration-500 ease-in-out gap-2">
                    <span className="text-xl md:text-2xl flex-shrink-0 ml-1 md:ml-2 transform transition-all duration-500 ease-in-out">{link.icon}</span>
                    <span className="max-w-[150px] md:max-w-0 md:group-hover:max-w-[200px] overflow-hidden transition-all duration-700 ease-in-out whitespace-nowrap text-lg md:text-2xl font-medium">
                      {link.text}
                    </span>
                  </div>
                </PrimaryLink>
              </div>
            ))}
          </div>

        </div>
      </div>
      <ButtonTheme
        className="z-[99999] transform hover:rotate-12 transition-transform duration-300 absolute top-2 right-2 md:top-4 md:right-4"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          <FaSun className="text-yellow-400 text-lg md:text-2xl" />
        ) : (
          <FaMoon className="text-DarkPrimary text-lg md:text-2xl" />
        )}
      </ButtonTheme>
      <HeaderPull />
    </div>
  );
}
