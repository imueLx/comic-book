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
import { narrateAllDialog, stopSpeaking } from "../../lib/audio";

interface ComicReaderScreenProps {
  lesson: Lesson;
  audioEnabled: boolean;
  autoRead: boolean;
  onFinish: (pagesRead: number[]) => void;
  onBack: () => void;
}

export default function ComicReaderScreen({
  lesson,
  audioEnabled,
  autoRead,
  onFinish,
  onBack,
}: ComicReaderScreenProps) {
  const pages = lesson.comicPages
    .map((pn) => comicPages.find((cp) => cp.pageNumber === pn)!)
    .filter(Boolean);
  const [index, setIndex] = useState(0);
  const [clickedWords, setClickedWords] = useState<Set<string>>(new Set());
  const [readingLineIdx, setReadingLineIdx] = useState(-1);
  const [isReading, setIsReading] = useState(false);
  const page = pages[index];

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

  useEffect(() => {
    if (audioEnabled && autoRead && page?.dialog?.length) {
      const t = setTimeout(() => {
        setIsReading(true);
        narrateAllDialog(
          page.dialog.map((d) => ({
            character: d.character,
            text: d.text,
          })),
          (lineIdx) => setReadingLineIdx(lineIdx),
        ).then(() => setIsReading(false));
      }, 600);
      return () => {
        clearTimeout(t);
        stopSpeaking();
      };
    }
  }, [index, audioEnabled, autoRead, page]);

  const handleReadAloud = useCallback(() => {
    if (!page || isReading) return;
    setIsReading(true);
    narrateAllDialog(
      page.dialog.map((d) => ({ character: d.character, text: d.text })),
      (lineIdx) => setReadingLineIdx(lineIdx),
    ).then(() => setIsReading(false));
  }, [page, isReading]);

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
      className="app-shell min-h-dvh flex flex-col transition-colors duration-500"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <header className="app-header py-3 px-4 sticky top-0 z-10 safe-top">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-sm cursor-pointer"
            >
              ←
            </motion.button>
            <div className="flex items-center gap-1.5">
              <span className="text-sm">
                {sceneEmojis[page.scene || "classroom"]}
              </span>
              <h2 className="text-sm font-extrabold text-gray-900 truncate max-w-45">
                {page.title}
              </h2>
            </div>
            <span className="soft-chip text-xs font-bold px-2.5 py-1 rounded-full">
              {index + 1}/{pages.length}
            </span>
          </div>
          <ProgressBar current={index + 1} total={pages.length} />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-4 py-4 max-w-2xl mx-auto w-full overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {/* Comic panel */}
            <div className="comic-panel w-full bg-white p-4 sm:p-6">
              {/* Read Aloud button */}
              {audioEnabled && (
                <div className="flex justify-end mb-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleReadAloud}
                    disabled={isReading}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold cursor-pointer transition-all min-h-10 ${
                      isReading
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-violet-50 text-violet-700 hover:bg-violet-100"
                    }`}
                    aria-label="Read page aloud"
                  >
                    {isReading ? (
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      >
                        🔊
                      </motion.span>
                    ) : (
                      <span>🔈</span>
                    )}
                    {isReading ? "Reading..." : "Read Aloud"}
                  </motion.button>
                </div>
              )}

              <div className="space-y-3">
                {page.dialog.map((line, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-1.5 transition-all duration-300 rounded-xl ${
                      readingLineIdx === i
                        ? "bg-yellow-50 ring-2 ring-yellow-300 p-1 -mx-1"
                        : ""
                    }`}
                  >
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
                        className="mt-6 shrink-0"
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
                  className="flex items-center gap-2 justify-end mt-3"
                >
                  <span className="text-xs italic text-amber-600 font-semibold">
                    Tom sits on the mat! 🐱
                  </span>
                  <TomTheCat size="sm" />
                </motion.div>
              )}

              {clickedWords.size > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-linear-to-r from-amber-50 to-yellow-50 rounded-2xl p-3 text-center"
                >
                  <p className="text-xs font-bold text-amber-700">
                    🌟 Words found: {Array.from(clickedWords).join(", ")}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation footer */}
      <footer className="app-header py-3 px-4 sticky bottom-0 safe-bottom">
        <div className="max-w-2xl mx-auto flex justify-between items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={goPrev}
            disabled={index === 0}
            className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-gray-100 text-gray-600"
          >
            ←
          </motion.button>

          <div className="flex gap-1.5">
            {pages.map((_, i) => (
              <motion.div
                key={i}
                animate={{ width: i === index ? 20 : 8 }}
                className={`h-2 rounded-full transition-colors ${
                  i === index
                    ? "bg-violet-500"
                    : i < index
                      ? "bg-violet-300"
                      : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={goNext}
            className="h-12 px-6 rounded-2xl flex items-center justify-center primary-btn font-bold text-base cursor-pointer min-w-20"
          >
            {isLastPage ? "Done ✅" : "Next →"}
          </motion.button>
        </div>
      </footer>
    </div>
  );
}
