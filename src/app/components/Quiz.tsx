"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WordVisualIcon from "./WordVisualIcon";
import { getWordIconKey } from "../lib/wordVisuals";

interface QuizProps {
  sentence: string;
  answer: string;
  options: string[];
  onCorrect: () => void;
}

function getQuizGridClass(count: number): string {
  if (count === 4) return "grid-cols-2";
  if (count <= 3) return "grid-cols-3";
  return "grid-cols-2 sm:grid-cols-3";
}

export default function Quiz({
  sentence,
  answer,
  options,
  onCorrect,
}: QuizProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const gridColsClass = getQuizGridClass(options.length);

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
      className="quiz-card app-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 my-3 sm:my-4 max-w-lg mx-auto"
    >
      <h3 className="text-center text-gray-900 text-base sm:text-lg font-extrabold mb-2">
        🧩 Quiz Time!
      </h3>

      <div className="quiz-sentence text-center text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 bg-linear-to-b from-amber-50 to-yellow-50 rounded-2xl p-3 sm:p-4">
        {filledSentence}
      </div>

      <div className={`grid ${gridColsClass} gap-2 sm:gap-3`}>
        {options.map((option) => {
          let buttonClass =
            "kid-choice-btn text-base sm:text-lg min-h-24 p-2.5 flex flex-col items-center justify-center gap-1.5 ";

          if (selected === option) {
            buttonClass += isCorrect
              ? "bg-emerald-400 border-emerald-500 text-white scale-103"
              : "bg-red-400 border-red-500 text-white animate-[shake_0.5s]";
          } else if (selected) {
            buttonClass += "bg-gray-100 border-gray-200 text-gray-400";
          } else {
            buttonClass += "hover:bg-violet-100 hover:scale-102 cursor-pointer";
          }

          return (
            <motion.button
              key={option}
              whileHover={!selected ? { scale: 1.1 } : {}}
              whileTap={!selected ? { scale: 0.95 } : {}}
              onClick={() => !selected && handleSelect(option)}
              className={`quiz-option ${buttonClass}`}
              disabled={!!selected}
            >
              <WordVisualIcon
                iconKey={getWordIconKey(option)}
                label={option}
                className="h-9 w-9"
              />
              <span className="leading-tight">{option}</span>
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
              className="kid-btn kid-btn-neutral mt-2 px-4 py-2 text-violet-700"
            >
              Try Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
