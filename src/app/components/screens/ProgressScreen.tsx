"use client";

import { motion } from "framer-motion";
import { LearnerProfile, Badge } from "../../lib/types";
import { lessons, badges } from "../../data/lessons";
import StarRating from "../StarRating";
import TomMascot from "../TomMascot";

interface ProgressScreenProps {
  profile: LearnerProfile;
  onBack: () => void;
}

export default function ProgressScreen({
  profile,
  onBack,
}: ProgressScreenProps) {
  const totalStars = Object.values(profile.progress).reduce(
    (sum, lp) => sum + (lp.stars || 0),
    0,
  );
  const completedLessons = Object.values(profile.progress).filter(
    (lp) => lp.completed,
  ).length;

  const earnedBadges = badges.filter((b) => profile.badges.includes(b.id));
  const lockedBadges = badges.filter((b) => !profile.badges.includes(b.id));

  return (
    <div className="app-shell min-h-dvh flex flex-col">
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
          <h2 className="text-base font-extrabold text-gray-900">
            My Progress
          </h2>
          <div className="w-9" />
        </div>
      </header>

      <div className="flex-1 px-4 py-4 max-w-lg mx-auto w-full space-y-4 pb-8 overflow-y-auto">
        {/* Profile card with stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="app-card p-5"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center border-2 border-violet-200 shadow-sm">
              <span className="text-3xl">{profile.avatar}</span>
            </div>
            <div>
              <h3 className="font-extrabold text-gray-900 text-lg">
                {profile.name}
              </h3>
              <p className="text-xs text-gray-500 font-semibold">
                🔥 {profile.streak} day streak
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-b from-violet-50 to-purple-50 rounded-2xl p-3 text-center">
              <p className="text-2xl font-extrabold text-violet-700">
                {completedLessons}
              </p>
              <p className="text-[10px] text-violet-500 font-bold uppercase tracking-wider">
                Lessons
              </p>
            </div>
            <div className="bg-gradient-to-b from-amber-50 to-yellow-50 rounded-2xl p-3 text-center">
              <p className="text-2xl font-extrabold text-amber-600">
                {totalStars}
              </p>
              <p className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">
                Stars
              </p>
            </div>
            <div className="bg-gradient-to-b from-pink-50 to-rose-50 rounded-2xl p-3 text-center">
              <p className="text-2xl font-extrabold text-pink-600">
                {earnedBadges.length}
              </p>
              <p className="text-[10px] text-pink-500 font-bold uppercase tracking-wider">
                Badges
              </p>
            </div>
          </div>
        </motion.div>

        {/* Lesson progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="app-card p-5"
        >
          <h3 className="font-extrabold text-gray-900 mb-3 flex items-center gap-2">
            📚 Lesson Progress
          </h3>
          <div className="space-y-2.5">
            {lessons.map((lesson) => {
              const progress = profile.progress[lesson.id];
              const isCompleted = progress?.completed;
              const stars = progress?.stars || 0;

              return (
                <div
                  key={lesson.id}
                  className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                      isCompleted ? "bg-emerald-100" : "bg-gray-100"
                    }`}
                  >
                    {lesson.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {lesson.title}
                    </p>
                    {isCompleted ? (
                      <StarRating stars={stars} size="sm" />
                    ) : (
                      <p className="text-xs text-gray-400 font-medium">
                        {progress ? "In progress" : "Not started"}
                      </p>
                    )}
                  </div>
                  {isCompleted && (
                    <span className="text-emerald-500 text-sm">✅</span>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="app-card p-5"
        >
          <h3 className="font-extrabold text-gray-900 mb-3 flex items-center gap-2">
            🏅 My Badges
          </h3>
          {earnedBadges.length > 0 && (
            <div className="grid grid-cols-3 gap-2.5 mb-3">
              {earnedBadges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} earned />
              ))}
            </div>
          )}
          {lockedBadges.length > 0 && (
            <>
              <p className="text-xs text-gray-400 font-semibold mb-2">
                Keep going to unlock!
              </p>
              <div className="grid grid-cols-3 gap-2.5">
                {lockedBadges.map((badge) => (
                  <BadgeCard key={badge.id} badge={badge} earned={false} />
                ))}
              </div>
            </>
          )}
        </motion.div>

        <TomMascot
          message={
            completedLessons === lessons.length
              ? "You finished everything!"
              : `${lessons.length - completedLessons} more to go!`
          }
          size="sm"
          className="mx-auto"
        />
      </div>
    </div>
  );
}

function BadgeCard({ badge, earned }: { badge: Badge; earned: boolean }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`rounded-2xl p-3 text-center transition-all ${
        earned
          ? "bg-gradient-to-b from-amber-50 to-yellow-50 shadow-sm"
          : "bg-gray-50 opacity-40"
      }`}
    >
      <span className="text-2xl">{badge.icon}</span>
      <p className="text-[10px] font-bold text-gray-700 mt-1 leading-tight">
        {badge.title}
      </p>
    </motion.div>
  );
}
