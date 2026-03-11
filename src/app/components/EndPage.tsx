"use client";

import { motion } from "framer-motion";
import { EndIllustration } from "./ComicIllustration";

export default function EndPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[60vh] text-center px-3 sm:px-4 overflow-hidden">
      <div className="comic-burst" aria-hidden />
      {/* Celebration */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-4xl sm:text-6xl mb-3 sm:mb-4"
      >
        🎉🎊🎉
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="comic-title text-4xl sm:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6"
      >
        The End!
      </motion.h2>

      {/* Celebration Illustration */}
      <EndIllustration />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="app-card p-4 sm:p-6 max-w-lg mb-4 sm:mb-6 mx-2 border-4 border-emerald-300 relative"
        style={{ boxShadow: "6px 6px 0 #111827" }}
      >
        <span className="sfx-tag left-4 -top-5">YAY!</span>
        <p className="text-base sm:text-xl text-gray-600 mb-3 sm:mb-4">
          📖 Ana and Ben became <strong>better readers</strong> because they
          learned <strong>word patterns</strong>.
        </p>
        <motion.p
          className="text-2xl font-bold text-violet-600"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎵 Hooray for reading! 🎵
        </motion.p>
      </motion.div>

      {/* Characters celebrating */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex gap-2 sm:gap-3 text-3xl sm:text-5xl mb-4 sm:mb-6"
      >
        {["👩‍🏫", "👧", "👦", "🐱"].map((emoji, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -15, 0] }}
            transition={{
              delay: i * 0.15,
              duration: 1.2,
              repeat: 3,
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>

      {/* What we learned */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="bg-emerald-50 rounded-2xl p-4 sm:p-5 max-w-md shadow-sm mx-2 border-2 border-emerald-200"
      >
        <h3 className="font-extrabold text-emerald-700 text-base sm:text-lg mb-2 sm:mb-3">
          🌟 What We Learned:
        </h3>
        <ul className="text-left text-emerald-600 space-y-1.5 sm:space-y-2 text-sm sm:text-base">
          <li>
            ✅ The <strong>–at</strong> word family: cat, bat, hat, mat
          </li>
          <li>
            ✅ The <strong>–an</strong> word family: fan, man, pan, ran, van,
            can
          </li>
          <li>
            ✅ <strong>Short vowels</strong>: pig, pen, cup, bed
          </li>
          <li>
            ✅ <strong>Blends</strong>: sh, br, fr
          </li>
          <li>
            ✅ Using <strong>context clues</strong> to pick the right word
          </li>
        </ul>
      </motion.div>

      {/* Confetti stars */}
      <div className="flex gap-2 mt-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={i}
            className="text-2xl"
            animate={{
              y: [0, -15, 0],
              opacity: [1, 0.6, 1],
            }}
            transition={{
              delay: i * 0.1,
              duration: 2,
              repeat: 2,
            }}
          >
            {["⭐", "🌟", "💫", "✨", "⭐"][i]}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
