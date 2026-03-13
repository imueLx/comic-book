"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ComicPage } from "../../data/comicPages";
import ComicIllustration from "../ComicIllustration";
import WordVisualIcon from "../WordVisualIcon";
import { narrateDialog, speakWord } from "../../lib/audio";
import { getWordIconKey } from "../../lib/wordVisuals";

interface StoryComicPageProps {
  page: ComicPage;
}

const speakerName: Record<string, string> = {
  teacher: "Teacher Mia",
  ana: "Ana",
  ben: "Ben",
  tom: "Tom",
  students: "Students",
  narrator: "Narrator",
};

const speakerEmoji: Record<string, string> = {
  teacher: "👩‍🏫",
  ana: "👧",
  ben: "👦",
  tom: "🐱",
  students: "🧒",
  narrator: "📖",
};

const bubblePalette: Record<string, string> = {
  teacher: "bg-sky-100 border-sky-700",
  ana: "bg-pink-100 border-pink-700",
  ben: "bg-emerald-100 border-emerald-700",
  tom: "bg-amber-100 border-amber-700",
  students: "bg-orange-100 border-orange-700",
  narrator: "bg-yellow-100 border-yellow-700",
};

function getAdaptiveGridClass(count: number): string {
  if (count === 4) return "grid-cols-2";
  if (count <= 3) return "grid-cols-3";
  return "grid-cols-2 sm:grid-cols-3";
}

function normalizeWord(raw: string) {
  return (
    raw
      .split("→")
      .pop()
      ?.replace(/[^a-zA-Z]/g, "")
      .toLowerCase() || ""
  );
}

function SpeechBubble({
  character,
  text,
  right,
}: {
  character: string;
  text: string;
  right?: boolean;
}) {
  const palette = bubblePalette[character] || bubblePalette.narrator;
  return (
    <div className={`flex ${right ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[86%] rounded-2xl border-3 px-3 py-2 shadow-[3px_3px_0_#111827] ${palette}`}
      >
        <p className="mb-0.5 text-[11px] font-black uppercase tracking-wide text-gray-700">
          {speakerEmoji[character]} {speakerName[character] || character}
        </p>
        <p className="text-base font-extrabold leading-snug text-gray-900">
          {text}
        </p>
        <span
          className={`absolute -bottom-2 h-3 w-3 rotate-45 border-r-3 border-b-3 border-gray-900 bg-inherit ${
            right ? "right-6" : "left-6"
          }`}
        />
      </div>
    </div>
  );
}

