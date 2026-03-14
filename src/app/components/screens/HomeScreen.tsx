"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LearnerProfile } from "../../lib/types";
import { lessons } from "../../data/lessons";
import { comicPages } from "../../data/comicPages";
import TomMascot from "../TomMascot";
import InstallPrompt from "../InstallPrompt";

interface HomeScreenProps {
  profile: LearnerProfile;
  onStartLesson: (lessonId: number) => void;
  onReadComic: () => void;
  onViewProgress: () => void;
  onViewSettings: () => void;
}

export default function HomeScreen({
  profile,
  onStartLesson,
  onReadComic,
  onViewProgress,
  onViewSettings,
}: HomeScreenProps) {
  const [isOnline, setIsOnline] = useState(
    typeof window === "undefined" ? true : window.navigator.onLine,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const markOnline = () => setIsOnline(true);
    const markOffline = () => setIsOnline(false);

    window.addEventListener("online", markOnline);
    window.addEventListener("offline", markOffline);

    return () => {
      window.removeEventListener("online", markOnline);
      window.removeEventListener("offline", markOffline);
    };
  }, []);

  const currentLesson =
    lessons.find((l) => l.id === profile.currentLesson) || lessons[0];
  const currentLessonProgress = profile.progress[currentLesson.id];
  const completedCount = profile.lessonsCompleted;
  const totalLessons = lessons.length;
  const totalComicPages = comicPages.length;
  const progressPercent =
    totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  const hasCurrentLessonProgress = Boolean(
    currentLessonProgress &&
    (currentLessonProgress.comicPagesRead.length > 0 ||
      currentLessonProgress.activitiesCompleted.length > 0),
  );
  const shouldResumeCurrentLesson = Boolean(
    currentLessonProgress && !currentLessonProgress.completed,
  );

  const previewLessons = lessons
    .filter((lesson) => {
      if (!lesson.unlockAfter) return true;
      return (
        lesson.unlockAfter < profile.currentLesson ||
        Boolean(profile.progress[lesson.unlockAfter]?.completed)
      );
    })
    .slice(0, 3);

  const heroEncouragement =
    profile.streak > 0
      ? `You are on a ${profile.streak}-day reading streak!`
      : "Read one story today and earn a star!";

  return (
    <div className="app-shell min-h-dvh flex flex-col">
      <header className="px-5 pt-4 pb-2 safe-top">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-orange-100 to-amber-100 flex items-center justify-center border-2 border-orange-200 shadow-sm">
              <span className="text-2xl">{profile.avatar}</span>
            </div>
            <div>
              <p className="font-extrabold text-gray-900 text-base leading-tight">
                Hi, {profile.name}! 👋
              </p>
              <p className="text-xs text-gray-500 font-semibold">
                {completedCount === 0
                  ? "Ready to read?"
                  : "Ready for today&apos;s story?"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold whitespace-nowrap">
              🔥 Day {Math.max(1, profile.streak)}
            </div>
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={onViewSettings}
              aria-label="Open settings"
              className="h-9 w-9 rounded-full border-2 border-gray-300 bg-white text-gray-600 text-sm leading-none flex items-center justify-center shadow-sm"
            >
              ⚙️
            </motion.button>
          </div>
        </div>
      </header>

      <div className="flex-1 px-5 pt-3 pb-28 max-w-lg mx-auto w-full overflow-y-auto">
        {!isOnline && (
          <div className="mb-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3.5">
            <p className="text-sm font-extrabold text-emerald-800">
              You&apos;re offline. You can still read! 📚
            </p>
            <p className="text-xs text-emerald-700 mt-1">
              Saved stories and lessons are ready on this device.
            </p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-5 rounded-3xl overflow-hidden"
        >
          <div className="bg-linear-to-br from-orange-500 via-rose-500 to-red-500 p-5 sm:p-6">
            <div className="mb-2">
              <div>
                <p className="text-orange-100 text-xs font-bold uppercase tracking-wider mb-1">
                  Today&apos;s Story
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                  📖 The Word Pattern Adventure
                </h3>
              </div>
            </div>
            <p className="text-sm text-orange-100 mb-1">
              Read the full {totalComicPages}-page story with Mia, Ana, Ben, and
              Tom!
            </p>
            <p className="text-xs text-orange-100/90 mb-4">
              {heroEncouragement}
            </p>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onReadComic}
              className="w-full py-3.5 rounded-2xl bg-white font-extrabold text-rose-700 text-base min-h-14 cursor-pointer shadow-lg"
            >
              Read the Comic
            </motion.button>

            {hasCurrentLessonProgress && (
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => onStartLesson(currentLesson.id)}
                className="mt-2.5 w-full py-2.5 rounded-xl bg-white/15 border border-white/25 text-white font-bold text-sm min-h-11 cursor-pointer"
              >
                Resume Lesson {currentLesson.id}
              </motion.button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-5 rounded-3xl overflow-hidden"
        >
          <div className="bg-linear-to-br from-sky-500 via-cyan-500 to-teal-500 p-5 sm:p-6">
            <div className="mb-2.5">
              <div>
                <p className="text-cyan-100 text-xs font-bold uppercase tracking-wider mb-1">
                  Continue Learning
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                  {currentLesson.icon} {currentLesson.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-cyan-100 mb-4">
              {currentLesson.subtitle}
            </p>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 rounded-full bg-white/25 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-linear-to-r from-yellow-300 to-amber-400"
                />
              </div>
              <span className="text-xs text-white/90 font-bold whitespace-nowrap">
                {completedCount}/{totalLessons}
              </span>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onStartLesson(currentLesson.id)}
              className="mt-4 w-full py-3 rounded-2xl bg-white font-extrabold text-cyan-700 text-base min-h-12 cursor-pointer shadow-lg"
            >
              {shouldResumeCurrentLesson
                ? "Resume Lesson"
                : "Start Next Lesson"}
            </motion.button>
          </div>
        </motion.div>

        <TomMascot
          message={
            !isOnline
              ? "No internet? No problem. Let's keep reading!"
              : completedCount === 0
                ? 'Tap "Read the Comic" to begin your adventure!'
                : completedCount >= totalLessons
                  ? "You finished all lessons. Amazing reading!"
                  : "You're doing great. One more story today!"
          }
          size="sm"
          className="mb-5"
        />

        <div className="app-card rounded-3xl p-4 mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="font-extrabold text-gray-900 text-base">
              Your Reading Journey
            </h3>
            <button
              onClick={onViewProgress}
              className="text-xs font-bold text-cyan-700 cursor-pointer"
            >
              View Progress
            </button>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-linear-to-r from-emerald-400 to-cyan-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-gray-600 whitespace-nowrap">
              {completedCount}/{totalLessons}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-amber-50 p-2 text-center">
              <p className="text-lg font-extrabold text-amber-700 leading-tight">
                ⭐ {profile.totalStars}
              </p>
              <p className="text-[10px] font-bold text-amber-600">Stars</p>
            </div>
            <div className="rounded-xl bg-orange-50 p-2 text-center">
              <p className="text-lg font-extrabold text-orange-700 leading-tight">
                🔥 {profile.streak}
              </p>
              <p className="text-[10px] font-bold text-orange-600">Streak</p>
            </div>
            <div className="rounded-xl bg-sky-50 p-2 text-center">
              <p className="text-lg font-extrabold text-sky-700 leading-tight">
                🏅 {profile.badges.length}
              </p>
              <p className="text-[10px] font-bold text-sky-600">Badges</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-gray-900 text-base">
            Next for You
          </h3>
          <button
            onClick={onViewProgress}
            className="text-xs text-gray-500 font-bold cursor-pointer"
          >
            See all
          </button>
        </div>

        {previewLessons.length === 0 ? (
          <div className="app-card rounded-2xl p-4 mb-5">
            <p className="text-sm font-bold text-gray-800">No lessons yet.</p>
            <p className="text-xs text-gray-500 mt-1">
              Check again in a moment.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5 mb-5">
            {previewLessons.map((lesson, idx) => {
              const lessonProgress = profile.progress[lesson.id];
              const isCompleted = Boolean(lessonProgress?.completed);
              const isInProgress = Boolean(
                lessonProgress && !lessonProgress.completed,
              );

              return (
                <motion.button
                  key={lesson.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onStartLesson(lesson.id)}
                  className="w-full text-left p-3.5 rounded-2xl flex items-center gap-3.5 transition-all min-h-14 cursor-pointer bg-white shadow-sm"
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                      isCompleted
                        ? "bg-emerald-100"
                        : isInProgress
                          ? "bg-cyan-100"
                          : "bg-orange-100"
                    }`}
                  >
                    {lesson.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm leading-tight truncate">
                      {lesson.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {lesson.subtitle}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      isCompleted
                        ? "bg-emerald-50 text-emerald-700"
                        : isInProgress
                          ? "bg-cyan-50 text-cyan-700"
                          : "bg-orange-50 text-orange-700"
                    }`}
                  >
                    {isCompleted ? "Review" : isInProgress ? "Resume" : "Start"}
                  </span>
                </motion.button>
              );
            })}
          </div>
        )}

        <div className="mb-5 rounded-3xl border-2 border-violet-200 bg-linear-to-br from-violet-50 to-sky-50 p-4">
          <p className="text-base font-extrabold text-violet-800">
            📲 Install for Offline Reading
          </p>
          <p className="mt-1 text-xs font-semibold text-violet-700">
            Add this app to your home screen so kids can read comics and do
            lessons even without internet.
          </p>
          <div className="mt-3">
            <InstallPrompt variant="card" persistent />
          </div>
        </div>
      </div>

      <nav className="bottom-nav fixed bottom-0 left-0 right-0 px-4 py-2.5 safe-bottom z-20">
        <div className="max-w-lg mx-auto flex items-center justify-around">
          {[
            { icon: "🏠", label: "Home", active: true, action: () => {} },
            {
              icon: "📊",
              label: "Progress",
              active: false,
              action: onViewProgress,
            },
            {
              icon: "📖",
              label: "Comic",
              active: false,
              action: onReadComic,
            },
          ].map((tab) => (
            <motion.button
              key={tab.label}
              whileTap={{ scale: 0.9 }}
              onClick={tab.action}
              className={`flex flex-col items-center gap-0.5 py-2 px-4 rounded-xl min-w-16 min-h-13 cursor-pointer ${
                tab.active ? "text-violet-600" : "text-gray-400"
              }`}
            >
              <span className={`text-2xl ${tab.active ? "scale-110" : ""}`}>
                {tab.icon}
              </span>
              <span
                className={`text-[11px] font-bold ${tab.active ? "text-violet-600" : "text-gray-400"}`}
              >
                {tab.label}
              </span>
            </motion.button>
          ))}
        </div>
      </nav>
    </div>
  );
}
