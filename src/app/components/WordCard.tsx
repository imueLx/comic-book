"use client";

import { motion } from "framer-motion";
import AudioButton from "./AudioButton";
import WordVisualIcon from "./WordVisualIcon";
import { getWordIconKey } from "../lib/wordVisuals";

interface WordCardProps {
  word: string;
  highlight?: string;
  onClick?: () => void;
  selected?: boolean;
  correct?: boolean | null;
  disabled?: boolean;
  showAudio?: boolean;
  showIcon?: boolean;
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
  showIcon = false,
  size = "md",
}: WordCardProps) {
  let borderColor = "border-gray-200";
  let bgColor = "bg-white";

  if (selected && correct === true) {
    borderColor = "border-emerald-400";
    bgColor = "bg-emerald-50";
  } else if (selected && correct === false) {
    borderColor = "border-red-400";
    bgColor = "bg-red-50";
  } else if (selected) {
    borderColor = "border-violet-400";
    bgColor = "bg-violet-50";
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
    <motion.div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.();
        }
      }}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled}
      className={`${cardSizes[size]} ${bgColor} ${borderColor} rounded-2xl border-2 shadow-sm font-bold min-h-12 min-w-16 flex items-center gap-2 justify-center transition-all cursor-pointer ${showIcon ? "flex-col py-3 px-3 min-h-24" : ""} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      {showAudio && (
        <span onClick={(e) => e.stopPropagation()}>
          <AudioButton word={word} size="sm" />
        </span>
      )}
      {showIcon && (
        <WordVisualIcon
          iconKey={getWordIconKey(word)}
          label={word}
          className="h-9 w-9"
        />
      )}
      <span className={showIcon ? "text-base leading-tight" : ""}>
        {renderWord()}
      </span>
    </motion.div>
  );
}
