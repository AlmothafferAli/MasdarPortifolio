import React from "react";
import Image from "next/image";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";
import SecondaryButton from "@/app/components/EleComponents/SecondaryButton";
import { motion } from "framer-motion";
import MainFirst from "@/app/components/MainFirst";
import Projects from "@/app/components/Projects";

export default function page() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <MainFirst />
      {/* Projects Section */}
      <Projects />
    </div>
  );
}
