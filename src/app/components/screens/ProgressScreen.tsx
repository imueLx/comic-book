"use client";

import { useEffect, useState } from "react";
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

  const totalLessons = lessons.length;
  const totalStars = Object.values(profile.progress).reduce(
    (sum, lp) => sum + (lp.stars || 0),
    0,
  );
  const totalActivitiesDone = Object.values(profile.progress).reduce(
    (sum, lp) => sum + (lp.activitiesCompleted?.length || 0),
    0,
  );

  const lessonRows = lessons.map((lesson) => {
    const progress = profile.progress[lesson.id];
    const isUnlocked =
      !lesson.unlockAfter ||
      lesson.unlockAfter < profile.currentLesson ||
      Boolean(profile.progress[lesson.unlockAfter]?.completed);

    const isCompleted = Boolean(progress?.completed);
    const hasStarted = Boolean(
      progress &&
      ((progress.comicPagesRead?.length || 0) > 0 ||
        (progress.activitiesCompleted?.length || 0) > 0),
    );

    let status: "done" | "keep-going" | "start-next" | "locked" = "start-next";
    if (!isUnlocked) status = "locked";
    else if (isCompleted) status = "done";
    else if (hasStarted) status = "keep-going";

    return {
      lesson,
      progress,
      isUnlocked,
      isCompleted,
      hasStarted,
      status,
    };
  });

  const completedLessons = lessonRows.filter((row) => row.isCompleted).length;
  const inProgressLessons = lessonRows.filter(
    (row) => row.status === "keep-going",
  ).length;
  const lockedLessons = lessonRows.filter(
    (row) => row.status === "locked",
  ).length;
  const overallProgressPercent =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const earnedBadges = badges.filter((b) => profile.badges.includes(b.id));
  const lockedBadges = badges.filter((b) => !profile.badges.includes(b.id));

  const nextLesson = lessonRows.find(
    (row) => row.status === "keep-going" || row.status === "start-next",
  );

  const badgeProgressRows = lockedBadges
    .map((badge) => {
      const target = badge.requirement.count;
      const current = getBadgeCurrentValue({
        badge,
        completedLessons,
        totalStars,
        totalActivitiesDone,
        streak: profile.streak,
      });

      return {
        badge,
        current,
        target,
        remaining: Math.max(target - current, 0),
        percent: Math.min(100, (current / target) * 100),
      };
    })
    .sort((a, b) => a.remaining - b.remaining);

  const nextBadge = badgeProgressRows[0] || null;
  const nextGoalText = nextLesson
    ? nextLesson.status === "keep-going"
      ? `Keep going: ${nextLesson.lesson.title}`
      : `Start next: ${nextLesson.lesson.title}`
    : nextBadge
      ? `${nextBadge.remaining} more to unlock ${nextBadge.badge.title}`
      : "Great job! You finished everything!";

  return (
    <div className="app-shell min-h-dvh flex flex-col">
      <header className="app-header py-3 px-4 sticky top-0 z-10 safe-top">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onBack}
            aria-label="Go back"
            className="min-h-12 pl-1.5 pr-3 rounded-2xl bg-linear-to-b from-amber-100 to-orange-100 border-2 border-amber-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_12px_rgba(251,146,60,0.25)] active:shadow-[0_2px_8px_rgba(251,146,60,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <span className="w-8 h-8 rounded-xl bg-white/70 border border-amber-200 flex items-center justify-center text-sm shadow-sm">
              ←
            </span>
            <span className="text-xs font-extrabold text-amber-800 tracking-wide">
              Back
            </span>
          </motion.button>

          <h2 className="text-base font-extrabold text-gray-900">
            My Progress
          </h2>

          <div
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
              isOnline
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </div>
        </div>
      </header>

      <div className="flex-1 px-4 py-4 max-w-lg mx-auto w-full space-y-4 pb-8 overflow-y-auto">
        {!isOnline && (
          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-sm font-extrabold text-amber-800">
              Offline mode is on.
            </p>
            <p className="text-xs text-amber-700 mt-0.5">
              Your saved progress is still here.
            </p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="app-card p-5 overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-amber-100 to-orange-100 flex items-center justify-center border-2 border-amber-200 shadow-sm">
              <span className="text-3xl">{profile.avatar}</span>
            </div>
            <div>
              <h3 className="font-extrabold text-gray-900 text-lg">
                Great job, {profile.name}!
              </h3>
              <p className="text-xs text-gray-600 font-semibold">
                You finished {completedLessons} of {totalLessons} lessons.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-linear-to-r from-cyan-50 to-sky-50 p-3 mb-3">
            <p className="text-xs font-extrabold text-cyan-800 mb-1">
              Next Goal
            </p>
            <p className="text-sm font-bold text-cyan-700">{nextGoalText}</p>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-linear-to-r from-emerald-400 to-cyan-500"
                style={{ width: `${overallProgressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-gray-600 whitespace-nowrap">
              {completedLessons}/{totalLessons}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-linear-to-b from-emerald-50 to-green-50 rounded-2xl p-3 text-center">
              <p className="text-2xl font-extrabold text-emerald-700">
                {completedLessons}
              </p>
              <p className="text-[10px] text-emerald-600 font-bold">Done</p>
            </div>
            <div className="bg-linear-to-b from-cyan-50 to-sky-50 rounded-2xl p-3 text-center">
              <p className="text-2xl font-extrabold text-cyan-700">
                {inProgressLessons}
              </p>
              <p className="text-[10px] text-cyan-600 font-bold">Keep Going</p>
            </div>
            <div className="bg-linear-to-b from-amber-50 to-yellow-50 rounded-2xl p-3 text-center">
              <p className="text-2xl font-extrabold text-amber-700">
                {profile.streak}
              </p>
              <p className="text-[10px] text-amber-600 font-bold">Streak</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="app-card p-5"
        >
          <h3 className="font-extrabold text-gray-900 mb-3 flex items-center gap-2">
            🌟 Rewards
          </h3>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="rounded-2xl bg-linear-to-b from-amber-50 to-yellow-50 p-3 text-center">
              <p className="text-xl font-extrabold text-amber-700">
                ⭐ {totalStars}
              </p>
              <p className="text-[10px] text-amber-600 font-bold">
                Stars Earned
              </p>
            </div>
            <div className="rounded-2xl bg-linear-to-b from-pink-50 to-rose-50 p-3 text-center">
              <p className="text-xl font-extrabold text-pink-700">
                🏅 {earnedBadges.length}
              </p>
              <p className="text-[10px] text-pink-600 font-bold">Badges Won</p>
            </div>
          </div>

          {nextBadge ? (
            <div className="rounded-2xl bg-gray-50 p-3 border border-gray-100">
              <p className="text-xs font-extrabold text-gray-800 mb-1">
                Next badge
              </p>
              <p className="text-sm font-bold text-gray-700 mb-2">
                {nextBadge.badge.icon} {nextBadge.badge.title}
              </p>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-violet-400 to-fuchsia-500"
                    style={{ width: `${nextBadge.percent}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-gray-600">
                  {nextBadge.current}/{nextBadge.target}
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-500">
                {nextBadge.remaining <= 1
                  ? "1 more to unlock"
                  : `${nextBadge.remaining} more to unlock`}
              </p>
            </div>
          ) : (
            <div className="rounded-2xl bg-emerald-50 p-3 border border-emerald-100">
              <p className="text-sm font-bold text-emerald-700">
                All badges unlocked. Amazing job!
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="app-card p-5"
        >
          <h3 className="font-extrabold text-gray-900 mb-3 flex items-center gap-2">
            📚 Lesson Journey
          </h3>

          <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold whitespace-nowrap">
              ✅ Done {completedLessons}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 text-[11px] font-bold whitespace-nowrap">
              ▶ Keep going {inProgressLessons}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[11px] font-bold whitespace-nowrap">
              🔒 Locked {lockedLessons}
            </span>
          </div>

          {lessons.length === 0 ? (
            <div className="rounded-2xl bg-gray-50 p-3">
              <p className="text-sm font-bold text-gray-700">No lessons yet.</p>
              <p className="text-xs text-gray-500 mt-1">
                Please check again soon.
              </p>
            </div>
          ) : null}

          <div className="space-y-2.5">
            {lessonRows.map((row) => {
              const stars = row.progress?.stars || 0;
              const unlockHint = row.lesson.unlockAfter
                ? `Finish lesson ${row.lesson.unlockAfter} to unlock`
                : null;

              const statusText =
                row.status === "done"
                  ? "Done"
                  : row.status === "keep-going"
                    ? "Keep going"
                    : row.status === "locked"
                      ? "Locked"
                      : "Start next";

              return (
                <div
                  key={row.lesson.id}
                  className={`flex items-center gap-3 rounded-2xl p-3 border ${
                    row.status === "done"
                      ? "bg-emerald-50 border-emerald-100"
                      : row.status === "keep-going"
                        ? "bg-cyan-50 border-cyan-100"
                        : row.status === "locked"
                          ? "bg-gray-50 border-gray-100 opacity-80"
                          : "bg-white border-gray-100"
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg ${
                      row.status === "done"
                        ? "bg-emerald-100"
                        : row.status === "keep-going"
                          ? "bg-cyan-100"
                          : row.status === "locked"
                            ? "bg-gray-200"
                            : "bg-amber-100"
                    }`}
                  >
                    {row.status === "locked" ? "🔒" : row.lesson.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {row.lesson.title}
                    </p>
                    {row.status === "done" ? (
                      <StarRating stars={stars} size="sm" />
                    ) : row.status === "locked" ? (
                      <p className="text-xs text-gray-500 font-medium truncate">
                        {unlockHint || "Locked"}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-500 font-medium">
                        {row.status === "keep-going"
                          ? "You already started this lesson"
                          : row.lesson.subtitle}
                      </p>
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                      row.status === "done"
                        ? "bg-emerald-100 text-emerald-700"
                        : row.status === "keep-going"
                          ? "bg-cyan-100 text-cyan-700"
                          : row.status === "locked"
                            ? "bg-gray-200 text-gray-600"
                            : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {statusText}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          className="app-card p-5"
        >
          <h3 className="font-extrabold text-gray-900 mb-3 flex items-center gap-2">
            🏅 Badge Gallery
          </h3>

          {earnedBadges.length > 0 && (
            <>
              <p className="text-xs text-gray-500 font-semibold mb-2">
                Unlocked
              </p>
              <div className="grid grid-cols-2 gap-2.5 mb-3">
                {earnedBadges.map((badge) => (
                  <BadgeCard key={badge.id} badge={badge} earned />
                ))}
              </div>
            </>
          )}

          {lockedBadges.length > 0 && (
            <>
              <p className="text-xs text-gray-500 font-semibold mb-2">
                Coming next
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {lockedBadges.slice(0, 4).map((badge) => {
                  const progress = badgeProgressRows.find(
                    (row) => row.badge.id === badge.id,
                  );

                  return (
                    <BadgeCard
                      key={badge.id}
                      badge={badge}
                      earned={false}
                      hint={
                        progress
                          ? progress.remaining <= 1
                            ? "1 more to unlock"
                            : `${progress.remaining} more to unlock`
                          : undefined
                      }
                    />
                  );
                })}
              </div>
            </>
          )}
        </motion.div>

        <TomMascot
          message={
            completedLessons === totalLessons
              ? "Great job! You finished it all!"
              : nextLesson?.status === "keep-going"
                ? "Keep going! You are very close!"
                : "Start next and earn more stars!"
          }
          size="sm"
          className="mx-auto"
        />
      </div>
    </div>
  );
}

function getBadgeCurrentValue({
  badge,
  completedLessons,
  totalStars,
  totalActivitiesDone,
  streak,
}: {
  badge: Badge;
  completedLessons: number;
  totalStars: number;
  totalActivitiesDone: number;
  streak: number;
}) {
  switch (badge.requirement.type) {
    case "lessons":
      return completedLessons;
    case "stars":
      return totalStars;
    case "activities":
      return totalActivitiesDone;
    case "streak":
      return streak;
    default:
      return 0;
  }
}

function BadgeCard({
  badge,
  earned,
  hint,
}: {
  badge: Badge;
  earned: boolean;
  hint?: string;
}) {
  return (
    <motion.div
      whileHover={earned ? { scale: 1.03 } : {}}
      className={`rounded-2xl p-3 text-center transition-all min-h-26 flex flex-col items-center justify-center ${
        earned
          ? "bg-linear-to-b from-amber-50 to-yellow-50 shadow-sm"
          : "bg-gray-50"
      }`}
    >
      <span className={`text-2xl ${earned ? "" : "opacity-55"}`}>
        {badge.icon}
      </span>
      <p className="text-[11px] font-bold text-gray-700 mt-1 leading-tight">
        {badge.title}
      </p>
      {earned ? (
        <span className="text-[10px] font-bold text-emerald-600 mt-1">
          Done
        </span>
      ) : (
        <span className="text-[10px] font-semibold text-gray-500 mt-1">
          {hint || "Keep going"}
        </span>
      )}
    </motion.div>
  );
}
