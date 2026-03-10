"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OnboardingScreenProps {
  onFinish: () => void;
}

const slides = [
  {
    emoji: "📖",
    title: "Welcome!",
    text: "Learn to read with fun comics and word games!",
    bg: "from-sky to-lavender",
  },
  {
    emoji: "🐱",
    title: "Meet Tom!",
    text: "Tom the cat will guide you through each lesson.",
    bg: "from-peach to-pink",
  },
  {
    emoji: "⭐",
    title: "Earn Stars!",
    text: "Complete lessons and activities to earn stars and badges!",
    bg: "from-mint to-sky",
  },
  {
    emoji: "🔊",
    title: "Listen & Learn!",
    text: "Tap words to hear them. Practice reading every day!",
    bg: "from-lavender to-peach",
  },
];

export default function OnboardingScreen({ onFinish }: OnboardingScreenProps) {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];
  const isLast = current === slides.length - 1;

  return (
    <div
      className={`min-h-dvh bg-linear-to-b ${slide.bg} flex flex-col items-center justify-center px-4 py-8`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center text-center max-w-sm"
        >
          <motion.span
            className="text-7xl sm:text-8xl mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {slide.emoji}
          </motion.span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-800 mb-3">
            {slide.title}
          </h2>

          <p className="text-lg sm:text-xl text-purple-700 leading-relaxed mb-8">
            {slide.text}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex gap-2 mb-6">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-purple-600 scale-125" : "bg-purple-300"
            }`}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 w-full max-w-xs">
        {current > 0 && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrent((c) => c - 1)}
            className="flex-1 py-3 rounded-full bg-white/70 text-purple-700 font-bold text-lg border-2 border-purple-300 min-h-12 cursor-pointer"
          >
            Back
          </motion.button>
        )}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => (isLast ? onFinish() : setCurrent((c) => c + 1))}
          className="flex-1 py-3 rounded-full bg-purple-600 text-white font-bold text-lg shadow-lg min-h-12 cursor-pointer"
        >
          {isLast ? "Let's Go! 🚀" : "Next →"}
        </motion.button>
      </div>
    </div>
  );
}
