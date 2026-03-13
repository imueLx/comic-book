"use client";

import { motion } from "framer-motion";

interface NavigationProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onDone?: () => void;
}

export default function Navigation({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  onDone,
}: NavigationProps) {
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <div className="flex justify-between items-center w-full px-1 sm:px-4 mt-2 sm:mt-4 gap-3">
      <motion.button
        whileTap={!isFirst ? { scale: 0.93 } : {}}
        onClick={onPrev}
        disabled={isFirst}
        className={`kid-btn flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-base min-h-13 min-w-22 ${
          isFirst
            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed shadow-none"
            : "kid-btn-neutral"
        }`}
      >
        <span className="text-lg">←</span>
        <span>Back</span>
      </motion.button>

      <div className="flex gap-1 flex-wrap justify-center max-w-[30%] sm:max-w-none overflow-hidden">
        {Array.from({ length: totalPages }, (_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full shrink-0 ${
              i + 1 === currentPage
                ? "bg-violet-500 w-5"
                : i + 1 < currentPage
                  ? "bg-violet-300 w-2"
                  : "bg-gray-300 w-2"
            }`}
          />
        ))}
      </div>

      {isLast ? (
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={onDone}
          className="kid-btn kid-btn-success flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-base min-h-13 min-w-22"
        >
          <span>Done!</span>
          <span className="text-lg">🎉</span>
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={onNext}
          className="kid-btn kid-btn-primary flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-base min-h-13 min-w-22"
        >
          <span>Next</span>
          <span className="text-lg">→</span>
        </motion.button>
      )}
    </div>
  );
}
