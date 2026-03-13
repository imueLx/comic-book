"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ComicPanelProps {
  children: ReactNode;
  variant?: "wide" | "half" | "focus";
  delay?: number;
}

const variantClasses = {
  wide: "col-span-2 min-h-32",
  half: "col-span-1 min-h-30",
  focus: "col-span-2 min-h-40",
};

export default function ComicPanel({
  children,
  variant = "wide",
  delay = 0,
}: ComicPanelProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.28, ease: "easeOut" }}
      className={`${variantClasses[variant]} rounded-3xl border-3 border-gray-900 bg-white/95 p-3 shadow-[5px_5px_0_#111827]`}
    >
      {children}
    </motion.section>
  );
}
