"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuizProps {
  sentence: string;
  answer: string;
  options: string[];
  onCorrect: () => void;
}

export default function Quiz({
  sentence,
  answer,
  options,
  onCorrect,
}: QuizProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    const correct = option === answer;
    setIsCorrect(correct);
    if (correct) {
      setTimeout(onCorrect, 1200);
    }
  };

  const filledSentence = selected
    ? sentence.replace("___", selected)
    : sentence;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="app-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 my-3 sm:my-4 max-w-lg mx-auto"
    >
      <h3 className="text-center text-gray-900 text-base sm:text-lg font-extrabold mb-2">
        🧩 Quiz Time!
      </h3>

      <div className="text-center text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 bg-gradient-to-b from-amber-50 to-yellow-50 rounded-2xl p-3 sm:p-4">
        {filledSentence}
      </div>

      <div className="flex gap-2 sm:gap-3 justify-center flex-wrap">
        {options.map((option) => {
          let buttonClass =
            "px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-lg sm:text-xl font-bold border-2 transition-all min-h-11 ";

          if (selected === option) {
            buttonClass += isCorrect
              ? "bg-emerald-400 border-emerald-500 text-white scale-110"
              : "bg-red-400 border-red-500 text-white animate-[shake_0.5s]";
          } else if (selected) {
            buttonClass += "bg-gray-100 border-gray-200 text-gray-400";
          } else {
            buttonClass +=
              "bg-violet-50 border-violet-200 text-gray-800 hover:bg-violet-100 hover:scale-105 cursor-pointer";
          }

          return (
            <motion.button
              key={option}
              whileHover={!selected ? { scale: 1.1 } : {}}
              whileTap={!selected ? { scale: 0.95 } : {}}
              onClick={() => !selected && handleSelect(option)}
              className={buttonClass}
              disabled={!!selected}
            >
              {option}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {isCorrect === true && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4"
          >
            <span className="text-3xl">🎉</span>
            <p className="text-green-600 font-bold text-xl">
              Great job! That&apos;s correct!
            </p>
          </motion.div>
        )}
        {isCorrect === false && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4"
          >
            <span className="text-3xl">🤔</span>
            <p className="text-red-500 font-bold text-lg">
              Try again! Think about what a frog does.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelected(null);
                setIsCorrect(null);
              }}
              className="mt-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full font-bold cursor-pointer"
            >
              Try Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
