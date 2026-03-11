"use client";

import { motion } from "framer-motion";
import { Character } from "../data/comicPages";
import CharacterAvatar, { CharacterName } from "./CharacterAvatar";

interface SpeechBubbleProps {
  character: Character;
  text: string;
  delay?: number;
  highlightPattern?: string;
  onWordClick?: (word: string) => void;
}

const bubbleColors: Record<Character, { bg: string; border: string }> = {
  teacher: { bg: "#D4F1F9", border: "#4FC3F7" },
  ana: { bg: "#FFE4F0", border: "#F48FB1" },
  ben: { bg: "#E8F5E9", border: "#81C784" },
  students: { bg: "#FFF3E0", border: "#FFB74D" },
  narrator: { bg: "#FFF9C4", border: "#FFD54F" },
};

function highlightWords(
  text: string,
  pattern: string | undefined,
  onWordClick?: (word: string) => void,
) {
  if (!pattern) return <>{text}</>;

  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => {
        const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
        const isHighlighted =
          cleanWord.length > 1 && cleanWord.endsWith(pattern.toLowerCase());

        if (isHighlighted) {
          return (
            <span key={i}>
              <motion.span
                className="word-highlight bg-amber-200 text-gray-900 rounded-lg"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 1.4 }}
                onClick={() => onWordClick?.(word)}
                role="button"
                tabIndex={0}
              >
                {word}
              </motion.span>
              {i < words.length - 1 ? " " : ""}
            </span>
          );
        }
        return (
          <span key={i}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </>
  );
}

export default function SpeechBubble({
  character,
  text,
  delay = 0,
  highlightPattern,
  onWordClick,
}: SpeechBubbleProps) {
  const colors = bubbleColors[character];
  const isNarrator = character === "narrator";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: delay * 0.15, duration: 0.4, ease: "easeOut" }}
      className="flex gap-2 sm:gap-3 items-start mb-3 sm:mb-4"
    >
      {!isNarrator && <CharacterAvatar character={character} size="sm" />}

      <div className="flex-1 min-w-0">
        {!isNarrator && <CharacterName character={character} />}
        <div
          className={`relative rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-md ${
            isNarrator
              ? "italic text-center border-2 border-dashed"
              : "border-2"
          }`}
          style={{
            backgroundColor: colors.bg,
            borderColor: colors.border,
          }}
        >
          <p
            className={`${
              isNarrator ? "text-sm sm:text-base" : "text-base sm:text-lg"
            } leading-relaxed wrap-break-word`}
          >
            {highlightWords(text, highlightPattern, onWordClick)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
