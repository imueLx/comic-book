"use client";

import { motion } from "framer-motion";
import { speakWord, isSpeaking, isSpeechSupported } from "../lib/audio";
import { useState, useEffect } from "react";

interface AudioButtonProps {
  word: string;
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const sizes = {
  sm: "w-9 h-9 text-sm",
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
  const [unsupported, setUnsupported] = useState(false);

  useEffect(() => {
    setUnsupported(!isSpeechSupported());
  }, []);

  const handlePlay = async () => {
    if (unsupported || isSpeaking()) return;
    setPlaying(true);
    try {
      await speakWord(word);
    } catch {
      setUnsupported(true);
    } finally {
      setPlaying(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handlePlay}
      className={`${sizes[size]} rounded-full flex items-center justify-center min-h-11 min-w-11 cursor-pointer shadow-md text-white ${playing ? "bg-linear-to-b from-emerald-400 to-emerald-500" : "bg-linear-to-b from-violet-400 to-purple-500"} ${className}`}
      aria-label={unsupported ? `Word: ${word}` : `Listen to ${word}`}
      title={
        unsupported
          ? "Audio not available on this device"
          : `Listen to "${word}"`
      }
    >
      {unsupported ? (
        "🔇"
      ) : playing ? (
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
