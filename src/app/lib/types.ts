// ============================================
// Core Types for The Word Pattern Adventure
// ============================================

export type Character = "teacher" | "ana" | "ben" | "narrator" | "students";

export type Screen =
  | "splash"
  | "onboarding"
  | "profile"
  | "home"
  | "lessonMap"
  | "comicBook"
  | "comicReader"
  | "activity"
  | "results"
  | "progress"
  | "teacherDashboard"
  | "settings";

export type ActivityType =
  | "tapCorrectWord"
  | "completeTheSentence"
  | "wordFamilySort"
  | "listenAndChoose"
  | "matchWords";

// --- Content Schema ---

export interface DialogLine {
  character: Character;
  text: string;
}

export interface ComicPage {
  pageNumber: number;
  title: string;
  background: string;
  dialog: DialogLine[];
  boardWords?: string[];
  boardLabel?: string;
  highlightPattern?: string;
  isQuiz?: boolean;
  quizSentence?: string;
  quizAnswer?: string;
  quizOptions?: string[];
  isCover?: boolean;
  isEnd?: boolean;
  scene?: string;
}

export interface Activity {
  id: string;
  lessonId: number;
  type: ActivityType;
  title: string;
  instruction: string;
  // tapCorrectWord
  prompt?: string;
  correctAnswer?: string;
  options?: string[];
  // completeTheSentence
  sentence?: string;
  blank?: string;
  // wordFamilySort
  family1?: { pattern: string; words: string[] };
  family2?: { pattern: string; words: string[] };
  allWords?: string[];
  // listenAndChoose
  word?: string;
  // matchWords
  pairs?: { word: string; match: string }[];
  // hint for wrong answers
  hint?: string;
  // skill area this activity covers
  skillArea?: SkillArea;
}

export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  comicPages: number[]; // page numbers
  activities: string[]; // activity IDs
  unlockAfter?: number; // lesson ID required to unlock
}

// --- Progress & Gamification ---

export interface LessonProgress {
  lessonId: number;
  comicPagesRead: number[];
  activitiesCompleted: string[];
  activityResults: ActivityResult[];
  stars: number; // 0-3
  completed: boolean;
  timeSpentSeconds: number;
  lastAccessed: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: {
    type: "lessons" | "stars" | "activities" | "streak";
    count: number;
  };
}

export interface LearnerProfile {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
  totalStars: number;
  lessonsCompleted: number;
  currentLesson: number;
  badges: string[];
  streak: number;
  lastActiveDate: string;
  progress: Record<number, LessonProgress>;
  settings: AppSettings;
}

export type SkillArea =
  | "wordFamily_at"
  | "wordFamily_an"
  | "shortVowels"
  | "blends"
  | "contextClues"
  | "sentenceReading";

export interface AppSettings {
  textSize: "small" | "medium" | "large";
  audioEnabled: boolean;
  autoRead: boolean;
  theme: "light" | "dark";
  playbackSpeed: "slow" | "normal";
}

export interface ActivityResult {
  activityId: string;
  correct: boolean;
  attempts: number;
  timeSpentSeconds: number;
  skillArea?: SkillArea;
}
