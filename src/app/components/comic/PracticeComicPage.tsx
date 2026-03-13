"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { narrateDialog, speakWord } from "../../lib/audio";
import {
  practiceComicPanels,
  practiceObjectCards,
} from "../../data/practiceComicPage";

const speakerName = {
  teacher: "Teacher Mia",
  ana: "Ana",
  ben: "Ben",
  students: "Students",
};

const bubbleClass = {
  teacher: "bg-sky-100 border-sky-700",
  ana: "bg-pink-100 border-pink-700",
  ben: "bg-emerald-100 border-emerald-700",
  students: "bg-amber-100 border-amber-700",
};

function ComicSpeech({
  character,
  text,
  side = "left",
}: {
  character: keyof typeof speakerName;
  text: string;
  side?: "left" | "right";
}) {
  return (
    <div
      className={`relative max-w-[82%] rounded-2xl border-3 px-3 py-2 shadow-[3px_3px_0_#111827] ${bubbleClass[character]} ${
        side === "right" ? "ml-auto" : ""
      }`}
    >
      <p className="text-[11px] font-black uppercase tracking-wide text-gray-700">
        {speakerName[character]}
      </p>
      <p className="text-base font-extrabold leading-snug text-gray-900">
        {text}
      </p>
      <span
        className={`absolute -bottom-2 h-3 w-3 rotate-45 border-r-3 border-b-3 border-gray-900 bg-inherit ${
          side === "right" ? "right-6" : "left-6"
        }`}
      />
    </div>
  );
}

function PanelObjectCard({
  emoji,
  word,
  active,
  onTapImage,
  onTapWord,
}: {
  emoji: string;
  word: string;
  active: boolean;
  onTapImage: () => void;
  onTapWord: () => void;
}) {
  return (
    <div className="rounded-2xl border-3 border-gray-900 bg-white p-2 shadow-[3px_3px_0_#111827]">
      <button
        onClick={onTapImage}
        disabled={!active}
        className={`mb-2 flex h-16 w-full items-center justify-center rounded-xl border-2 border-sky-700 bg-sky-100 text-3xl ${
          !active ? "opacity-60" : ""
        }`}
        aria-label={`Play sound for ${word}`}
      >
        <span aria-hidden>{emoji}</span>
      </button>
      <button
        onClick={onTapWord}
        disabled={!active}
        className={`w-full rounded-xl border-2 border-amber-700 bg-amber-200 py-1 text-sm font-black text-amber-900 ${
          !active ? "opacity-60" : ""
        }`}
      >
        {word}
      </button>
    </div>
  );
}

