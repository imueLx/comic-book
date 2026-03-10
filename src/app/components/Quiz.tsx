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
      className="bg-white/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border-3 sm:border-4 border-purple-300 my-3 sm:my-4 max-w-lg mx-auto"
    >
      <h3 className="text-center text-purple-800 text-base sm:text-lg font-bold mb-2">
        🧩 Quiz Time!
      </h3>

      <div className="text-center text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 bg-yellow-100 rounded-xl p-3 sm:p-4 border-2 border-yellow-300">
        {filledSentence}
      </div>

      <div className="flex gap-2 sm:gap-3 justify-center flex-wrap">
        {options.map((option) => {
          let buttonClass =
            "px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-lg sm:text-xl font-bold border-2 sm:border-3 transition-all min-h-11 ";

          if (selected === option) {
            buttonClass += isCorrect
              ? "bg-green-400 border-green-600 text-white scale-110"
              : "bg-red-400 border-red-600 text-white animate-[shake_0.5s]";
          } else if (selected) {
            buttonClass += "bg-gray-200 border-gray-300 text-gray-500";
          } else {
            buttonClass +=
              "bg-purple-100 border-purple-400 text-purple-800 hover:bg-purple-200 hover:scale-105 cursor-pointer";
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
              className="mt-2 px-4 py-2 bg-blue-400 text-white rounded-full font-bold hover:bg-blue-500 cursor-pointer"
            >
              Try Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
