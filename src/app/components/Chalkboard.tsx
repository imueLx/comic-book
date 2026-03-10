"use client";

import { motion } from "framer-motion";

interface ChalkboardProps {
  words: string[];
  label?: string;
}

export default function Chalkboard({ words, label }: ChalkboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="chalkboard my-4 mx-auto max-w-md text-center"
    >
      {label && (
        <p className="text-yellow-300 text-sm mb-2 underline">{label}</p>
      )}
      <div className="flex flex-wrap gap-4 justify-center">
        {words.map((word, i) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.15 }}
            whileHover={{ scale: 1.2, color: "#FFD700" }}
            className="text-white text-2xl cursor-pointer px-3 py-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            {word}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
