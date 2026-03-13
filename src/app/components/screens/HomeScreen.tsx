"use client";

import { motion } from "framer-motion";
import { LearnerProfile } from "../../lib/types";
import { lessons } from "../../data/lessons";
import { comicPages } from "../../data/comicPages";
import TomMascot from "../TomMascot";
import StarRating from "../StarRating";
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
  const currentLesson =
    lessons.find((l) => l.id === profile.currentLesson) || lessons[0];
  const completedCount = profile.lessonsCompleted;
  const totalLessons = lessons.length;
  const totalComicPages = comicPages.length;

  return (
    <div className="app-shell min-h-dvh flex flex-col">
      {/* Header */}
      <header className="px-5 pt-4 pb-2 safe-top">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-violet-100 to-purple-100 flex items-center justify-center border-2 border-violet-200 shadow-sm">
              <span className="text-2xl">{profile.avatar}</span>
            </div>
            <div>
              <p className="font-extrabold text-gray-900 text-base leading-tight">
                Hi, {profile.name}! 👋
              </p>
              <p className="text-xs text-gray-500 font-semibold">
                {completedCount === 0
                  ? "Ready to start learning?"
                  : "Keep up the great work!"}
              </p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onViewSettings}
            className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center cursor-pointer"
          >
            <span className="text-lg">⚙️</span>
          </motion.button>
        </div>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 px-5 pt-3 pb-28 max-w-lg mx-auto w-full overflow-y-auto">
        {/* Install App — top priority */}
        <div className="mb-5">
          <InstallPrompt variant="hero" />
        </div>

        {/* Quick stats row */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {[
            {
              label: "Stars",
              value: profile.totalStars,
              icon: "⭐",
              gradient: "from-amber-50 to-yellow-50",
              ring: "ring-amber-200",
            },
            {
              label: "Streak",
              value: `${profile.streak}d`,
              icon: "🔥",
              gradient: "from-orange-50 to-red-50",
              ring: "ring-orange-200",
            },
            {
              label: "Badges",
              value: profile.badges.length,
              icon: "🏅",
              gradient: "from-violet-50 to-purple-50",
              ring: "ring-violet-200",
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileTap={{ scale: 0.95 }}
              className={`app-card rounded-2xl p-3 text-center bg-linear-to-br ${stat.gradient}`}
            >
              <span className="text-xl">{stat.icon}</span>
              <p className="text-lg font-extrabold text-gray-900 leading-tight">
                {stat.value}
              </p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Read the Comic Book */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-5 rounded-3xl overflow-hidden"
        >
          <div className="bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-600 p-5 sm:p-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-emerald-100 text-xs font-bold uppercase tracking-wider mb-1">
                  Comic Book
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                  📖 The Word Pattern Adventure
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-lg backdrop-blur-sm">
                🐱
              </div>
            </div>
            <p className="text-sm text-emerald-100 mb-4">
              Read the full {totalComicPages}-page comic story with Teacher Mia,
              Ana, Ben & Tom the Cat!
            </p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onReadComic}
              className="w-full py-3 rounded-2xl bg-white font-extrabold text-emerald-700 text-base min-h-12 cursor-pointer shadow-lg"
            >
              Read the Comic 📖
            </motion.button>
          </div>
        </motion.div>

        {/* Continue learning card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-5 rounded-3xl overflow-hidden"
        >
          <div className="bg-linear-to-br from-violet-600 via-purple-600 to-indigo-600 p-5 sm:p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-violet-200 text-xs font-bold uppercase tracking-wider mb-1">
                  Continue Learning
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                  {currentLesson.icon} {currentLesson.title}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-lg backdrop-blur-sm">
                {currentLesson.icon}
              </div>
            </div>
            <p className="text-sm text-violet-200 mb-4">
              {currentLesson.subtitle}
            </p>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 rounded-full bg-white/20 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(completedCount / totalLessons) * 100}%`,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-linear-to-r from-yellow-300 to-amber-400"
                />
              </div>
              <span className="text-xs text-white/80 font-bold whitespace-nowrap">
                {completedCount}/{totalLessons}
              </span>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onStartLesson(currentLesson.id)}
              className="mt-4 w-full py-3 rounded-2xl bg-white font-extrabold text-violet-700 text-base min-h-12 cursor-pointer shadow-lg"
            >
              Start Lesson →
            </motion.button>
          </div>
        </motion.div>

        {/* Tom mascot */}
        <TomMascot
          message={
            completedCount === 0
              ? "Ready to learn? Let's go!"
              : completedCount >= totalLessons
                ? "You finished all lessons! 🎉"
                : "Keep going! You're doing great!"
          }
          size="sm"
          className="mb-5"
        />

        {/* All Lessons */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-gray-900 text-base">
            All Lessons
          </h3>
          <span className="text-xs text-gray-400 font-bold">
            {completedCount}/{totalLessons} done
          </span>
        </div>
        <div className="space-y-2.5 mb-5">
          {lessons.map((lesson, idx) => {
            const progress = profile.progress[lesson.id];
            const isUnlocked =
              !lesson.unlockAfter ||
              lesson.unlockAfter < profile.currentLesson ||
              profile.progress[lesson.unlockAfter]?.completed;
            const isCompleted = progress?.completed;

            return (
              <motion.button
                key={lesson.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileTap={isUnlocked ? { scale: 0.98 } : {}}
                onClick={() => isUnlocked && onStartLesson(lesson.id)}
                disabled={!isUnlocked}
                className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3.5 transition-all min-h-15 cursor-pointer disabled:cursor-not-allowed ${
                  isCompleted
                    ? "bg-emerald-50 shadow-sm"
                    : isUnlocked
                      ? "bg-white shadow-sm"
                      : "bg-gray-50 opacity-50"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                    isCompleted
                      ? "bg-emerald-100"
                      : isUnlocked
                        ? "bg-violet-50"
                        : "bg-gray-100"
                  }`}
                >
                  {isUnlocked ? lesson.icon : "🔒"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm leading-tight truncate">
                    {lesson.title}
                  </p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {lesson.subtitle}
                  </p>
                </div>
                {isCompleted && (
                  <StarRating
                    stars={progress.stars}
                    size="sm"
                    animated={false}
                  />
                )}
                {isUnlocked && !isCompleted && (
                  <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center">
                    <span className="text-violet-600 text-xs font-bold">▶</span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom navigation */}
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
              icon: "⚙️",
              label: "Settings",
              active: false,
              action: onViewSettings,
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
