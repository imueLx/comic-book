"use client";

import { motion } from "framer-motion";
import CharacterAvatar, { TomTheCat } from "./CharacterAvatar";
import { CoverIllustration } from "./ComicIllustration";

export default function CoverPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[60vh] text-center px-3 sm:px-4 overflow-hidden">
      <div className="comic-burst" aria-hidden />

      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative z-1 mb-2"
      >
        <h1 className="comic-title text-3xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight">
          ✨ The Word Pattern ✨
        </h1>
        <h1 className="comic-title text-3xl sm:text-6xl md:text-7xl font-extrabold text-violet-600">
          Adventure
        </h1>
      </motion.div>

      {/* Scene Illustration */}
      <CoverIllustration />

      {/* Characters */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex items-end gap-2 sm:gap-4 mb-4 sm:mb-8"
      >
        <div className="flex flex-col items-center">
          <CharacterAvatar character="teacher" size="lg" />
          <span className="text-sm font-bold text-blue-700 mt-1">
            Teacher Mia
          </span>
        </div>

        <div className="flex flex-col items-center">
          <CharacterAvatar character="ana" size="lg" />
          <span className="text-sm font-bold text-pink-700 mt-1">Ana</span>
        </div>

        <div className="flex flex-col items-center">
          <CharacterAvatar character="ben" size="lg" />
          <span className="text-sm font-bold text-green-700 mt-1">Ben</span>
        </div>

        <motion.div
          className="flex flex-col items-center"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <TomTheCat size="lg" />
          <span className="text-sm font-bold text-amber-700 mt-1">
            Tom the Cat
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="app-card px-4 sm:px-8 py-3 sm:py-4 max-w-lg mx-2 border-4 border-violet-300 relative"
        style={{ boxShadow: "6px 6px 0 #111827" }}
      >
        <span className="sfx-tag left-3 -top-5">WOW!</span>
        <p className="text-sm sm:text-lg text-gray-600">
          📚 A comic story that helps <strong>Grade 3</strong> learners read
          words correctly using <strong>word patterns</strong>.
        </p>
      </motion.div>

      {/* Stars decoration */}
      <motion.div
        className="flex gap-2 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {["⭐", "🌟", "⭐", "🌟", "⭐"].map((star, i) => (
          <motion.span
            key={i}
            className="text-3xl"
            animate={{ y: [0, -8, 0] }}
            transition={{
              delay: i * 0.2,
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            {star}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
