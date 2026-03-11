"use client";

import { motion } from "framer-motion";
import { LearnerProfile } from "../../lib/types";
import { getSkillAnalysis } from "../../lib/storage";
import { lessons, badges } from "../../data/lessons";
import StarRating from "../StarRating";

interface TeacherDashboardProps {
  profile: LearnerProfile;
  onBack: () => void;
}

export default function TeacherDashboard({
  profile,
  onBack,
}: TeacherDashboardProps) {
  const completedCount = Object.values(profile.progress).filter(
    (lp) => lp.completed,
  ).length;
  const totalStars = Object.values(profile.progress).reduce(
    (s, lp) => s + (lp.stars || 0),
    0,
  );
  const overallPct = Math.round((completedCount / lessons.length) * 100);

  return (
    <div className="app-shell min-h-dvh flex flex-col">
      {/* Header */}
      <header className="app-header py-3 px-4 sticky top-0 z-10 safe-top">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={onBack}
            className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-lg cursor-pointer active:bg-gray-200"
          >
            ←
          </motion.button>
          <h2 className="text-base font-extrabold text-gray-900">
            My Dashboard
          </h2>
          <div className="w-11" />
        </div>
      </header>

      <div className="flex-1 px-4 py-4 max-w-2xl mx-auto w-full pb-8 space-y-3">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="app-card p-5 flex items-center gap-3"
        >
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-violet-100 to-purple-100 flex items-center justify-center border-2 border-violet-200">
            <span className="text-3xl">{profile.avatar}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-extrabold text-gray-900 text-lg">
              {profile.name}
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              🔥 {profile.streak} day streak · {profile.badges.length} badges
            </p>
          </div>
        </motion.div>

        {/* Overall progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="app-card p-5"
        >
          <h4 className="font-extrabold text-gray-900 mb-3 text-base">
            📈 Overall Progress
          </h4>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-4 rounded-full bg-gray-200 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${overallPct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full bg-linear-to-r from-violet-500 to-purple-500"
              />
            </div>
            <span className="text-lg font-extrabold text-violet-700 min-w-12 text-right">
              {overallPct}%
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-violet-50 rounded-xl p-3 text-center">
              <p className="text-xl font-extrabold text-violet-700">
                {completedCount}/{lessons.length}
              </p>
              <p className="text-[10px] text-violet-500 font-bold uppercase">
                Lessons
              </p>
            </div>
            <div className="bg-amber-50 rounded-xl p-3 text-center">
              <p className="text-xl font-extrabold text-amber-700">
                {totalStars} ⭐
              </p>
              <p className="text-[10px] text-amber-500 font-bold uppercase">
                Stars
              </p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-3 text-center">
              <p className="text-xl font-extrabold text-emerald-700">
                {profile.badges.length}
              </p>
              <p className="text-[10px] text-emerald-500 font-bold uppercase">
                Badges
              </p>
            </div>
          </div>
        </motion.div>

        {/* Skill Analysis */}
        <SkillAnalysisCard profileId={profile.id} />

        {/* Per-lesson breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="app-card p-5"
        >
          <h4 className="font-extrabold text-gray-900 mb-3">
            📚 Lesson Progress
          </h4>
          <div className="space-y-2.5">
            {lessons.map((lesson) => {
              const lp = profile.progress[lesson.id];
              const timeMin = lp ? Math.round(lp.timeSpentSeconds / 60) : 0;
              return (
                <div
                  key={lesson.id}
                  className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                      lp?.completed ? "bg-emerald-100" : "bg-gray-100"
                    }`}
                  >
                    {lesson.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {lesson.title}
                    </p>
                    {lp?.completed ? (
                      <div className="flex items-center gap-2">
                        <StarRating stars={lp.stars || 0} size="sm" />
                        <span className="text-xs text-gray-500">
                          {lp.activitiesCompleted.length} activities
                          {timeMin > 0 ? ` · ${timeMin}m` : ""}
                        </span>
                      </div>
                    ) : lp ? (
                      <p className="text-xs text-amber-500 font-medium">
                        In progress
                        {timeMin > 0 ? ` · ${timeMin}m spent` : ""}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400 font-medium">
                        Not started
                      </p>
                    )}
                  </div>
                  {lp?.completed && (
                    <span className="text-emerald-500 text-sm">✅</span>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Badge collection */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="app-card p-5"
        >
          <h4 className="font-extrabold text-gray-900 mb-2">
            🏅 Badges Earned
          </h4>
          {profile.badges.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.badges.map((bId) => {
                const badge = badges.find((b) => b.id === bId);
                return (
                  <span
                    key={bId}
                    className="bg-linear-to-b from-amber-50 to-yellow-50 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-700"
                  >
                    {badge?.icon || "🏅"} {badge?.title || bId}
                  </span>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-gray-400 font-medium">
              Complete lessons and activities to earn badges!
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function SkillAnalysisCard({ profileId }: { profileId: string }) {
  const skills = getSkillAnalysis(profileId);
  const hasData = skills.some((s) => s.total > 0);
  const needsReview = skills.filter((s) => s.needsReview);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="app-card p-5"
    >
      <h4 className="font-extrabold text-gray-900 mb-3 flex items-center gap-2">
        📊 Skill Analysis
      </h4>
      {!hasData ? (
        <p className="text-xs text-gray-400 font-medium">
          No activity data yet. Skills will be tracked as you complete
          activities.
        </p>
      ) : (
        <>
          <div className="space-y-2.5 mb-4">
            {skills
              .filter((s) => s.total > 0)
              .map((s) => (
                <div key={s.skill} className="bg-gray-50 rounded-xl p-3">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-bold text-gray-800">{s.label}</p>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        s.accuracy >= 80
                          ? "bg-emerald-100 text-emerald-700"
                          : s.accuracy >= 50
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {s.accuracy}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        s.accuracy >= 80
                          ? "bg-emerald-400"
                          : s.accuracy >= 50
                            ? "bg-amber-400"
                            : "bg-red-400"
                      }`}
                      style={{ width: `${s.accuracy}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">
                    {s.correct}/{s.total} correct
                  </p>
                </div>
              ))}
          </div>
          {needsReview.length > 0 && (
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-200">
              <p className="text-sm font-bold text-amber-800 mb-1">
                📝 Review Suggestions
              </p>
              <ul className="text-xs text-amber-700 space-y-1">
                {needsReview.map((s) => (
                  <li key={s.skill}>
                    • <strong>{s.label}</strong> needs more practice (
                    {s.accuracy}% accuracy)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
