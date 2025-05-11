"use client";
import React from "react";

import MainFirst from "@/app/components/MainFirst";
import Projects from "@/app/components/Projects";
import CounterUsers from "@/app/components/CounterUsers";
import Partners from "@/app/components/partners";
import Ads1 from "@/app/components/Ads1"; 
import Services from "@/app/components/Services";
export default function page() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <MainFirst />
      {/* Projects Section */}
      <div className="dark:bg-gradient-to-b dark:from-[#0a192f] dark:to-[#364050]">
        <Services />
        <Projects />
        <Ads1 />
        {/* counterUsers Section */}
        <CounterUsers />
        <Partners />
      </div>
    </div>
  );
}
