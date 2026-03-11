"use client";

import { motion } from "framer-motion";
import { Character } from "../data/comicPages";

interface CharacterAvatarProps {
  character: Character;
  size?: "sm" | "md" | "lg";
}

const characterConfig: Record<
  Character,
  { name: string; bgColor: string; emoji: string; borderColor: string }
> = {
  teacher: {
    name: "Teacher Mia",
    bgColor: "#4FC3F7",
    emoji: "👩‍🏫",
    borderColor: "#0288D1",
  },
  ana: {
    name: "Ana",
    bgColor: "#F48FB1",
    emoji: "👧",
    borderColor: "#E91E63",
  },
  ben: {
    name: "Ben",
    bgColor: "#81C784",
    emoji: "👦",
    borderColor: "#388E3C",
  },
  students: {
    name: "Students",
    bgColor: "#FFD54F",
    emoji: "👫",
    borderColor: "#F9A825",
  },
  narrator: {
    name: "Narrator",
    bgColor: "#FFF9C4",
    emoji: "📖",
    borderColor: "#F9A825",
  },
};

const sizeClasses = {
  sm: "w-8 h-8 text-base sm:w-10 sm:h-10 sm:text-lg",
  md: "w-11 h-11 text-xl sm:w-14 sm:h-14 sm:text-2xl",
  lg: "w-14 h-14 text-2xl sm:w-20 sm:h-20 sm:text-4xl",
};

export default function CharacterAvatar({
  character,
  size = "md",
}: CharacterAvatarProps) {
  const config = characterConfig[character];
  const tiltByCharacter: Record<Character, number> = {
    teacher: -4,
    ana: -2,
    ben: 3,
    students: 0,
    narrator: 0,
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: tiltByCharacter[character] * -1 }}
      whileTap={{ scale: 0.96 }}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center border-4 shadow-lg shrink-0 relative`}
      style={{
        backgroundColor: config.bgColor,
        borderColor: "#111827",
        transform: `rotate(${tiltByCharacter[character]}deg)`,
        boxShadow: `4px 4px 0 #111827, 0 10px 24px rgba(17, 24, 39, 0.16)`,
      }}
      title={config.name}
    >
      <span className="absolute -top-1 -right-1 text-[10px] bg-white rounded-full px-1 border border-gray-200">
        ✨
      </span>
      <span role="img" aria-label={config.name}>
        {config.emoji}
      </span>
    </motion.div>
  );
}

export function CharacterName({ character }: { character: Character }) {
  const config = characterConfig[character];
  return (
    <span
      className="font-bold text-sm px-2 py-0.5 rounded-full inline-block mb-1"
      style={{
        fontFamily: "var(--font-comic), var(--font-baloo), sans-serif",
        letterSpacing: "0.04em",
        color: config.borderColor,
        backgroundColor: "rgba(255,255,255,0.9)",
        border: `2px solid ${config.borderColor}`,
        boxShadow: `2px 2px 0 ${config.borderColor}33`,
      }}
    >
      {config.name}
    </span>
  );
}

export function TomTheCat({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center border-3 shadow-lg bg-amber-200 border-amber-600 shrink-0`}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      title="Tom the Cat"
    >
      <span role="img" aria-label="Tom the Cat" className="text-2xl">
        🐱
      </span>
    </motion.div>
  );
}
