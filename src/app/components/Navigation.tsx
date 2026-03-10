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
        whileHover={!isFirst ? { scale: 1.1 } : {}}
        whileTap={!isFirst ? { scale: 0.9 } : {}}
        onClick={onPrev}
        disabled={isFirst}
        className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-base sm:text-lg border-2 sm:border-3 shadow-lg transition-all min-h-11 ${
          isFirst
            ? "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed"
            : "bg-blue-400 border-blue-600 text-white hover:bg-blue-500 cursor-pointer active:bg-blue-600"
        }`}
      >
        <span className="text-xl sm:text-2xl">⬅️</span>
        <span className="hidden sm:inline">Back</span>
      </motion.button>

      <div className="flex gap-0.5 sm:gap-1 flex-wrap justify-center max-w-[40%] sm:max-w-none">
        {Array.from({ length: totalPages }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
              i + 1 === currentPage
                ? "bg-purple-600 scale-125"
                : i + 1 < currentPage
                  ? "bg-purple-300"
                  : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <motion.button
        whileHover={!isLast ? { scale: 1.1 } : {}}
        whileTap={!isLast ? { scale: 0.9 } : {}}
        onClick={onNext}
        disabled={isLast}
        className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-base sm:text-lg border-2 sm:border-3 shadow-lg transition-all min-h-11 ${
          isLast
            ? "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed"
            : "bg-green-400 border-green-600 text-white hover:bg-green-500 cursor-pointer active:bg-green-600"
        }`}
      >
        <span className="hidden sm:inline">Next</span>
        <span className="text-xl sm:text-2xl">➡️</span>
      </motion.button>
    </div>
  );
}
