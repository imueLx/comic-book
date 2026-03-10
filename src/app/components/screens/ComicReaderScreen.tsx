"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { comicPages } from "../../data/comicPages";
import { Lesson } from "../../lib/types";
import SpeechBubble from "../SpeechBubble";
import Chalkboard from "../Chalkboard";
import { TomTheCat } from "../CharacterAvatar";
import ProgressBar from "../ProgressBar";
import AudioButton from "../AudioButton";
import { narrateDialog } from "../../lib/audio";

interface ComicReaderScreenProps {
  lesson: Lesson;
  audioEnabled: boolean;
  onFinish: (pagesRead: number[]) => void;
  onBack: () => void;
}

export default function ComicReaderScreen({
  lesson,
  audioEnabled,
  onFinish,
  onBack,
}: ComicReaderScreenProps) {
  const pages = lesson.comicPages
    .map((pn) => comicPages.find((cp) => cp.pageNumber === pn)!)
    .filter(Boolean);
  const [index, setIndex] = useState(0);
  const [clickedWords, setClickedWords] = useState<Set<string>>(new Set());
  const page = pages[index];

  // Swipe
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const goNext = useCallback(() => {
    if (index < pages.length - 1) setIndex((i) => i + 1);
    else onFinish(lesson.comicPages);
  }, [index, pages.length, onFinish, lesson.comicPages]);

  const goPrev = useCallback(() => {
    if (index > 0) setIndex((i) => i - 1);
  }, [index]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  // Auto-narrate first dialog on page change
  useEffect(() => {
    if (audioEnabled && page?.dialog[0]) {
      const t = setTimeout(() => {
        narrateDialog(page.dialog[0].character, page.dialog[0].text);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [index, audioEnabled, page]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) goNext();
        else goPrev();
      }
      touchStartX.current = null;
      touchStartY.current = null;
    },
    [goNext, goPrev],
  );

  if (!page) return null;

  const showTom = page.pageNumber === 4;
  const isLastPage = index === pages.length - 1;

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

  return (
    <div
      className={`min-h-dvh ${page.background} flex flex-col transition-colors duration-500`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-sm border-b-2 border-purple-300 py-2 px-3 sticky top-0 z-10 safe-top">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="text-sm font-bold text-purple-600 flex items-center gap-1 min-h-9 cursor-pointer"
            >
              ← Back
            </motion.button>
            <span className="text-xs font-bold text-purple-500">
              {index + 1} / {pages.length}
            </span>
          </div>
          <ProgressBar current={index + 1} total={pages.length} />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-2 sm:px-4 py-3 max-w-2xl mx-auto w-full overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {/* Page title */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5 mb-2 justify-center"
            >
              <span className="text-lg">
                {sceneEmojis[page.scene || "classroom"]}
              </span>
              <h2 className="text-lg sm:text-2xl font-extrabold text-purple-800">
                {page.title}
              </h2>
            </motion.div>

            {/* Comic panel */}
            <div className="comic-panel w-full bg-white/95 p-3 sm:p-5">
              <div className="space-y-2">
                {page.dialog.map((line, i) => (
                  <div key={i} className="flex items-start gap-1">
                    <div className="flex-1">
                      <SpeechBubble
                        character={line.character}
                        text={line.text}
                        delay={i}
                        highlightPattern={page.highlightPattern}
                        onWordClick={(word) => {
                          setClickedWords((prev) => new Set(prev).add(word));
                        }}
                      />
                    </div>
                    {audioEnabled && line.character !== "narrator" && (
                      <AudioButton
                        word={line.text}
                        size="sm"
                        className="mt-5 shrink-0"
                      />
                    )}
                  </div>
                ))}
              </div>

              {page.boardWords && (
                <Chalkboard words={page.boardWords} label={page.boardLabel} />
              )}

              {showTom && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center gap-2 justify-end mt-2"
                >
                  <span className="text-xs italic text-amber-700">
                    Tom sits on the mat! 🐱
                  </span>
                  <TomTheCat size="sm" />
                </motion.div>
              )}

              {clickedWords.size > 0 && (
                <div className="mt-2 bg-yellow-100 rounded-lg p-2 border border-yellow-300 text-center">
                  <p className="text-xs font-bold text-yellow-800">
                    🌟 Words found: {Array.from(clickedWords).join(", ")}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav footer */}
      <footer className="bg-white/70 backdrop-blur-sm border-t-2 border-purple-300 py-2 px-3 sticky bottom-0 safe-bottom">
        <div className="max-w-2xl mx-auto flex justify-between items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={goPrev}
            disabled={index === 0}
            className="px-4 py-2.5 rounded-full font-bold border-2 min-h-11 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-blue-400 border-blue-500 text-white"
          >
            ⬅️
          </motion.button>

          <div className="flex gap-1">
            {pages.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${i === index ? "bg-purple-600 scale-125" : i < index ? "bg-purple-300" : "bg-gray-300"}`}
              />
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={goNext}
            className="px-4 py-2.5 rounded-full font-bold border-2 min-h-11 cursor-pointer bg-green-500 border-green-600 text-white"
          >
            {isLastPage ? "Done ✅" : "➡️"}
          </motion.button>
        </div>
      </footer>
    </div>
  );
}
