"use client";

import { motion } from "framer-motion";
import { LearnerProfile } from "../../lib/types";
import { lessons } from "../../data/lessons";
import TomMascot from "../TomMascot";
import StarRating from "../StarRating";

interface HomeScreenProps {
  profile: LearnerProfile;
  onStartLesson: (lessonId: number) => void;
  onViewProgress: () => void;
  onViewSettings: () => void;
  onViewTeacherDashboard: () => void;
}

export default function HomeScreen({
  profile,
  onStartLesson,
  onViewProgress,
  onViewSettings,
  onViewTeacherDashboard,
}: HomeScreenProps) {
  const currentLesson =
    lessons.find((l) => l.id === profile.currentLesson) || lessons[0];
  const completedCount = profile.lessonsCompleted;
  const totalLessons = lessons.length;

  return (
    <div className="min-h-dvh bg-linear-to-b from-sky to-mint flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm px-4 py-3 border-b-3 border-purple-300 safe-top">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{profile.avatar}</span>
            <div>
              <p className="font-extrabold text-purple-800 text-sm leading-tight">
                Hi, {profile.name}!
              </p>
              <p className="text-xs text-purple-500">
                ⭐ {profile.totalStars} stars · 🔥 {profile.streak} day streak
              </p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onViewSettings}
            className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-lg cursor-pointer min-h-11"
          >
            ⚙️
          </motion.button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 px-4 py-4 max-w-lg mx-auto w-full overflow-y-auto">
        {/* Tom mascot greeting */}
        <TomMascot
          message={
            completedCount === 0
              ? "Ready to learn? Let's go!"
              : completedCount >= totalLessons
                ? "You finished all lessons! 🎉"
                : "Keep going! You're doing great!"
          }
          size="md"
          className="mb-4"
        />

        {/* Continue learning card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg border-3 border-purple-300 mb-4"
        >
          <p className="text-xs font-bold text-purple-500 mb-1 uppercase tracking-wide">
            Continue Learning
          </p>
          <h3 className="text-lg sm:text-xl font-extrabold text-purple-800 mb-1">
            {currentLesson.icon} {currentLesson.title}
          </h3>
          <p className="text-sm text-purple-600 mb-3">
            {currentLesson.subtitle}
          </p>

          <div className="flex items-center justify-between">
            <div className="text-xs text-purple-500">
              Lesson {currentLesson.id} of {totalLessons}
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onStartLesson(currentLesson.id)}
              className="px-5 py-2.5 bg-green-500 text-white rounded-full font-bold text-sm shadow-md min-h-11 cursor-pointer"
            >
              Start →
            </motion.button>
          </div>
        </motion.div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            {
              label: "Lessons",
              value: `${completedCount}/${totalLessons}`,
              icon: "📚",
            },
            { label: "Stars", value: `${profile.totalStars}`, icon: "⭐" },
            { label: "Badges", value: `${profile.badges.length}`, icon: "🏅" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/90 rounded-xl p-3 text-center border-2 border-purple-200 shadow-sm"
            >
              <span className="text-2xl">{stat.icon}</span>
              <p className="text-lg font-extrabold text-purple-800">
                {stat.value}
              </p>
              <p className="text-[10px] text-purple-500 font-bold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Lesson list */}
        <h3 className="font-extrabold text-purple-800 mb-2 text-sm">
          All Lessons
        </h3>
        <div className="space-y-2 mb-4">
          {lessons.map((lesson) => {
            const progress = profile.progress[lesson.id];
            const isUnlocked =
              !lesson.unlockAfter ||
              lesson.unlockAfter < profile.currentLesson ||
              profile.progress[lesson.unlockAfter]?.completed;
            const isCompleted = progress?.completed;

            return (
              <motion.button
                key={lesson.id}
                whileTap={isUnlocked ? { scale: 0.98 } : {}}
                onClick={() => isUnlocked && onStartLesson(lesson.id)}
                disabled={!isUnlocked}
                className={`w-full text-left p-3 rounded-xl border-2 flex items-center gap-3 transition-all min-h-14 cursor-pointer disabled:cursor-not-allowed ${
                  isCompleted
                    ? "bg-green-50 border-green-300"
                    : isUnlocked
                      ? "bg-white border-purple-200 shadow-sm"
                      : "bg-gray-100 border-gray-200 opacity-50"
                }`}
              >
                <span className="text-2xl">
                  {isUnlocked ? lesson.icon : "🔒"}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-purple-800 text-sm truncate">
                    {lesson.title}
                  </p>
                  <p className="text-xs text-purple-500 truncate">
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
                  <span className="text-xs font-bold text-purple-400">▶</span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Bottom buttons */}
        <div className="grid grid-cols-2 gap-2 pb-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onViewProgress}
            className="py-3 rounded-xl bg-purple-100 text-purple-700 font-bold text-sm border-2 border-purple-200 min-h-12 cursor-pointer"
          >
            📊 My Progress
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onViewTeacherDashboard}
            className="py-3 rounded-xl bg-blue-100 text-blue-700 font-bold text-sm border-2 border-blue-200 min-h-12 cursor-pointer"
          >
            👩‍🏫 Teacher View
          </motion.button>
        </div>
      </div>
    </div>
  );
}
