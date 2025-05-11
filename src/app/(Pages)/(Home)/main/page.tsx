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
      <Services />
      <Projects />
      <Ads1 />
      {/* counterUsers Section */}
      <CounterUsers />
      <Partners />
    </div>
  );
}
