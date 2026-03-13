// ============================================
// Lessons structure mapping comic pages to activities
// ============================================

import { Lesson, Badge } from "../lib/types";

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "A New Reading Lesson",
    subtitle: "Meet Teacher Mia & learn about word patterns",
    icon: "📖",
    comicPages: [1, 2, 3],
    activities: [],
  },
  {
    id: 2,
    title: "The –at Word Family",
    subtitle: "Learn cat, bat, hat, mat and read sentences",
    icon: "🐱",
    comicPages: [4, 5],
    activities: ["at-tap-1", "at-tap-2", "at-sentence-1", "at-listen-1"],
    unlockAfter: 1,
  },
  {
    id: 3,
    title: "The –an Word Family",
    subtitle: "Learn fan, man, pan and practice more",
    icon: "🌀",
    comicPages: [6, 7],
    activities: ["an-tap-1", "an-tap-2", "an-sentence-1", "an-sort-1"],
    unlockAfter: 2,
  },
  {
    id: 4,
    title: "Short Vowel Words",
    subtitle: "Read pig, pen, cup, bed",
    icon: "🔤",
    comicPages: [8],
    activities: ["sv-tap-1", "sv-listen-1", "sv-sentence-1"],
    unlockAfter: 3,
  },
  {
    id: 5,
    title: "Blends",
    subtitle: "Learn sh, br, fr blends",
    icon: "🔗",
    comicPages: [9],
    activities: ["bl-tap-1", "bl-match-1", "bl-listen-1"],
    unlockAfter: 4,
  },
  {
    id: 6,
    title: "Context Clues",
    subtitle: "Use clues to find the right word",
    icon: "🧩",
    comicPages: [10, 11, 12],
    activities: ["cc-sentence-1", "cc-sentence-2", "cc-tap-1"],
    unlockAfter: 5,
  },
  {
    id: 7,
    title: "Reading Fluency and Comprehension",
    subtitle: "Extra practice with sounds, rhyme, and word meanings",
    icon: "📘",
    comicPages: [13, 14],
    activities: ["rfc-spelling-1", "rfc-rhyme-1", "rfc-meaning-1"],
    unlockAfter: 6,
  },
];

export const badges: Badge[] = [
  {
    id: "first-lesson",
    title: "First Steps",
    description: "Complete your first lesson",
    icon: "🌟",
    requirement: { type: "lessons", count: 1 },
  },
  {
    id: "three-lessons",
    title: "Reading Explorer",
    description: "Complete 3 lessons",
    icon: "🚀",
    requirement: { type: "lessons", count: 3 },
  },
  {
    id: "all-lessons",
    title: "Word Pattern Master",
    description: "Complete all 7 lessons",
    icon: "👑",
    requirement: { type: "lessons", count: 7 },
  },
  {
    id: "five-stars",
    title: "Star Collector",
    description: "Earn 5 stars total",
    icon: "⭐",
    requirement: { type: "stars", count: 5 },
  },
  {
    id: "fifteen-stars",
    title: "Super Star",
    description: "Earn 15 stars total",
    icon: "🌠",
    requirement: { type: "stars", count: 15 },
  },
  {
    id: "ten-activities",
    title: "Practice Pro",
    description: "Complete 10 activities",
    icon: "🏆",
    requirement: { type: "activities", count: 10 },
  },
  {
    id: "three-streak",
    title: "3-Day Streak",
    description: "Learn 3 days in a row",
    icon: "🔥",
    requirement: { type: "streak", count: 3 },
  },
];
