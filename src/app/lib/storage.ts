// ============================================
// localStorage-based Progress Storage
// ============================================

import {
  LearnerProfile,
  LessonProgress,
  AppSettings,
  SkillArea,
} from "./types";

const STORAGE_KEY = "wordPatternAdventure";

const defaultSettings: AppSettings = {
  textSize: "medium",
  audioEnabled: true,
  autoRead: false,
  theme: "light",
  playbackSpeed: "normal",
};

function generateProfileId(): string {
  if (typeof globalThis !== "undefined") {
    const c = globalThis.crypto;
    if (c && typeof c.randomUUID === "function") {
      return c.randomUUID();
    }
  }

  // Fallback for older webviews/devices without crypto.randomUUID.
  return `profile-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createDefaultProfile(name: string, avatar: string): LearnerProfile {
  return {
    id: generateProfileId(),
    name,
    avatar,
    createdAt: new Date().toISOString(),
    totalStars: 0,
    lessonsCompleted: 0,
    currentLesson: 1,
    badges: [],
    streak: 0,
    lastActiveDate: new Date().toISOString().split("T")[0],
    progress: {},
    settings: { ...defaultSettings },
  };
}

// --- Storage API ---

export function getAllProfiles(): LearnerProfile[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveAllProfiles(profiles: LearnerProfile[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

export function getProfile(id: string): LearnerProfile | null {
  return getAllProfiles().find((p) => p.id === id) ?? null;
}

export function getActiveProfileId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(`${STORAGE_KEY}_active`);
}

export function setActiveProfileId(id: string) {
  localStorage.setItem(`${STORAGE_KEY}_active`, id);
}

export function getActiveProfile(): LearnerProfile | null {
  const id = getActiveProfileId();
  if (!id) return null;
  return getProfile(id);
}

export function createProfile(name: string, avatar: string): LearnerProfile {
  const profiles = getAllProfiles();
  const profile = createDefaultProfile(name, avatar);
  profiles.push(profile);
  saveAllProfiles(profiles);
  setActiveProfileId(profile.id);
  return profile;
}

export function updateProfile(profile: LearnerProfile) {
  const profiles = getAllProfiles();
  const idx = profiles.findIndex((p) => p.id === profile.id);
  if (idx >= 0) {
    profiles[idx] = profile;
    saveAllProfiles(profiles);
  }
}

export function updateProfileName(profileId: string, name: string) {
  const profile = getProfile(profileId);
  if (!profile) return;
  const trimmed = name.trim();
  if (!trimmed) return;
  profile.name = trimmed;
  updateProfile(profile);
}

export function deleteProfile(id: string) {
  const profiles = getAllProfiles().filter((p) => p.id !== id);
  saveAllProfiles(profiles);
  if (getActiveProfileId() === id) {
    localStorage.removeItem(`${STORAGE_KEY}_active`);
  }
}

// --- Progress helpers ---

export function saveLessonProgress(
  profileId: string,
  lessonId: number,
  update: Partial<LessonProgress>,
) {
  const profile = getProfile(profileId);
  if (!profile) return;

  const existing = profile.progress[lessonId] || {
    lessonId,
    comicPagesRead: [],
    activitiesCompleted: [],
    activityResults: [],
    stars: 0,
    completed: false,
    timeSpentSeconds: 0,
    lastAccessed: new Date().toISOString(),
  };

  const merged: LessonProgress = {
    ...existing,
    ...update,
    lastAccessed: new Date().toISOString(),
    comicPagesRead: Array.from(
      new Set([
        ...(existing.comicPagesRead || []),
        ...(update.comicPagesRead || []),
      ]),
    ),
    activitiesCompleted: Array.from(
      new Set([
        ...(existing.activitiesCompleted || []),
        ...(update.activitiesCompleted || []),
      ]),
    ),
    activityResults: [
      ...(existing.activityResults || []),
      ...(update.activityResults || []),
    ],
  };

  profile.progress[lessonId] = merged;

  // Update aggregate stats
  const completedLessons = Object.values(profile.progress).filter(
    (p) => p.completed,
  ).length;
  profile.lessonsCompleted = completedLessons;
  profile.totalStars = Object.values(profile.progress).reduce(
    (sum, p) => sum + p.stars,
    0,
  );

  // Update streak
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  if (profile.lastActiveDate === yesterday) {
    profile.streak += 1;
  } else if (profile.lastActiveDate !== today) {
    profile.streak = 1;
  }
  profile.lastActiveDate = today;

  updateProfile(profile);
}

export function completeLesson(
  profileId: string,
  lessonId: number,
  stars: number,
) {
  const profile = getProfile(profileId);
  if (!profile) return;

  saveLessonProgress(profileId, lessonId, {
    completed: true,
    stars: Math.max(profile.progress[lessonId]?.stars ?? 0, stars),
  });

  // Unlock next lesson
  const updated = getProfile(profileId);
  if (updated && lessonId >= updated.currentLesson) {
    updated.currentLesson = lessonId + 1;
    updateProfile(updated);
  }
}

export function hasSeenOnboarding(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(`${STORAGE_KEY}_onboarded`) === "true";
}

export function setOnboarded() {
  localStorage.setItem(`${STORAGE_KEY}_onboarded`, "true");
}

export function updateSettings(
  profileId: string,
  settings: Partial<AppSettings>,
) {
  const profile = getProfile(profileId);
  if (!profile) return;
  profile.settings = { ...profile.settings, ...settings };
  updateProfile(profile);
}

export function awardBadge(profileId: string, badgeId: string) {
  const profile = getProfile(profileId);
  if (!profile) return;
  if (!profile.badges.includes(badgeId)) {
    profile.badges.push(badgeId);
    updateProfile(profile);
  }
}

// --- Skill Analysis ---

export interface SkillReport {
  skill: SkillArea;
  label: string;
  total: number;
  correct: number;
  accuracy: number;
  needsReview: boolean;
}

const skillLabels: Record<SkillArea, string> = {
  wordFamily_at: "–at Word Family",
  wordFamily_an: "–an Word Family",
  shortVowels: "Short Vowel Words",
  blends: "Blends (sh, br, fr)",
  contextClues: "Context Clues",
  sentenceReading: "Sentence Reading",
};

export function getSkillAnalysis(profileId: string): SkillReport[] {
  const profile = getProfile(profileId);
  if (!profile) return [];

  const skillMap: Record<string, { total: number; correct: number }> = {};
  for (const skill of Object.keys(skillLabels)) {
    skillMap[skill] = { total: 0, correct: 0 };
  }

  for (const lp of Object.values(profile.progress)) {
    for (const result of lp.activityResults || []) {
      if (result.skillArea && skillMap[result.skillArea]) {
        skillMap[result.skillArea].total += 1;
        if (result.correct) skillMap[result.skillArea].correct += 1;
      }
    }
  }

  return (Object.keys(skillLabels) as SkillArea[]).map((skill) => {
    const data = skillMap[skill];
    const accuracy = data.total > 0 ? data.correct / data.total : 0;
    return {
      skill,
      label: skillLabels[skill],
      total: data.total,
      correct: data.correct,
      accuracy: Math.round(accuracy * 100),
      needsReview: data.total > 0 && accuracy < 0.7,
    };
  });
}
