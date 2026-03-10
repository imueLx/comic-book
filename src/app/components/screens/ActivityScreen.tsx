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
  onFinish: (results: ActivityResult[]) => void;
  onBack: () => void;
}

export default function ActivityScreen({
  activities,
  audioEnabled,
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

        // Check if all sorted
        const remaining = unsortedWords.length - 1;
        if (remaining === 0) {
          handleCorrectAnswer();
        }
      } else {
        setAttempts((a) => a + 1);
      }
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
    if (activity?.type === "listenAndChoose" && activity.word && audioEnabled) {
      setTimeout(() => speakWord(activity.word!), 600);
    }
  }, [activity, audioEnabled]);

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
      <div className="min-h-dvh bg-linear-to-b from-sun to-pink flex flex-col items-center justify-center px-4 py-8">
        <Confetti show={true} duration={4000} />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="bg-white/95 rounded-3xl p-6 shadow-xl border-3 border-purple-300 max-w-sm w-full text-center"
        >
          <TomMascot message="Amazing work!" size="md" className="mb-3" />
          <h2 className="text-2xl font-extrabold text-purple-800 mb-2">
            Great Job! 🎉
          </h2>
          <p className="text-purple-600 mb-4">
            You got {correctCount} out of {results.length} correct!
          </p>
          <StarRating stars={stars} size="lg" />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onFinish(results)}
            className="mt-6 w-full py-3 rounded-full bg-green-500 text-white font-bold text-lg shadow-lg min-h-12 cursor-pointer"
          >
            Continue →
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!activity) return null;

  return (
    <div className="min-h-dvh bg-linear-to-b from-lavender to-peach flex flex-col">
      <Confetti show={showConfetti} />

      {/* Header */}
      <header className="bg-white/70 backdrop-blur-sm border-b-2 border-purple-300 py-2 px-3 sticky top-0 z-10 safe-top">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="text-sm font-bold text-purple-600 min-h-9 cursor-pointer"
          >
            ← Back
          </motion.button>
          <span className="text-xs font-bold text-purple-500 bg-purple-100 px-2 py-1 rounded-full">
            {index + 1} / {activities.length}
          </span>
        </div>
      </header>

      {/* Activity content */}
      <div className="flex-1 flex flex-col items-center justify-center px-3 py-4 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            {/* Title & instruction */}
            <div className="text-center mb-4">
              <h3 className="text-xl sm:text-2xl font-extrabold text-purple-800 mb-1">
                {activity.title}
              </h3>
              <p className="text-sm text-purple-600">{activity.instruction}</p>
            </div>

            {/* TAP CORRECT WORD */}
            {activity.type === "tapCorrectWord" && (
              <div className="bg-white/90 rounded-2xl p-4 shadow-lg border-2 border-purple-200">
                {activity.prompt && (
                  <p className="text-center text-lg font-bold text-purple-800 mb-4 bg-yellow-100 rounded-xl p-3">
                    {activity.prompt}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-3">
                  {activity.options?.map((opt) => (
                    <WordCard
                      key={opt}
                      word={opt}
                      showAudio={audioEnabled}
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
              <div className="bg-white/90 rounded-2xl p-4 shadow-lg border-2 border-purple-200">
                <p className="text-center text-xl font-bold text-purple-800 mb-4 bg-yellow-100 rounded-xl p-3">
                  {activity.sentence}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {activity.options?.map((opt) => (
                    <WordCard
                      key={opt}
                      word={opt}
                      showAudio={audioEnabled}
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
              <div className="bg-white/90 rounded-2xl p-4 shadow-lg border-2 border-purple-200">
                <div className="flex justify-center mb-4">
                  <AudioButton word={activity.word || ""} size="lg" />
                </div>
                <p className="text-center text-sm text-purple-600 mb-3">
                  Tap 🔈 to listen, then pick the word!
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {activity.options?.map((opt) => (
                    <WordCard
                      key={opt}
                      word={opt}
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
                <div className="bg-white/90 rounded-2xl p-4 shadow-lg border-2 border-purple-200">
                  {/* Unsorted words */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {unsortedWords.map((w) => (
                      <WordCard
                        key={w}
                        word={w}
                        showAudio={audioEnabled}
                        size="sm"
                      />
                    ))}
                  </div>

                  {/* Family buckets */}
                  <div className="grid grid-cols-2 gap-3">
                    <div
                      className="bg-pink-50 rounded-xl p-3 border-2 border-pink-300 min-h-25 cursor-pointer"
                      onClick={() =>
                        unsortedWords[0] && handleSortWord(unsortedWords[0], 1)
                      }
                    >
                      <p className="text-center font-bold text-pink-700 text-sm mb-2">
                        {activity.family1.pattern}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {sortedFamily1.map((w) => (
                          <span
                            key={w}
                            className="bg-pink-200 px-2 py-1 rounded text-xs font-bold"
                          >
                            {w}
                          </span>
                        ))}
                      </div>
                      {unsortedWords.length > 0 && (
                        <p className="text-xs text-pink-400 text-center mt-1">
                          Tap word above, then tap here
                        </p>
                      )}
                    </div>
                    <div
                      className="bg-blue-50 rounded-xl p-3 border-2 border-blue-300 min-h-25 cursor-pointer"
                      onClick={() =>
                        unsortedWords[0] && handleSortWord(unsortedWords[0], 2)
                      }
                    >
                      <p className="text-center font-bold text-blue-700 text-sm mb-2">
                        {activity.family2.pattern}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {sortedFamily2.map((w) => (
                          <span
                            key={w}
                            className="bg-blue-200 px-2 py-1 rounded text-xs font-bold"
                          >
                            {w}
                          </span>
                        ))}
                      </div>
                      {unsortedWords.length > 0 && (
                        <p className="text-xs text-blue-400 text-center mt-1">
                          Tap word above, then tap here
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

            {/* MATCH WORDS */}
            {activity.type === "matchWords" && activity.pairs && (
              <div className="bg-white/90 rounded-2xl p-4 shadow-lg border-2 border-purple-200">
                {(() => {
                  const pairs = activity.pairs ?? [];

                  return (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-purple-600 text-center">
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
                            className={`w-full py-3 rounded-xl font-bold text-lg border-2 min-h-12 cursor-pointer ${
                              matchedPairs.has(p.word)
                                ? "bg-green-100 border-green-400 text-green-700"
                                : selectedBlend === p.word
                                  ? "bg-purple-100 border-purple-500 text-purple-800"
                                  : "bg-white border-purple-200"
                            }`}
                          >
                            {p.word}
                          </motion.button>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-purple-600 text-center">
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
                              className={`w-full py-3 rounded-xl font-bold text-lg border-2 min-h-12 cursor-pointer ${
                                matchedPairs.has(p.word)
                                  ? "bg-green-100 border-green-400 text-green-700"
                                  : "bg-white border-purple-200"
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
                  className="mt-4 text-center"
                >
                  <p className="text-green-600 font-bold text-xl">
                    🎉 Correct!
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={goNextActivity}
                    className="mt-3 px-6 py-2.5 bg-green-500 text-white rounded-full font-bold shadow-md min-h-11 cursor-pointer"
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
                    className="mt-4 text-center"
                  >
                    <p className="text-orange-600 font-bold">🤔 Try again!</p>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelected(null);
                        setIsCorrect(null);
                      }}
                      className="mt-2 px-4 py-2 bg-blue-400 text-white rounded-full font-bold text-sm min-h-10 cursor-pointer"
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
