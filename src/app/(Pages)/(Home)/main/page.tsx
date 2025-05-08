"use client";
import React from "react";
;
import MainFirst from "@/app/components/MainFirst";
import Projects from "@/app/components/Projects";
import CounterUsers from "@/app/components/CounterUsers";
import Partners from "@/app/components/partners";

export default function page() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <MainFirst />
      {/* Projects Section */}
      <Projects />

      {/* counterUsers Section */}
      <CounterUsers />
      <Partners />
    </div>
  );
}
