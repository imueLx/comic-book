"use client";

import { motion } from "framer-motion";
import AudioButton from "./AudioButton";

interface WordCardProps {
  word: string;
  highlight?: string;
  onClick?: () => void;
  selected?: boolean;
  correct?: boolean | null;
  disabled?: boolean;
  showAudio?: boolean;
  size?: "sm" | "md" | "lg";
}

const cardSizes = {
  sm: "px-3 py-2 text-base",
  md: "px-5 py-3 text-xl",
  lg: "px-6 py-4 text-2xl",
};

export default function WordCard({
  word,
  highlight,
  onClick,
  selected = false,
  correct = null,
  disabled = false,
  showAudio = false,
  size = "md",
}: WordCardProps) {
  let borderColor = "border-purple-300";
  let bgColor = "bg-white";

  if (selected && correct === true) {
    borderColor = "border-green-500";
    bgColor = "bg-green-100";
  } else if (selected && correct === false) {
    borderColor = "border-red-400";
    bgColor = "bg-red-50";
  } else if (selected) {
    borderColor = "border-purple-500";
    bgColor = "bg-purple-50";
  }

  // Highlight the word pattern suffix
  const renderWord = () => {
    if (!highlight) return word;
    const lower = word.toLowerCase();
    const idx = lower.lastIndexOf(highlight.toLowerCase());
    if (idx < 0) return word;
    return (
      <>
        {word.slice(0, idx)}
        <span className="text-pink-600 underline decoration-2 decoration-pink-400">
          {word.slice(idx)}
        </span>
      </>
    );
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${cardSizes[size]} ${bgColor} ${borderColor} rounded-2xl border-3 shadow-md font-bold min-h-12 min-w-16 flex items-center gap-2 justify-center transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {showAudio && <AudioButton word={word} size="sm" />}
      <span>{renderWord()}</span>
    </motion.button>
  );
}
