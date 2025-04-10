"use client";

import Image from "next/image";
import HeaderPull from "./EleComponents/headerPull";
import { useDispatch, useSelector } from "react-redux";
import { IHeaderState } from "../features/Type/Interfaces";
import type { RootState } from "../features/Store"; // make sure this path is correct
import {
  FaArrowLeft,
  FaHome,
  FaMoon,
  FaSun,
  FaUser,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";
import ButtonTheme from "./EleComponents/ButtonTheme";
import { Dark } from "../Settings";
import { useCallback } from "react";
import { setTheme } from "../features/appSlice/headerSlice";
import Link from "next/link";
import PrimaryLink from "./EleComponents/PrimaryLink";

export default function Header() {
  const dispatch = useDispatch();

  const isToggled = useSelector((state: RootState) => state.header.isToggled);
  const isDark = useSelector((state: RootState) => state.header.isDark);

  const toggleTheme = useCallback(() => {
    const newTheme = !isDark;
    dispatch(setTheme(newTheme));
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  }, [isDark]);

  return (
    <div className="flex flex-col justify-center fixed top-0 left-0 z-[999] right-0 items-center px-4">
      <div
        className={`flex justify-center items-center rounded-b-2xl bg-lightBackground backdrop-blur-sm bg-opacity-95 w-screen md:w-2/3 shadow-lg ${
          isToggled ? "md:h-20 h-auto py-4 md:py-0" : "h-0 py-0"
        } transition-all duration-500 ease-in-out overflow-hidden`}
      >
        <div className="flex justify-between w-11/12 md:w-full md:px-10 flex-col md:flex-row gap-4 md:gap-0">
          <div className="flex justify-center items-center">
            <Image
              className={`${
                isToggled ? "opacity-100 scale-100" : "opacity-0 scale-95"
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
                ? "grid grid-cols-2 md:flex md:flex-row-reverse  md:space-x-10 gap-4 md:gap-0"
                : "hidden"
            } transition-all duration-300`}
          >
            <div className="flex justify-center items-center">
              <PrimaryLink
                href="/"
                className="hover:scale-105 transition-transform"
              >
                الرئيسية <FaHome className="ml-2" />
              </PrimaryLink>
            </div>
            <div className="flex justify-center items-center">
              <PrimaryLink
                href="/about"
                className="hover:scale-105 transition-transform"
              >
                من نحن <FaInfoCircle className="ml-2" />
              </PrimaryLink>
            </div>
            <div className="flex justify-center items-center">
              <PrimaryLink
                href="/profile"
                className="hover:scale-105 transition-transform"
              >
                الملف الشخصي <FaUser className="ml-2" />
              </PrimaryLink>
            </div>
            <div className="flex justify-center items-center">
              <PrimaryLink
                href="/contact"
                className="hover:scale-105 transition-transform"
              >
                اتصل بنا <FaEnvelope className="ml-2" />
              </PrimaryLink>
            </div>
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