export default function PracticeComicPage() {
  const [activePanel, setActivePanel] = useState(1);
  const [solvedPanels, setSolvedPanels] = useState<Set<number>>(new Set());
  const [rewardText, setRewardText] = useState<string>("");
  const [isNarrating, setIsNarrating] = useState(false);

  const current = useMemo(
    () => practiceComicPanels.find((panel) => panel.id === activePanel),
    [activePanel],
  );

  const canGoNext =
    activePanel === 1 || solvedPanels.has(activePanel) || activePanel >= 4;

  const handleTapWord = async (wordId: "ran" | "van" | "can") => {
    await speakWord(wordId);
    if (!current?.expectedWord) return;

    if (wordId === current.expectedWord) {
      setSolvedPanels((prev) => new Set(prev).add(activePanel));
      setRewardText("Great job! ⭐");
      setTimeout(() => setRewardText(""), 1200);
    } else {
      setRewardText("Try again. Look carefully.");
      setTimeout(() => setRewardText(""), 1200);
    }
  };

  const handleNarratePanel = async () => {
    if (!current || isNarrating) return;
    setIsNarrating(true);
    try {
      await narrateDialog(current.speaker, current.speech);
      if (activePanel === 4) {
        await narrateDialog("teacher", "Excellent reading!");
      }
    } finally {
      setIsNarrating(false);
    }
  };

  return (
    <div className="practice-comic-page w-full max-w-2xl">
      <div className="mb-3 rounded-3xl border-3 border-gray-900 bg-linear-to-br from-yellow-100 via-cyan-50 to-pink-100 p-3 shadow-[5px_5px_0_#111827]">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-violet-700">
              Practice Time
            </p>
            <h2 className="text-2xl font-black text-gray-900">
              Comic Practice Page
            </h2>
          </div>
          <button
            onClick={handleNarratePanel}
            className="min-h-12 rounded-full border-3 border-gray-900 bg-yellow-300 px-4 text-sm font-black text-gray-900 shadow-[3px_3px_0_#111827]"
          >
            {isNarrating ? "Reading..." : "Read Panel"}
          </button>
        </div>

        <div className="mt-2 flex gap-1.5">
          {[1, 2, 3, 4].map((p) => (
            <div
              key={p}
              className={`h-2.5 rounded-full ${
                p <= activePanel ? "w-8 bg-emerald-500" : "w-3 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {practiceComicPanels
          .filter((panel) => panel.id <= activePanel)
          .map((panel) => {
            const panelActive = panel.id === activePanel;
            return (
              <motion.section
                key={panel.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border-4 border-gray-900 bg-white shadow-[6px_6px_0_#111827]"
              >
                <div className="rounded-t-2xl border-b-3 border-gray-900 bg-linear-to-r from-sky-100 to-mint p-3">
                  <div className="flex items-center justify-between">
                    <p className="rounded-full border-2 border-gray-900 bg-white px-2 py-0.5 text-xs font-black text-gray-700">
                      {panel.title}
                    </p>
                    <p className="text-xs font-black text-violet-700">Scene</p>
                  </div>

                  <div className="mt-2 grid grid-cols-4 gap-2">
                    <div className="rounded-xl border-2 border-gray-900 bg-sky-100 p-2 text-center">
                      <p className="text-2xl">👩‍🏫</p>
                      <p className="text-[11px] font-black">Teacher Mia</p>
                    </div>
                    <div className="rounded-xl border-2 border-gray-900 bg-pink-100 p-2 text-center">
                      <p className="text-2xl">👧</p>
                      <p className="text-[11px] font-black">Ana</p>
                    </div>
                    <div className="rounded-xl border-2 border-gray-900 bg-emerald-100 p-2 text-center">
                      <p className="text-2xl">👦</p>
                      <p className="text-[11px] font-black">Ben</p>
                    </div>
                    <div className="rounded-xl border-2 border-gray-900 bg-amber-100 p-2 text-center">
                      <p className="text-2xl">🐱</p>
                      <p className="text-[11px] font-black">Tom</p>
                    </div>
                  </div>
                </div>

                <div className="p-3">
                  <div className="mb-3">
                    <ComicSpeech
                      character={panel.speaker}
                      text={panel.speech}
                      side={panel.speaker === "ben" ? "right" : "left"}
                    />
                    {panel.id === 4 && (
                      <div className="mt-2">
                        <ComicSpeech
                          character="teacher"
                          text="Excellent reading!"
                          side="right"
                        />
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl border-2 border-dashed border-sky-700 bg-sky-50 p-2">
                    <p className="mb-2 text-xs font-black uppercase tracking-wide text-sky-800">
                      Board Picture Cards
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {practiceObjectCards.map((card) => (
                        <PanelObjectCard
                          key={card.id}
                          emoji={card.emoji}
                          word={card.word}
                          active={panelActive}
                          onTapImage={() => handleTapWord(card.id)}
                          onTapWord={() => handleTapWord(card.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {panel.prompt && (
                    <p className="mt-2 text-sm font-bold text-gray-700">
                      {panel.prompt}
                    </p>
                  )}

                  {panel.showTom && (
                    <p className="mt-1 text-sm font-black text-amber-700">
                      Tom: Meow! 🐱
                    </p>
                  )}
                </div>
              </motion.section>
            );
          })}
      </div>

      <div className="sticky bottom-0 mt-3 rounded-2xl border-3 border-gray-900 bg-white/95 p-2 shadow-[4px_4px_0_#111827] backdrop-blur">
        <button
          onClick={() => setActivePanel((prev) => Math.min(prev + 1, 4))}
          disabled={activePanel >= 4 || !canGoNext}
          className="w-full min-h-13 rounded-2xl border-3 border-gray-900 bg-emerald-300 text-base font-black text-emerald-950 shadow-[3px_3px_0_#111827] disabled:opacity-45"
        >
          {activePanel >= 4 ? "All Panels Done" : "Next Panel"}
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
