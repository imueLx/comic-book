"use client";

import { motion } from "framer-motion";
import { speakWord } from "../lib/audio";

interface ChalkboardProps {
  words: string[];
  label?: string;
}

export default function Chalkboard({ words, label }: ChalkboardProps) {
  const handleWordClick = (word: string) => {
    const clean = word.replace(/[^a-zA-Z]/g, "");
    if (clean) speakWord(clean);
  };

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
          <motion.button
            key={word}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.15 }}
            whileHover={{ scale: 1.2, color: "#FFD700" }}
            whileTap={{ scale: 1.3 }}
            onClick={() => handleWordClick(word)}
            className="text-white text-2xl cursor-pointer px-3 py-1 rounded-lg hover:bg-white/10 transition-colors min-h-11 flex items-center"
            aria-label={`Listen to ${word}`}
          >
            <span className="mr-1.5 text-base opacity-60">🔈</span>
            {word}
          </motion.button>
        ))}
      </div>
      <p className="text-white/40 text-xs mt-2">Tap a word to hear it!</p>
    </motion.div>
  );
}
