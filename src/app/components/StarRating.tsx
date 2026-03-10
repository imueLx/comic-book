"use client";

import { motion } from "framer-motion";

interface StarRatingProps {
  stars: number; // 0-3
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const sizeClass = {
  sm: "text-xl",
  md: "text-3xl",
  lg: "text-5xl",
};

export default function StarRating({
  stars,
  size = "md",
  animated = true,
}: StarRatingProps) {
  return (
    <div className="flex gap-1 justify-center">
      {[1, 2, 3].map((i) => (
        <motion.span
          key={i}
          initial={animated ? { scale: 0, rotate: -180 } : {}}
          animate={animated ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: i * 0.2, type: "spring", stiffness: 300 }}
          className={sizeClass[size]}
        >
          {i <= stars ? "⭐" : "☆"}
        </motion.span>
      ))}
    </div>
  );
}
