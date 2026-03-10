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
    <div className="min-h-dvh bg-linear-to-b from-mint to-lavender flex flex-col">
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
          <h2 className="text-base font-extrabold text-purple-800">
            My Progress 📊
          </h2>
          <div className="w-12" />
        </div>
      </header>

      <div className="flex-1 px-3 py-4 max-w-lg mx-auto w-full space-y-4 pb-20">
        {/* Stats summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 rounded-2xl p-4 shadow-md border-2 border-purple-200"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{profile.avatar}</span>
            <div>
              <h3 className="font-extrabold text-purple-800">{profile.name}</h3>
              <p className="text-xs text-purple-500">
                🔥 {profile.streak} day streak
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-purple-50 rounded-xl p-2 text-center">
              <p className="text-2xl font-extrabold text-purple-800">
                {completedLessons}
              </p>
              <p className="text-[10px] text-purple-500">Lessons</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-2 text-center">
              <p className="text-2xl font-extrabold text-yellow-700">
                {totalStars}
              </p>
              <p className="text-[10px] text-yellow-600">Stars</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-2 text-center">
              <p className="text-2xl font-extrabold text-pink-700">
                {earnedBadges.length}
              </p>
              <p className="text-[10px] text-pink-600">Badges</p>
            </div>
          </div>
        </motion.div>

        {/* Lesson progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/90 rounded-2xl p-4 shadow-md border-2 border-purple-200"
        >
          <h3 className="font-extrabold text-purple-800 mb-3">
            Lesson Progress 📚
          </h3>
          <div className="space-y-3">
            {lessons.map((lesson) => {
              const progress = profile.progress[lesson.id];
              const isCompleted = progress?.completed;
              const stars = progress?.stars || 0;

              return (
                <div
                  key={lesson.id}
                  className="flex items-center gap-3 bg-purple-50/60 rounded-xl p-2.5"
                >
                  <span className="text-xl">{lesson.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-purple-800 truncate">
                      {lesson.title}
                    </p>
                    {isCompleted ? (
                      <StarRating stars={stars} size="sm" />
                    ) : (
                      <p className="text-xs text-purple-400">
                        {progress ? "In progress" : "Not started"}
                      </p>
                    )}
                  </div>
                  {isCompleted && (
                    <span className="text-green-500 text-sm">✅</span>
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
          className="bg-white/90 rounded-2xl p-4 shadow-md border-2 border-purple-200"
        >
          <h3 className="font-extrabold text-purple-800 mb-3">My Badges 🏅</h3>
          {earnedBadges.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-3">
              {earnedBadges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} earned />
              ))}
            </div>
          )}
          {lockedBadges.length > 0 && (
            <>
              <p className="text-xs text-purple-400 mb-2">Keep going!</p>
              <div className="grid grid-cols-3 gap-2">
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
      className={`rounded-xl p-2 text-center border-2 ${
        earned
          ? "bg-yellow-50 border-yellow-300"
          : "bg-gray-100 border-gray-200 opacity-50"
      }`}
    >
      <span className="text-2xl">{badge.icon}</span>
      <p className="text-[10px] font-bold text-purple-700 mt-1 leading-tight">
        {badge.title}
      </p>
    </motion.div>
  );
}
