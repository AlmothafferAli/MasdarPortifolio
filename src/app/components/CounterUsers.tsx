import React from "react";
import Decimal from "./EleComponents/decimal";
import { motion } from "framer-motion";

export default function CounterUsers() {
  const decimal = [1, 5, 1];
  return (
    <section className="bg-lightBackground dark:bg-darkSecondary py-16 ">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px 0px -100px 0px" }}
        className="container mx-auto px-4"
      >
        <h2 className="text-3xl font-bold text-center text-DarkPrimary dark:text-white mb-8">
          معلومات عن المستخدمين
        </h2>

        <div className="grid grid-cols-3 lg:px-72 gap-4 ">
          {decimal.map((dec, index) => (
            <Decimal
              key={index}
              dec={dec}
              className="p-6 bg-white dark:bg-darkMain rounded-xl shadow-md"
            ></Decimal>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
