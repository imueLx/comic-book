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
    gradient: "from-violet-500 to-purple-600",
    accent: "bg-violet-400/20",
  },
  {
    emoji: "🐱",
    title: "Meet Tom!",
    text: "Tom the cat will guide you through each lesson.",
    gradient: "from-amber-500 to-orange-500",
    accent: "bg-amber-400/20",
  },
  {
    emoji: "⭐",
    title: "Earn Stars!",
    text: "Complete lessons and activities to earn stars and badges!",
    gradient: "from-emerald-500 to-teal-500",
    accent: "bg-emerald-400/20",
  },
  {
    emoji: "🔊",
    title: "Listen & Learn!",
    text: "Tap words to hear them. Practice reading every day!",
    gradient: "from-pink-500 to-rose-500",
    accent: "bg-pink-400/20",
  },
];

export default function OnboardingScreen({ onFinish }: OnboardingScreenProps) {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];
  const isLast = current === slides.length - 1;

  return (
    <div
      className={`min-h-dvh bg-linear-to-br ${slide.gradient} flex flex-col items-center justify-between px-6 py-10 safe-top safe-bottom transition-all duration-500 relative overflow-hidden`}
    >
      {/* Background decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-black/5 rounded-full blur-3xl" />
      </div>

      {/* Skip */}
      <div className="w-full flex justify-end relative z-10">
        {!isLast && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onFinish}
            className="text-white/60 text-sm font-bold px-3 py-1.5 rounded-full cursor-pointer"
          >
            Skip
          </motion.button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center max-w-sm"
          >
            <motion.div
              className={`w-32 h-32 sm:w-40 sm:h-40 rounded-[36px] ${slide.accent} backdrop-blur-sm flex items-center justify-center mb-8 border border-white/10`}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <span className="text-6xl sm:text-7xl">{slide.emoji}</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed font-medium">
              {slide.text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <div className="w-full max-w-sm relative z-10 space-y-5">
        {/* Dots */}
        <div className="flex gap-2 justify-center">
          {slides.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: i === current ? 24 : 8 }}
              className={`h-2 rounded-full transition-colors ${
                i === current ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          {current > 0 && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrent((c) => c - 1)}
              className="flex-1 py-3.5 rounded-2xl bg-white/15 backdrop-blur-sm text-white font-bold text-lg border border-white/20 min-h-13 cursor-pointer"
            >
              Back
            </motion.button>
          )}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => (isLast ? onFinish() : setCurrent((c) => c + 1))}
            className="flex-1 py-3.5 rounded-2xl bg-white text-violet-700 font-extrabold text-lg min-h-13 cursor-pointer shadow-lg"
          >
            {isLast ? "Let's Go! 🚀" : "Next"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
