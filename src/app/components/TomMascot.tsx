"use client";

import { motion } from "framer-motion";

interface TomMascotProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeEmoji = { sm: "text-3xl", md: "text-5xl", lg: "text-7xl" };

export default function TomMascot({
  message,
  size = "md",
  className = "",
}: TomMascotProps) {
  return (
    <motion.div
      className={`flex flex-col items-center ${className}`}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className={sizeEmoji[size]} role="img" aria-label="Tom the Cat">
        🐱
      </span>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl px-3 py-1.5 mt-1 shadow-sm max-w-50"
        >
          <p className="text-xs sm:text-sm font-bold text-gray-700 text-center">
            {message}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
