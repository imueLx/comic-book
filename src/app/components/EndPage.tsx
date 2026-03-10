"use client";

import { motion } from "framer-motion";

export default function EndPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[60vh] text-center px-3 sm:px-4">
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
        className="text-3xl sm:text-5xl font-extrabold text-purple-800 mb-4 sm:mb-6"
      >
        The End!
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-3 sm:border-4 border-yellow-400 shadow-xl max-w-lg mb-4 sm:mb-6 mx-2"
      >
        <p className="text-base sm:text-xl text-purple-700 mb-3 sm:mb-4">
          📖 Ana and Ben became <strong>better readers</strong> because they
          learned <strong>word patterns</strong>.
        </p>
        <motion.p
          className="text-2xl font-bold text-pink-600"
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
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: 0.5,
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
        className="bg-green-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 sm:border-3 border-green-400 max-w-md shadow-lg mx-2"
      >
        <h3 className="font-bold text-green-800 text-base sm:text-lg mb-2 sm:mb-3">
          🌟 What We Learned:
        </h3>
        <ul className="text-left text-green-700 space-y-1.5 sm:space-y-2 text-sm sm:text-base">
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
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.span
            key={i}
            className="text-2xl"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              delay: i * 0.1,
              duration: 2,
              repeat: Infinity,
            }}
          >
            {["⭐", "🌟", "💫", "✨"][i % 4]}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
