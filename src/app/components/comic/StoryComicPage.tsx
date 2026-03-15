"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ComicPage } from "../../data/comicPages";
import ComicIllustration from "../ComicIllustration";
import WordVisualIcon from "../WordVisualIcon";
import { narrateDialog, speakWord } from "../../lib/audio";
import { getWordIconKey } from "@/app/lib/wordVisuals";

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
  const [focusPulsePanel, setFocusPulsePanel] = useState<number | null>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const previousPanel = useRef(1);
  const prefersReducedMotion = useReducedMotion();

  const isLowEndPhone = useMemo(() => {
    const isPhone = window.matchMedia("(max-width: 768px)").matches;
    const cpuCores = navigator.hardwareConcurrency ?? 4;
    const memory =
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
    const saveData =
      (
        navigator as Navigator & {
          connection?: {
            saveData?: boolean;
          };
        }
      ).connection?.saveData ?? false;

    return isPhone && (cpuCores <= 4 || memory <= 4 || saveData);
  }, []);

  const panelReveal = useMemo(
    () =>
      prefersReducedMotion || isLowEndPhone
        ? {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.16, ease: "linear" as const },
          }
        : {
            initial: { opacity: 0, y: 4, scale: 0.992 },
            animate: { opacity: 1, y: 0, scale: 1 },
            transition: { duration: 0.24, ease: "easeOut" as const },
          },
    [prefersReducedMotion, isLowEndPhone],
  );

  const panelClass = (panelNumber: number) =>
    `rounded-3xl border-4 border-gray-900 bg-white p-3 shadow-[6px_6px_0_#111827] focus:outline-none transition-shadow duration-300 ${
      focusPulsePanel === panelNumber
        ? "ring-2 ring-emerald-300 shadow-[0_0_0_2px_rgba(16,185,129,0.28),6px_6px_0_#111827]"
        : ""
    }`;

  const dialog = page.dialog || [];
  const introLine = dialog[0];
  const teachingLines = dialog.slice(1);
  const linesPerDialogPanel = page.pageNumber === 13 ? 2 : 3;
  const dialogPanels = useMemo(() => {
    const chunks: Array<typeof teachingLines> = [];
    for (let idx = 0; idx < teachingLines.length; idx += linesPerDialogPanel) {
      chunks.push(teachingLines.slice(idx, idx + linesPerDialogPanel));
    }
    return chunks;
  }, [teachingLines, linesPerDialogPanel]);

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
  }, [page.boardWords, page.quizOptions]);

  const hasVisualPractice = visualWords.length > 0;
  const displayWords = visualWords.slice(0, 6);
  const miniPracticeWords = visualWords.slice(0, 3);
  const displayGridClass = getAdaptiveGridClass(displayWords.length);
  const miniGridClass = getAdaptiveGridClass(miniPracticeWords.length);
  const visualPanelNumber = 2 + dialogPanels.length;
  const miniPracticePanelNumber = visualPanelNumber + 1;
  const totalPanels = hasVisualPractice
    ? miniPracticePanelNumber
    : Math.max(2, 1 + dialogPanels.length);

  const currentWordTarget = useMemo(() => {
    if (page.isQuiz && page.quizAnswer) return page.quizAnswer.toLowerCase();
    if (page.highlightPattern) {
      const match = visualWords.find((w) => w.endsWith(page.highlightPattern!));
      return match || visualWords[0] || "";
    }
    return visualWords[0] || "";
  }, [page.isQuiz, page.quizAnswer, page.highlightPattern, visualWords]);

  const canAdvance = activePanel < totalPanels;

  const handleReadPanel = async () => {
    if (reading) return;
    setReading(true);
    try {
      if (activePanel === 1 && introLine) {
        await narrateDialog(introLine.character, introLine.text);
      } else if (activePanel >= 2 && activePanel < visualPanelNumber) {
        const lines = dialogPanels[activePanel - 2] || [];
        for (const line of lines) {
          await narrateDialog(line.character, line.text);
        }
      } else if (hasVisualPractice && activePanel === visualPanelNumber) {
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

  useEffect(() => {
    const movedForward = activePanel > previousPanel.current;
    previousPanel.current = activePanel;
    if (!movedForward || activePanel <= 1) return;

    const nextPanel = panelRefs.current[activePanel - 1];
    if (!nextPanel) return;

    setFocusPulsePanel(activePanel);

    const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";

    // Wait a tick so the newly revealed panel has final layout before scrolling.
    const scrollTimer = window.setTimeout(() => {
      nextPanel.scrollIntoView({
        behavior,
        block: "start",
        inline: "nearest",
      });
      nextPanel.focus({ preventScroll: true });
    }, 40);

    const pulseTimer = window.setTimeout(() => {
      setFocusPulsePanel(null);
    }, 380);

    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(pulseTimer);
    };
  }, [activePanel, prefersReducedMotion]);

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
            disabled={reading}
            aria-label="Read this panel aloud"
            className="min-h-12 rounded-full border-3 border-gray-900 bg-yellow-300 px-4 text-sm font-black text-gray-900 shadow-[3px_3px_0_#111827] active:translate-y-px active:shadow-[2px_2px_0_#111827] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden>{reading ? "⏳" : "🔊"}</span>
              <span>{reading ? "Reading..." : "Read Panel"}</span>
            </span>
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
            ref={(el) => {
              panelRefs.current[0] = el;
            }}
            tabIndex={-1}
            initial={panelReveal.initial}
            animate={panelReveal.animate}
            transition={panelReveal.transition}
            className={panelClass(1)}
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

        {dialogPanels.map((chunk, chunkIndex) => {
          const panelNumber = 2 + chunkIndex;
          if (activePanel < panelNumber) return null;

          return (
            <motion.section
              key={`dialog-panel-${panelNumber}`}
              ref={(el) => {
                panelRefs.current[panelNumber - 1] = el;
              }}
              tabIndex={-1}
              initial={panelReveal.initial}
              animate={panelReveal.animate}
              transition={panelReveal.transition}
              className={panelClass(panelNumber)}
            >
              <p className="mb-2 text-xs font-black uppercase tracking-wide text-violet-700">
                Comic Talk {chunkIndex + 1}
              </p>
              <div className="rounded-2xl border-2 border-dashed border-violet-700 bg-violet-50 p-2 grid grid-cols-1 gap-2">
                {chunk.map((line, idx) => (
                  <SpeechBubble
                    key={`${line.character}-${chunkIndex}-${idx}`}
                    character={line.character}
                    text={line.text}
                    right={line.character === "ben" || line.character === "tom"}
                  />
                ))}
              </div>
            </motion.section>
          );
        })}

        {hasVisualPractice && activePanel >= visualPanelNumber && (
          <motion.section
            ref={(el) => {
              panelRefs.current[visualPanelNumber - 1] = el;
            }}
            tabIndex={-1}
            initial={panelReveal.initial}
            animate={panelReveal.animate}
            transition={panelReveal.transition}
            className={panelClass(visualPanelNumber)}
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

        {hasVisualPractice && activePanel >= miniPracticePanelNumber && (
          <motion.section
            ref={(el) => {
              panelRefs.current[miniPracticePanelNumber - 1] = el;
            }}
            tabIndex={-1}
            initial={panelReveal.initial}
            animate={panelReveal.animate}
            transition={panelReveal.transition}
            className={panelClass(miniPracticePanelNumber)}
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
