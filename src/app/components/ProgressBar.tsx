"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full px-1 sm:px-4">
      <div className="flex justify-between items-center mb-0.5 sm:mb-1">
        <span className="text-xs sm:text-sm font-bold text-purple-700">
          📖 Page {current} of {total}
        </span>
        <span className="text-xs sm:text-sm font-bold text-purple-700">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full bg-purple-100 rounded-full h-3 sm:h-4 border-2 border-purple-300 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-linear-to-r from-pink to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
