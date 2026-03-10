"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ConfettiProps {
  show: boolean;
  duration?: number;
}

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  emoji: ["⭐", "🌟", "✨", "💫", "🎉", "🎊", "❤️", "💛", "💚", "💜"][i % 10],
  x: Math.random() * 100,
  delay: Math.random() * 0.5,
  duration: 1.5 + Math.random() * 1.5,
}));

export default function Confetti({ show, duration = 3000 }: ConfettiProps) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      const frame = requestAnimationFrame(() => setVisible(true));
      const timer = setTimeout(() => setVisible(false), duration);
      return () => {
        cancelAnimationFrame(frame);
        clearTimeout(timer);
      };
    }
  }, [show, duration]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, scale: 0.5 }}
          animate={{
            y: "110vh",
            opacity: [1, 1, 0],
            scale: [0.5, 1.2, 0.8],
            rotate: [0, 360, 720],
          }}
          transition={{
            delay: p.delay,
            duration: p.duration,
            ease: "easeIn",
          }}
          className="absolute text-2xl sm:text-3xl"
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}
