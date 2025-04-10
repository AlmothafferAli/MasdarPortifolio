"use client";

import { useRouter } from "next/navigation";
import SignUp from "../(Auth)/signup/page";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";
import { useState } from "react";
import Signin from "../(Auth)/signin/page";
import Image from "next/image";
import SecondaryButton from "@/app/components/EleComponents/SecondaryButton";
import Main from "./main/page";
export default function Home() {
  const router = useRouter();
  return (
    <div className="w-full">
      <Main />
    </div>
  );
}
