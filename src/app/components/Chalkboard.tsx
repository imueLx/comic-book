"use client";

import { motion } from "framer-motion";
import { speakWord } from "../lib/audio";
import WordVisualIcon from "./WordVisualIcon";
import {
  getWordIconKey,
  getDisplayWord,
  normalizeWordKey,
} from "../lib/wordVisuals";

interface ChalkboardProps {
  words: string[];
  label?: string;
}

function getWordGridClass(count: number): string {
  if (count === 4) return "grid-cols-2";
  if (count <= 3) return "grid-cols-3";
  return "grid-cols-2 sm:grid-cols-3";
}

function getWordParts(raw: string) {
  const display = getDisplayWord(raw);
  const speak = normalizeWordKey(display);
  return {
    display,
    speak,
    iconKey: getWordIconKey(display),
  };
}

export default function Chalkboard({ words, label }: ChalkboardProps) {
  const gridColsClass = getWordGridClass(words.length);

  const handleWordClick = (word: string) => {
    const clean = word.replace(/[^a-zA-Z]/g, "");
    if (clean)
      speakWord(clean).catch(() => {
        /* speech unavailable — no-op */
      });
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
      <div className={`grid ${gridColsClass} gap-2.5`}>
        {words.map((word, i) => {
          const { display, speak, iconKey } = getWordParts(word);
          return (
            <motion.button
              key={`${word}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.15 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleWordClick(speak || display)}
              className="rounded-2xl border-2 border-sky-300/40 bg-white/10 p-2 text-center min-h-24 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-white/15 transition-colors"
              aria-label={`Listen to ${display}`}
            >
              <WordVisualIcon
                iconKey={iconKey}
                label={display}
                className="h-10 w-10"
              />
              <span className="text-white text-lg font-extrabold leading-tight">
                {display}
              </span>
              <span className="text-[11px] text-white/70 font-bold">
                Tap to hear
              </span>
            </motion.button>
          );
        })}
      </div>
      <p className="text-white/50 text-xs mt-2">
        Tap image or word to hear it!
      </p>
    </motion.div>
  );
}
