"use client";

import { motion } from "framer-motion";
import { speakWord, isSpeaking } from "../lib/audio";
import { useState } from "react";

interface AudioButtonProps {
  word: string;
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const sizes = {
  sm: "w-8 h-8 text-sm",
  md: "w-11 h-11 text-lg",
  lg: "w-14 h-14 text-2xl",
};

export default function AudioButton({
  word,
  size = "md",
  label,
  className = "",
}: AudioButtonProps) {
  const [playing, setPlaying] = useState(false);

  const handlePlay = async () => {
    if (isSpeaking()) return;
    setPlaying(true);
    await speakWord(word);
    setPlaying(false);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handlePlay}
      className={`${sizes[size]} rounded-full bg-blue-400 text-white flex items-center justify-center shadow-md border-2 border-blue-500 min-h-11 min-w-11 cursor-pointer ${className}`}
      aria-label={`Listen to ${word}`}
      title={`Listen to "${word}"`}
    >
      {playing ? (
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          🔊
        </motion.span>
      ) : (
        "🔈"
      )}
      {label && <span className="ml-1 text-sm font-bold">{label}</span>}
    </motion.button>
  );
}
