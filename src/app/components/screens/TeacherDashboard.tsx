"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LearnerProfile } from "../../lib/types";
import { getAllProfiles } from "../../lib/storage";
import { lessons } from "../../data/lessons";
import StarRating from "../StarRating";

interface TeacherDashboardProps {
  onBack: () => void;
}

export default function TeacherDashboard({ onBack }: TeacherDashboardProps) {
  const [profiles] = useState<LearnerProfile[]>(getAllProfiles);
  const [selectedProfile, setSelectedProfile] = useState<LearnerProfile | null>(
    null,
  );

  return (
    <div className="min-h-dvh bg-linear-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-3 px-4 sticky top-0 z-10 safe-top">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={selectedProfile ? () => setSelectedProfile(null) : onBack}
            className="text-sm font-semibold text-blue-600 min-h-9 cursor-pointer"
          >
            ← {selectedProfile ? "All Learners" : "Back"}
          </motion.button>
          <h2 className="text-base font-bold text-gray-800">
            👩‍🏫 Teacher Dashboard
          </h2>
          <div className="w-12" />
        </div>
      </header>

      <div className="flex-1 px-4 py-4 max-w-2xl mx-auto w-full">
        {/* Profile list */}
        {!selectedProfile ? (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-700 mb-1">Overview</h3>
              <p className="text-sm text-gray-500">
                {profiles.length} learner{profiles.length !== 1 ? "s" : ""}{" "}
                registered
              </p>
            </div>

            {profiles.length === 0 ? (
              <p className="text-center text-gray-400 mt-8">
                No learner profiles yet.
              </p>
            ) : (
              profiles.map((p) => {
                const completed = Object.values(p.progress).filter(
                  (lp) => lp.completed,
                ).length;
                const totalStars = Object.values(p.progress).reduce(
                  (s, lp) => s + (lp.stars || 0),
                  0,
                );
                return (
                  <motion.button
                    key={p.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedProfile(p)}
                    className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center gap-3 text-left cursor-pointer"
                  >
                    <span className="text-3xl">{p.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800">{p.name}</p>
                      <p className="text-xs text-gray-500">
                        {completed}/{lessons.length} lessons · {totalStars} ⭐ ·{" "}
                        {p.badges.length} badges · 🔥 {p.streak}
                      </p>
                    </div>
                    <span className="text-gray-400">›</span>
                  </motion.button>
                );
              })
            )}
          </div>
        ) : (
          /* Single profile detail view */
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center gap-3">
              <span className="text-4xl">{selectedProfile.avatar}</span>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  {selectedProfile.name}
                </h3>
                <p className="text-xs text-gray-500">
                  Joined{" "}
                  {new Date(selectedProfile.createdAt).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500">
                  🔥 {selectedProfile.streak} day streak ·{" "}
                  {selectedProfile.badges.length} badges
                </p>
              </div>
            </div>

            {/* Per-lesson breakdown */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-700 mb-3">Lesson Progress</h4>
              <div className="space-y-3">
                {lessons.map((lesson) => {
                  const lp = selectedProfile.progress[lesson.id];
                  return (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-3 bg-gray-50 rounded-lg p-2.5"
                    >
                      <span className="text-lg">{lesson.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-700 truncate">
                          {lesson.title}
                        </p>
                        {lp?.completed ? (
                          <div className="flex items-center gap-2">
                            <StarRating stars={lp.stars || 0} size="sm" />
                            <span className="text-xs text-gray-400">
                              {lp.activitiesCompleted.length} activities done
                            </span>
                          </div>
                        ) : lp ? (
                          <p className="text-xs text-blue-500">
                            In progress...
                          </p>
                        ) : (
                          <p className="text-xs text-gray-400">Not started</p>
                        )}
                      </div>
                      {lp?.completed && (
                        <span className="text-green-500 text-xs">✅</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Badge collection */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-700 mb-2">Badges Earned</h4>
              {selectedProfile.badges.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedProfile.badges.map((bId) => (
                    <span
                      key={bId}
                      className="bg-yellow-50 border border-yellow-200 px-2 py-1 rounded-lg text-xs font-medium"
                    >
                      {bId}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400">No badges yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
