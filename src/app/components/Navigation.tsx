"use client";

import { motion } from "framer-motion";

interface NavigationProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function Navigation({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: NavigationProps) {
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <div className="flex justify-between items-center w-full px-1 sm:px-4 mt-2 sm:mt-4 gap-2">
      <motion.button
        whileHover={!isFirst ? { scale: 1.05 } : {}}
        whileTap={!isFirst ? { scale: 0.9 } : {}}
        onClick={onPrev}
        disabled={isFirst}
        className={`flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-2xl font-bold text-sm shadow-sm transition-all min-h-11 ${
          isFirst
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 cursor-pointer"
        }`}
      >
        <span>←</span>
        <span className="hidden sm:inline">Back</span>
      </motion.button>

      <div className="flex gap-1 flex-wrap justify-center max-w-[35%] sm:max-w-none overflow-hidden">
        {Array.from({ length: totalPages }, (_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all shrink-0 ${
              i + 1 === currentPage
                ? "bg-violet-500 w-5"
                : i + 1 < currentPage
                  ? "bg-violet-300 w-2"
                  : "bg-gray-300 w-2"
            }`}
          />
        ))}
      </div>

      <motion.button
        whileHover={!isLast ? { scale: 1.05 } : {}}
        whileTap={!isLast ? { scale: 0.9 } : {}}
        onClick={onNext}
        disabled={isLast}
        className={`flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-2xl font-bold text-sm shadow-sm transition-all min-h-11 ${
          isLast
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-linear-to-b from-violet-500 to-purple-600 text-white shadow-md shadow-violet-200 cursor-pointer"
        }`}
      >
        <span className="hidden sm:inline">Next</span>
        <span>→</span>
      </motion.button>
    </div>
  );
}
