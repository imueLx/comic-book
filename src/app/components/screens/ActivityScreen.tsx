"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ActivityResult } from "../../lib/types";
import { speakWord, speakPraise } from "../../lib/audio";
import WordCard from "../WordCard";
import Confetti from "../Confetti";
import TomMascot from "../TomMascot";
import StarRating from "../StarRating";
import AudioButton from "../AudioButton";

interface ActivityScreenProps {
  activities: Activity[];
  audioEnabled: boolean;
  autoRead: boolean;
  onFinish: (results: ActivityResult[]) => void;
  onBack: () => void;
}

export default function ActivityScreen({
  activities,
  audioEnabled,
  autoRead,
  onFinish,
  onBack,
}: ActivityScreenProps) {
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<ActivityResult[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Word family sort state
  const [sortedFamily1, setSortedFamily1] = useState<string[]>([]);
  const [sortedFamily2, setSortedFamily2] = useState<string[]>([]);
  const [unsortedWords, setUnsortedWords] = useState<string[]>([]);
  const [sortFeedback, setSortFeedback] = useState<string>("");

  // Match state
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [selectedBlend, setSelectedBlend] = useState<string | null>(null);
  const [shuffledMatches, setShuffledMatches] = useState<string[]>([]);

  const activity = activities[index];
  const isLast = index === activities.length - 1;

  const initActivity = useCallback((act: Activity) => {
    setSelected(null);
    setIsCorrect(null);
    setAttempts(0);
    setStartTime(Date.now());
    if (act.type === "wordFamilySort" && act.allWords) {
      setUnsortedWords([...act.allWords].sort(() => Math.random() - 0.5));
      setSortedFamily1([]);
      setSortedFamily2([]);
      setSortFeedback("");
    }
    if (act.type === "matchWords") {
      setMatchedPairs(new Set());
      setSelectedBlend(null);
      if (act.pairs) {
        const shuffled = [...act.pairs]
          .sort(() => Math.random() - 0.5)
          .map((p) => p.match);
        setShuffledMatches(shuffled);
      }
    } else {
      setShuffledMatches([]);
    }
  }, []);

  // Init first activity
  useEffect(() => {
    if (!activity) return;

    const frame = requestAnimationFrame(() => initActivity(activity));
    return () => cancelAnimationFrame(frame);
  }, [activity, initActivity]);

  const recordResult = useCallback(
    (correct: boolean, att: number) => {
      const result: ActivityResult = {
        activityId: activity.id,
        correct,
        attempts: att,
        timeSpentSeconds: Math.round((Date.now() - startTime) / 1000),
        skillArea: activity.skillArea,
      };
      setResults((prev) => [...prev, result]);
    },
    [activity, startTime],
  );

  const handleCorrectAnswer = useCallback(() => {
    setIsCorrect(true);
    setShowConfetti(true);
    if (audioEnabled) speakPraise();
    recordResult(true, attempts + 1);
    setTimeout(() => setShowConfetti(false), 2500);
  }, [audioEnabled, attempts, recordResult]);

  const goNextActivity = useCallback(() => {
    if (isLast) {
      setShowResults(true);
    } else {
      setIndex(index + 1);
    }
  }, [isLast, index]);

  const handleSelect = useCallback(
    (option: string) => {
      if (isCorrect) return;
      setSelected(option);
      setAttempts((a) => a + 1);

      if (option === activity.correctAnswer) {
        handleCorrectAnswer();
      } else {
        setIsCorrect(false);
        if (audioEnabled) speakWord(option);
      }
    },
    [isCorrect, activity, handleCorrectAnswer, audioEnabled],
  );

  // Word family sort handlers
  const handleSortWord = useCallback(
    (word: string, familyIdx: 1 | 2) => {
      if (!activity.family1 || !activity.family2) return;
      const isCorrectFamily =
        familyIdx === 1
          ? activity.family1.words.includes(word)
          : activity.family2.words.includes(word);

      if (isCorrectFamily) {
        setUnsortedWords((prev) => prev.filter((w) => w !== word));
        if (familyIdx === 1) setSortedFamily1((prev) => [...prev, word]);
        else setSortedFamily2((prev) => [...prev, word]);
        if (audioEnabled) speakWord(word);
        setSortFeedback("Nice! Great sorting!");

        // Check if all sorted
        const remaining = unsortedWords.length - 1;
        if (remaining === 0) {
          handleCorrectAnswer();
        }
      } else {
        setAttempts((a) => a + 1);
        setSortFeedback("Try again. Listen to the ending sound.");
      }

      setTimeout(() => setSortFeedback(""), 1200);
    },
    [activity, unsortedWords, handleCorrectAnswer, audioEnabled],
  );

  // Match handlers
  const handleMatchSelect = useCallback(
    (item: string, isBlend: boolean) => {
      if (!activity.pairs) return;

      if (isBlend) {
        setSelectedBlend(item);
      } else if (selectedBlend) {
        const pair = activity.pairs.find((p) => p.word === selectedBlend);
        if (pair && pair.match === item) {
          setMatchedPairs((prev) => new Set(prev).add(selectedBlend));
          setSelectedBlend(null);
          if (audioEnabled) speakWord(item);

          if (matchedPairs.size + 1 === activity.pairs.length) {
            handleCorrectAnswer();
          }
        } else {
          setSelectedBlend(null);
          setAttempts((a) => a + 1);
        }
      }
    },
    [activity, selectedBlend, matchedPairs, handleCorrectAnswer, audioEnabled],
  );

  // Listen and choose: speak word on mount
  useEffect(() => {
    if (
      activity?.type === "listenAndChoose" &&
      activity.word &&
      audioEnabled &&
      autoRead
    ) {
      setTimeout(() => speakWord(activity.word!), 600);
    }
  }, [activity, audioEnabled, autoRead]);

  // Results screen
  if (showResults) {
    const correctCount = results.filter((r) => r.correct).length;
    const stars =
      correctCount === results.length
        ? 3
        : correctCount >= results.length * 0.6
          ? 2
          : correctCount > 0
            ? 1
            : 0;

    return (
      <div className="min-h-dvh bg-linear-to-br from-violet-500 via-purple-500 to-indigo-600 flex flex-col items-center justify-center px-5 py-8 safe-top safe-bottom">
        <Confetti show={true} duration={4000} />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="app-card p-6 sm:p-8 max-w-sm w-full text-center"
        >
          <TomMascot message="Amazing work!" size="md" className="mb-4" />
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
            Great Job! 🎉
          </h2>
          <p className="text-gray-600 mb-5 font-medium">
            You got {correctCount} out of {results.length} correct!
          </p>
          <StarRating stars={stars} size="lg" />
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => onFinish(results)}
            className="mt-6 w-full py-3.5 rounded-2xl primary-btn font-extrabold text-lg min-h-13 cursor-pointer"
          >
            Continue →
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!activity) return null;

  return (
    <div className="app-shell min-h-dvh flex flex-col">
      <Confetti show={showConfetti} />

      {/* Header */}
      <header className="app-header py-3 px-4 sticky top-0 z-10 safe-top">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-sm cursor-pointer"
          >
            ←
          </motion.button>
          <div className="flex items-center gap-2">
            <span className="soft-chip text-xs font-bold px-2.5 py-1 rounded-full">
              {index + 1}/{activities.length}
            </span>
          </div>
          <div className="w-9" />
        </div>
        {/* Mini progress */}
        <div className="max-w-lg mx-auto mt-2 flex gap-1">
          {activities.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full ${
                i < index
                  ? "bg-violet-400"
                  : i === index
                    ? "bg-violet-500"
                    : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </header>

      {/* Activity content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-4 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {/* Title & instruction */}
            <div className="text-center mb-5">
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1">
                {activity.title}
              </h3>
              <p className="text-sm text-gray-500 font-medium">
                {activity.instruction}
              </p>
            </div>

            {/* TAP CORRECT WORD */}
            {activity.type === "tapCorrectWord" && (
              <div className="app-card p-5">
                {activity.prompt && (
                  <p className="text-center text-lg font-bold text-gray-900 mb-5 bg-linear-to-r from-amber-50 to-yellow-50 rounded-2xl p-4">
                    {activity.prompt}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-3">
                  {activity.options?.map((opt) => (
                    <WordCard
                      key={opt}
                      word={opt}
                      showAudio={audioEnabled}
                      showIcon={true}
                      selected={selected === opt}
                      correct={selected === opt ? isCorrect : null}
                      disabled={isCorrect === true}
                      onClick={() => handleSelect(opt)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* COMPLETE THE SENTENCE */}
            {activity.type === "completeTheSentence" && (
              <div className="app-card p-5">
                <p className="text-center text-xl font-bold text-gray-900 mb-5 bg-linear-to-r from-amber-50 to-yellow-50 rounded-2xl p-4">
                  {activity.sentence}
                </p>
                <div className="flex flex-wrap gap-2.5 justify-center">
                  {activity.options?.map((opt) => (
                    <WordCard
                      key={opt}
                      word={opt}
                      showAudio={audioEnabled}
                      showIcon={true}
                      selected={selected === opt}
                      correct={selected === opt ? isCorrect : null}
                      disabled={isCorrect === true}
                      onClick={() => handleSelect(opt)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* LISTEN AND CHOOSE */}
            {activity.type === "listenAndChoose" && (
              <div className="app-card p-5">
                <div className="flex justify-center mb-5">
                  <AudioButton word={activity.word || ""} size="lg" />
                </div>
                <p className="text-center text-sm text-gray-500 mb-4 font-medium">
                  Tap 🔈 to listen, then pick the word!
                </p>
                <div className="flex flex-wrap gap-2.5 justify-center">
                  {activity.options?.map((opt) => (
                    <WordCard
                      key={opt}
                      word={opt}
                      showIcon={true}
                      selected={selected === opt}
                      correct={selected === opt ? isCorrect : null}
                      disabled={isCorrect === true}
                      onClick={() => handleSelect(opt)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* WORD FAMILY SORT */}
            {activity.type === "wordFamilySort" &&
              activity.family1 &&
              activity.family2 && (
                <div className="app-card p-5">
                  <p className="text-center text-sm font-semibold text-gray-600 mb-3">
                    Step 1: Tap the word. Step 2: Tap the right family.
                  </p>

                  <div className="rounded-2xl border-2 border-dashed border-violet-300 bg-violet-50 p-3 mb-4">
                    <p className="text-xs font-bold text-violet-700 text-center uppercase tracking-wider mb-2">
                      Word to Sort
                    </p>
                    {unsortedWords.length > 0 ? (
                      <div className="max-w-48 mx-auto">
                        <WordCard
                          word={unsortedWords[0]}
                          showAudio={audioEnabled}
                          showIcon={true}
                          size="lg"
                        />
                      </div>
                    ) : (
                      <p className="text-center text-emerald-700 font-bold">
                        All words sorted!
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className="bg-linear-to-b from-pink-50 to-rose-50 rounded-2xl p-3.5 min-h-32 cursor-pointer border-2 border-pink-200"
                      onClick={() =>
                        unsortedWords[0] && handleSortWord(unsortedWords[0], 1)
                      }
                    >
                      <p className="text-center font-extrabold text-pink-600 text-lg mb-2">
                        {activity.family1.pattern}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {sortedFamily1.map((w) => (
                          <span
                            key={w}
                            className="bg-pink-200 px-2.5 py-1 rounded-lg text-xs font-bold text-pink-800"
                          >
                            {w}
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] text-pink-500 text-center mt-2 font-semibold">
                        Put word here
                      </p>
                    </motion.div>
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className="bg-linear-to-b from-blue-50 to-indigo-50 rounded-2xl p-3.5 min-h-32 cursor-pointer border-2 border-blue-200"
                      onClick={() =>
                        unsortedWords[0] && handleSortWord(unsortedWords[0], 2)
                      }
                    >
                      <p className="text-center font-extrabold text-blue-600 text-lg mb-2">
                        {activity.family2.pattern}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {sortedFamily2.map((w) => (
                          <span
                            key={w}
                            className="bg-blue-200 px-2.5 py-1 rounded-lg text-xs font-bold text-blue-800"
                          >
                            {w}
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] text-blue-500 text-center mt-2 font-semibold">
                        Put word here
                      </p>
                    </motion.div>
                  </div>

                  {sortFeedback && (
                    <p className="text-center text-sm font-bold text-violet-700">
                      {sortFeedback}
                    </p>
                  )}
                </div>
              )}

            {/* MATCH WORDS */}
            {activity.type === "matchWords" && activity.pairs && (
              <div className="app-card p-5">
                {(() => {
                  const pairs = activity.pairs ?? [];
                  return (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2.5">
                        <p className="text-xs font-bold text-gray-500 text-center uppercase tracking-wider">
                          Blends
                        </p>
                        {pairs.map((p) => (
                          <motion.button
                            key={p.word}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              !matchedPairs.has(p.word) &&
                              handleMatchSelect(p.word, true)
                            }
                            disabled={matchedPairs.has(p.word)}
                            className={`w-full py-3 rounded-2xl font-bold text-lg min-h-12 cursor-pointer transition-all ${
                              matchedPairs.has(p.word)
                                ? "bg-emerald-100 text-emerald-700 shadow-sm"
                                : selectedBlend === p.word
                                  ? "bg-violet-100 text-violet-800 ring-2 ring-violet-400 shadow-md"
                                  : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                            }`}
                          >
                            {p.word}
                          </motion.button>
                        ))}
                      </div>
                      <div className="space-y-2.5">
                        <p className="text-xs font-bold text-gray-500 text-center uppercase tracking-wider">
                          Words
                        </p>
                        {shuffledMatches.map((match) => {
                          const p = pairs.find((pair) => pair.match === match);
                          if (!p) return null;
                          return (
                            <motion.button
                              key={p.match}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                !matchedPairs.has(p.word) &&
                                handleMatchSelect(p.match, false)
                              }
                              disabled={matchedPairs.has(p.word)}
                              className={`w-full py-3 rounded-2xl font-bold text-lg min-h-12 cursor-pointer transition-all ${
                                matchedPairs.has(p.word)
                                  ? "bg-emerald-100 text-emerald-700 shadow-sm"
                                  : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                              }`}
                            >
                              {p.match}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Feedback */}
            <AnimatePresence>
              {isCorrect === true && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 text-center"
                >
                  <p className="text-emerald-600 font-extrabold text-xl mb-3">
                    🎉 Correct!
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={goNextActivity}
                    className="px-8 py-3 primary-btn rounded-2xl font-bold min-h-12 cursor-pointer"
                  >
                    {isLast ? "See Results ⭐" : "Next →"}
                  </motion.button>
                </motion.div>
              )}
              {isCorrect === false &&
                activity.type !== "wordFamilySort" &&
                activity.type !== "matchWords" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 text-center"
                  >
                    <p className="text-amber-600 font-bold mb-1">
                      🤔 Not quite!
                    </p>
                    {activity.hint && (
                      <p className="text-sm text-gray-500 mb-3 bg-amber-50 rounded-xl p-3 mx-auto max-w-xs">
                        💡 <strong>Hint:</strong> {activity.hint}
                      </p>
                    )}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelected(null);
                        setIsCorrect(null);
                      }}
                      className="px-5 py-2.5 rounded-2xl bg-gray-100 font-bold text-sm min-h-11 cursor-pointer text-gray-700"
                    >
                      Try Again
                    </motion.button>
                  </motion.div>
                )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