export default function StoryComicPage({ page }: StoryComicPageProps) {
  const [activePanel, setActivePanel] = useState(1);
  const [picked, setPicked] = useState<string | null>(null);
  const [rewardText, setRewardText] = useState("");
  const [reading, setReading] = useState(false);

  const dialog = page.dialog || [];
  const introLine = dialog[0];
  const teachingLines = dialog.slice(1, 4);

  const visualWords = useMemo(() => {
    if (page.boardWords?.length) {
      return page.boardWords.map((word) => normalizeWord(word)).filter(Boolean);
    }
    if (page.quizOptions?.length) {
      return page.quizOptions
        .map((word) => normalizeWord(word))
        .filter(Boolean);
    }
    return [];
  }, [dialog, page.boardWords, page.quizOptions]);

  const hasVisualPractice = visualWords.length > 0;
  const displayWords = visualWords.slice(0, 6);
  const miniPracticeWords = visualWords.slice(0, 3);
  const displayGridClass = getAdaptiveGridClass(displayWords.length);
  const miniGridClass = getAdaptiveGridClass(miniPracticeWords.length);
  const totalPanels = hasVisualPractice ? 4 : 2;

  const currentWordTarget = useMemo(() => {
    if (page.isQuiz && page.quizAnswer) return page.quizAnswer.toLowerCase();
    if (page.highlightPattern) {
      const match = visualWords.find((w) => w.endsWith(page.highlightPattern!));
      return match || visualWords[0] || "";
    }
    return visualWords[0] || "";
  }, [page.isQuiz, page.quizAnswer, page.highlightPattern, visualWords]);

  const interactionSolved = picked === currentWordTarget;
  const canAdvance =
    activePanel < totalPanels ? activePanel < 4 || interactionSolved : false;

  const handleReadPanel = async () => {
    if (reading) return;
    setReading(true);
    try {
      if (activePanel === 1 && introLine) {
        await narrateDialog(introLine.character, introLine.text);
      } else if (activePanel === 2 && teachingLines.length) {
        for (const line of teachingLines) {
          await narrateDialog(line.character, line.text);
        }
      } else if (activePanel === 3) {
        await narrateDialog(
          "teacher",
          page.boardLabel || "Look at these picture words.",
        );
      } else {
        await narrateDialog("teacher", "Tap the correct picture or word.");
      }
    } finally {
      setReading(false);
    }
  };

  const handleChooseWord = async (word: string) => {
    setPicked(word);
    await speakWord(word);
    if (word === currentWordTarget) {
      setRewardText("Great job! ⭐");
    } else {
      setRewardText("Nice try. Tap again.");
    }
    setTimeout(() => setRewardText(""), 1200);
  };

  return (
    <div className="story-comic-page w-full max-w-2xl">
      <div className="mb-3 rounded-3xl border-3 border-gray-900 bg-linear-to-br from-cyan-100 via-yellow-50 to-pink-100 p-3 shadow-[5px_5px_0_#111827]">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-violet-700">
              Comic Lesson Page {page.pageNumber}
            </p>
            <h2 className="text-2xl font-black text-gray-900">{page.title}</h2>
          </div>
          <button
            onClick={handleReadPanel}
            className="min-h-12 rounded-full border-3 border-gray-900 bg-yellow-300 px-4 text-sm font-black text-gray-900 shadow-[3px_3px_0_#111827]"
          >
            {reading ? "Reading..." : "Read Panel"}
          </button>
        </div>

        <div className="mt-2 flex gap-1.5">
          {Array.from({ length: totalPanels }).map((_, idx) => {
            const p = idx + 1;
            return (
              <div
                key={p}
                className={`h-2.5 rounded-full ${
                  p <= activePanel ? "w-8 bg-emerald-500" : "w-3 bg-gray-300"
                }`}
              />
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        {activePanel >= 1 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border-4 border-gray-900 bg-white p-3 shadow-[6px_6px_0_#111827]"
          >
            <div className="rounded-2xl border-3 border-gray-900 bg-sky-50 p-2">
              <ComicIllustration
                pageNumber={page.pageNumber}
                className="mb-2"
              />
              {introLine && (
                <SpeechBubble
                  character={introLine.character}
                  text={introLine.text}
                  right={introLine.character === "ben"}
                />
              )}
            </div>
          </motion.section>
        )}

        {activePanel >= 2 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border-4 border-gray-900 bg-white p-3 shadow-[6px_6px_0_#111827]"
          >
            <div className="rounded-2xl border-2 border-dashed border-violet-700 bg-violet-50 p-2 space-y-2">
              {teachingLines.map((line, idx) => (
                <SpeechBubble
                  key={`${line.character}-${idx}`}
                  character={line.character}
                  text={line.text}
                  right={line.character === "ben" || line.character === "tom"}
                />
              ))}
            </div>
          </motion.section>
        )}

        {hasVisualPractice && activePanel >= 3 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border-4 border-gray-900 bg-white p-3 shadow-[6px_6px_0_#111827]"
          >
            <p className="mb-2 text-xs font-black uppercase tracking-wide text-sky-800">
              {page.boardLabel || "Picture Word Cards"}
            </p>
            <div className={`grid ${displayGridClass} gap-2 auto-rows-fr`}>
              {displayWords.map((word) => (
                <button
                  key={word}
                  onClick={() => speakWord(word)}
                  className="h-full min-h-28 rounded-2xl border-3 border-gray-900 bg-sky-100 p-2 text-center shadow-[3px_3px_0_#111827] flex flex-col items-center justify-center gap-1"
                >
                  <WordVisualIcon
                    iconKey={getWordIconKey(word)}
                    label={word}
                    className="h-10 w-10"
                  />
                  <p className="text-sm font-black text-sky-900 leading-tight">
                    {word}
                  </p>
                  <p className="text-[11px] font-bold text-sky-800 leading-tight">
                    Tap image or word
                  </p>
                </button>
              ))}
            </div>
          </motion.section>
        )}

        {hasVisualPractice && activePanel >= 4 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border-4 border-gray-900 bg-white p-3 shadow-[6px_6px_0_#111827]"
          >
            <p className="text-sm font-black text-gray-900">Mini Practice</p>
            <p className="mb-2 text-sm font-semibold text-gray-700">
              {page.isQuiz
                ? page.quizSentence || "Choose the correct word"
                : `Tap the best match: ${currentWordTarget || "word"}`}
            </p>
            <div className={`grid ${miniGridClass} gap-2 auto-rows-fr`}>
              {miniPracticeWords.map((word) => (
                <button
                  key={`choose-${word}`}
                  onClick={() => handleChooseWord(word)}
                  className={`h-full min-h-24 rounded-2xl border-3 p-2 text-center font-black shadow-[3px_3px_0_#111827] flex flex-col items-center justify-center gap-1 ${
                    picked === word
                      ? word === currentWordTarget
                        ? "border-emerald-700 bg-emerald-100 text-emerald-900"
                        : "border-amber-700 bg-amber-100 text-amber-900"
                      : "border-gray-900 bg-white text-gray-900"
                  }`}
                >
                  <WordVisualIcon
                    iconKey={getWordIconKey(word)}
                    label={word}
                    className="h-10 w-10"
                  />
                  <p className="text-base leading-tight">{word}</p>
                </button>
              ))}
            </div>
          </motion.section>
        )}
      </div>

      <div className="sticky bottom-0 mt-3 rounded-2xl border-3 border-gray-900 bg-white/95 p-2 shadow-[4px_4px_0_#111827] backdrop-blur">
        <button
          onClick={() =>
            setActivePanel((prev) => Math.min(prev + 1, totalPanels))
          }
          disabled={activePanel >= totalPanels || !canAdvance}
          className="w-full min-h-13 rounded-2xl border-3 border-gray-900 bg-emerald-300 text-base font-black text-emerald-950 shadow-[3px_3px_0_#111827] disabled:opacity-45"
        >
          {activePanel >= totalPanels ? "Page Complete" : "Next Panel"}
        </button>
      </div>

      <AnimatePresence>
        {rewardText && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.95 }}
            className="fixed bottom-28 left-1/2 z-40 w-[88%] max-w-sm -translate-x-1/2 rounded-2xl border-3 border-gray-900 bg-yellow-300 px-4 py-2 text-center text-sm font-black text-gray-900 shadow-[4px_4px_0_#111827]"
          >
            {rewardText}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
