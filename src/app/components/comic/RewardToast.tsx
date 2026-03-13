"use client";

import { AnimatePresence, motion } from "framer-motion";

interface RewardToastProps {
  show: boolean;
  text: string;
}

export default function RewardToast({ show, text }: RewardToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-26 left-1/2 z-30 w-[90%] max-w-sm -translate-x-1/2 rounded-2xl border-3 border-gray-900 bg-yellow-300 px-4 py-2 text-center text-sm font-black text-gray-900 shadow-[4px_4px_0_#111827]"
        >
          ⭐ {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
