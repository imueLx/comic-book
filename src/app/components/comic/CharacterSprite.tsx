"use client";

import { motion } from "framer-motion";
import { ComicCharacterOnStage } from "../../data/comicLessonPages";

interface CharacterSpriteProps {
  character: ComicCharacterOnStage;
}

const spriteMap = {
  teacher: { emoji: "👩‍🏫", name: "Teacher Mia", color: "#7dd3fc" },
  ana: { emoji: "👧", name: "Ana", color: "#f9a8d4" },
  ben: { emoji: "👦", name: "Ben", color: "#86efac" },
  tom: { emoji: "🐱", name: "Tom", color: "#fcd34d" },
};

const poseSfx = {
  pointing: "TEACH!",
  listening: "LISTEN",
  thinking: "THINK",
  cheering: "YAY",
};

export default function CharacterSprite({ character }: CharacterSpriteProps) {
  const sprite = spriteMap[character.id];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex flex-col items-center"
    >
      <span className="absolute -top-2 rounded-full bg-white px-2 py-0.5 text-[10px] font-black tracking-wide text-gray-700 border border-gray-300">
        {poseSfx[character.pose]}
      </span>
      <div
        className="mt-3 flex h-16 w-16 items-center justify-center rounded-full border-3 border-gray-900 text-3xl shadow-[3px_3px_0_#111827]"
        style={{ backgroundColor: sprite.color }}
      >
        <span role="img" aria-label={sprite.name}>
          {sprite.emoji}
        </span>
      </div>
      <p className="mt-1 text-xs font-extrabold text-gray-700">{sprite.name}</p>
    </motion.div>
  );
}
