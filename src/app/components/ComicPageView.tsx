"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ComicPage } from "../data/comicPages";
import SpeechBubble from "./SpeechBubble";
import Chalkboard from "./Chalkboard";
import Quiz from "./Quiz";
import { TomTheCat } from "./CharacterAvatar";
import SceneIllustration from "./SceneIllustration";
import {
  narrateAllDialog,
  stopSpeaking,
  isSpeechSupported,
} from "../lib/audio";

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

const sceneLabels: Record<string, string> = {
  classroom: "Classroom Time",
  "classroom-board": "Word Board",
  reading: "Reading Time",
  practice: "Practice Zone",
  quiz: "Quiz Corner",
  happy: "Happy Ending",
  celebration: "Celebrate",
  cover: "Story Start",
};

const pageSfx: Record<number, string> = {
  2: "TADA!",
  3: "WRITE!",
  4: "MEOW!",
  5: "READ!",
  6: "WHOOSH!",
  7: "PRACTICE!",
  8: "ZAP!",
  9: "SWISH!",
  10: "THINK!",
  11: "YAY!",
  12: "HOORAY!",
};

export default function ComicPageView({ page }: ComicPageViewProps) {
  const [clickedWords, setClickedWords] = useState<Set<string>>(new Set());
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [activeLineIndex, setActiveLineIndex] = useState(-1);
  const [speechOk, setSpeechOk] = useState(true);

  useEffect(() => {
    setSpeechOk(isSpeechSupported());
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleWordClick = useCallback((word: string) => {
    setClickedWords((prev) => new Set(prev).add(word));
  }, []);

  const handleReadAloud = useCallback(async () => {
    if (isReading) {
      stopSpeaking();
      setIsReading(false);
      setActiveLineIndex(-1);
      return;
    }
    setIsReading(true);
    try {
      await narrateAllDialog(page.dialog, (idx) => setActiveLineIndex(idx));
    } catch {
      setSpeechOk(false);
    } finally {
      setIsReading(false);
      setActiveLineIndex(-1);
    }
  }, [isReading, page.dialog]);

  const showTom = page.pageNumber === 4 || page.pageNumber === 1;
  const sceneKey = page.scene || "classroom";
  const sfx = pageSfx[page.pageNumber] || "POW!";

  return (
    <div
      className="flex flex-col items-center w-full comic-book-stage"
      data-scene={sceneKey}
    >
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3"
      >
        <span className="text-lg sm:text-2xl">{sceneEmojis[sceneKey]}</span>
        <h2
          className="text-xl sm:text-3xl font-extrabold text-gray-900"
          style={{
            fontFamily: "var(--font-comic), var(--font-baloo), sans-serif",
            letterSpacing: "0.03em",
          }}
        >
          {page.title}
        </h2>
        <span className="text-lg sm:text-2xl">{sceneEmojis[sceneKey]}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="panel-strip w-full max-w-2xl mb-3"
      >
        <div className="scene-panel">
          <p className="text-[11px] font-bold text-gray-500 uppercase">Scene</p>
          <p className="text-sm font-extrabold text-gray-800">
            {sceneLabels[sceneKey]}
          </p>
        </div>
        <div className="scene-panel">
          <p className="text-[11px] font-bold text-gray-500 uppercase">Focus</p>
          <p className="text-sm font-extrabold text-gray-800">
            Page {page.pageNumber}
          </p>
        </div>
        <div className="scene-panel">
          <p className="text-[11px] font-bold text-gray-500 uppercase">
            Power Word
          </p>
          <p className="text-sm font-extrabold text-gray-800">
            {page.highlightPattern ? `-${page.highlightPattern}` : "Read!"}
          </p>
        </div>
      </motion.div>

      {/* Comic Panel */}
      <div className="comic-panel w-full max-w-2xl p-3 sm:p-6 relative comic-scene-frame">
        <div className="comic-speed-lines" />
        <span className="page-badge">
          #{String(page.pageNumber).padStart(2, "0")}
        </span>
        <span className="sfx-tag">{sfx}</span>
        <span className="sticker-bolt" aria-hidden>
          ⚡
        </span>
        <span className="sticker-star" aria-hidden>
          ⭐
        </span>

        {/* Scene Illustration Panel */}
        <SceneIllustration scene={sceneKey} className="mb-3 sm:mb-4" />

        {/* Read Aloud Button */}
        {speechOk && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReadAloud}
            className={`relative z-1 mx-auto mb-3 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border-2 border-gray-900 cursor-pointer transition-colors ${
              isReading
                ? "bg-red-100 text-red-700"
                : "bg-violet-50 text-violet-700 hover:bg-violet-100"
            }`}
            style={{
              boxShadow: "2px 2px 0 #111827",
              fontFamily: "var(--font-comic), var(--font-baloo), sans-serif",
            }}
          >
            <span className="text-base">{isReading ? "⏹️" : "🔊"}</span>
            {isReading ? "Stop Reading" : "Read Aloud"}
          </motion.button>
        )}

        {/* Dialog bubbles */}
        <div className="comic-dialog-grid sm:grid-cols-2">
          {page.dialog.map((line, i) => (
            <motion.div
              key={`${line.character}-${i}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className={`comic-dialog-cell ${line.character === "narrator" ? "comic-dialog-cell-wide sm:col-span-2" : ""} ${
                i % 3 === 0
                  ? "comic-tilt-left"
                  : i % 3 === 1
                    ? "comic-tilt-right"
                    : ""
              } ${activeLineIndex === i ? "ring-3 ring-violet-400 ring-offset-2 scale-[1.02]" : ""}`}
            >
              <SpeechBubble
                character={line.character}
                text={line.text}
                delay={i}
                highlightPattern={page.highlightPattern}
                onWordClick={handleWordClick}
              />
            </motion.div>
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
              className="mt-3 bg-linear-to-b from-amber-50 to-yellow-50 rounded-2xl p-3 text-center border-2 border-amber-200"
            >
              <p className="text-sm font-bold text-amber-700">
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
