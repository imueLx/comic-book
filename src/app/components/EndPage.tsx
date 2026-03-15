"use client";

import { motion } from "framer-motion";
import { EndIllustration } from "./ComicIllustration";

export default function EndPage() {
  const recapCards = [
    {
      icon: "✅",
      title: "Word Patterns",
      text: "Patterns help us read faster.",
    },
    {
      icon: "🏠",
      title: "Word Families",
      text: "Same endings make reading easier.",
    },
    { icon: "🐱", title: "-at Family", text: "cat, bat, hat, mat" },
    { icon: "🌀", title: "-an Family", text: "fan, man, pan, ran, van, can" },
    { icon: "🔤", title: "Short Vowels", text: "pig, pen, cup, bed" },
    { icon: "🔗", title: "Blends", text: "sh, br, fr work together." },
    {
      icon: "🧩",
      title: "Context Clues",
      text: "Clues help us pick the right word.",
    },
    {
      icon: "⭐",
      title: "Practice",
      text: "Practice makes reading fun and strong.",
    },
  ];

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
        className="bg-linear-to-br from-emerald-50 via-white to-sky-50 rounded-2xl p-4 sm:p-5 max-w-xl shadow-sm mx-2 border-2 border-emerald-200"
      >
        <h3 className="font-extrabold text-emerald-700 text-base sm:text-lg mb-2 sm:mb-3">
          ⭐ Quick Learning Recap
        </h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {recapCards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border-2 border-emerald-200 bg-white px-3 py-2 text-left"
            >
              <p className="text-sm font-black text-emerald-800">
                {card.icon} {card.title}
              </p>
              <p className="mt-0.5 text-xs font-semibold text-emerald-700">
                {card.text}
              </p>
            </div>
          ))}
        </div>
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
