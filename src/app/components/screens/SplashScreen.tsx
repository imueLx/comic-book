"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 1200);
    const t3 = setTimeout(() => onFinish(), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-10 w-40 h-40 bg-yellow-300/10 rounded-full blur-2xl" />
      </div>

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 14 }}
        className="w-28 h-28 sm:w-36 sm:h-36 rounded-[32px] bg-white/15 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/20 shadow-2xl"
      >
        <span className="text-6xl sm:text-7xl">📖</span>
      </motion.div>

      {step >= 1 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-2"
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Word Pattern
          </h1>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-yellow-300 tracking-tight">
            Adventure
          </h1>
        </motion.div>
      )}

      {step >= 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-white/60 text-sm font-semibold mb-8 text-center">
            Learn to read through comics!
          </p>
          <div className="flex gap-3 justify-center mb-10">
            {[
              { emoji: "👩‍🏫", label: "Mia", color: "bg-blue-400/20" },
              { emoji: "👧", label: "Ana", color: "bg-pink-400/20" },
              { emoji: "👦", label: "Ben", color: "bg-green-400/20" },
              { emoji: "🐱", label: "Tom", color: "bg-amber-400/20" },
            ].map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${c.color} backdrop-blur-sm flex items-center justify-center border border-white/10`}
                >
                  <span className="text-2xl sm:text-3xl">{c.emoji}</span>
                </div>
                <span className="text-white/50 text-[10px] font-bold">
                  {c.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        className="flex gap-1.5"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            className="w-2 h-2 rounded-full bg-white/40"
          />
        ))}
      </motion.div>
    </div>
  );
}
