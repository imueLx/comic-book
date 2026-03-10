"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ComicPage } from "../data/comicPages";
import SpeechBubble from "./SpeechBubble";
import Chalkboard from "./Chalkboard";
import Quiz from "./Quiz";
import { TomTheCat } from "./CharacterAvatar";

interface ComicPageViewProps {
  page: ComicPage;
}

const sceneEmojis: Record<string, string> = {
  classroom: "🏫",
  "classroom-board": "🏫",
  reading: "📚",
  practice: "✏️",
  quiz: "🧩",
  happy: "😊",
  celebration: "🎉",
  cover: "📖",
};

export default function ComicPageView({ page }: ComicPageViewProps) {
  const [clickedWords, setClickedWords] = useState<Set<string>>(new Set());
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleWordClick = useCallback((word: string) => {
    setClickedWords((prev) => new Set(prev).add(word));
  }, []);

  const showTom = page.pageNumber === 4 || page.pageNumber === 1;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-4"
      >
        <span className="text-lg sm:text-2xl">
          {sceneEmojis[page.scene || "classroom"]}
        </span>
        <h2 className="text-xl sm:text-3xl font-extrabold text-purple-800">
          {page.title}
        </h2>
        <span className="text-lg sm:text-2xl">
          {sceneEmojis[page.scene || "classroom"]}
        </span>
      </motion.div>

      {/* Comic Panel */}
      <div className="comic-panel w-full max-w-2xl bg-white/95 p-3 sm:p-6">
        {/* Dialog bubbles */}
        <div className="space-y-2">
          {page.dialog.map((line, i) => (
            <SpeechBubble
              key={i}
              character={line.character}
              text={line.text}
              delay={i}
              highlightPattern={page.highlightPattern}
              onWordClick={handleWordClick}
            />
          ))}
        </div>

        {/* Chalkboard */}
        {page.boardWords && !page.isQuiz && (
          <Chalkboard words={page.boardWords} label={page.boardLabel} />
        )}

        {/* Quiz */}
        {page.isQuiz &&
          page.quizSentence &&
          page.quizAnswer &&
          page.quizOptions && (
            <Quiz
              sentence={page.quizSentence}
              answer={page.quizAnswer}
              options={page.quizOptions}
              onCorrect={() => setQuizCompleted(true)}
            />
          )}

        {/* Tom the cat appears on certain pages */}
        {showTom && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-2 justify-end mt-3"
          >
            <span className="text-sm italic text-amber-700">
              {page.pageNumber === 4 ? "Tom sits on the mat! 🐱" : "Meow!"}
            </span>
            <TomTheCat size="sm" />
          </motion.div>
        )}

        {/* Word click feedback */}
        <AnimatePresence>
          {clickedWords.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 bg-yellow-100 rounded-xl p-3 border-2 border-yellow-300 text-center"
            >
              <p className="text-sm font-bold text-yellow-800">
                🌟 You found {clickedWords.size} word
                {clickedWords.size > 1 ? "s" : ""}:{" "}
                {Array.from(clickedWords).join(", ")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quiz completed message */}
        {quizCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-center text-green-600 font-bold"
          >
            ✅ Quiz complete! Click Next to continue.
          </motion.div>
        )}
      </div>
    </div>
  );
}
