export type ComicCharacterId = "teacher" | "ana" | "ben" | "tom";

export interface ComicCharacterOnStage {
  id: ComicCharacterId;
  pose: "pointing" | "listening" | "thinking" | "cheering";
  expression: "happy" | "excited" | "curious" | "proud";
  x: "left" | "center" | "right";
}

export interface ComicDialogueLine {
  speaker: ComicCharacterId;
  text: string;
  tone?: "normal" | "question" | "excited";
}

export interface VisualVocabularyItem {
  id: string;
  word: string;
  label: string;
  emoji: string;
  hint?: string;
}

export interface MiniActivityOption {
  id: string;
  label: string;
  emoji: string;
  isCorrect: boolean;
}

export interface MiniActivity {
  question: string;
  prompt: string;
  options: MiniActivityOption[];
  successText: string;
  retryText: string;
}

export interface ComicLessonPageData {
  pageNumber: number;
  sceneTitle: string;
  narration: string;
  panelLayout: Array<"wide" | "half" | "focus">;
  charactersOnScreen: ComicCharacterOnStage[];
  dialogueLines: ComicDialogueLine[];
  vocabularyTargets: string[];
  visuals: VisualVocabularyItem[];
  audioKey: string;
  miniActivity?: MiniActivity;
  feedbackText: string;
}

export const comicLessonPages: ComicLessonPageData[] = [
  {
    pageNumber: 13,
    sceneTitle: "Reading Fluency",
    narration:
      "Teacher Mia guides a fun fluency challenge while Tom cheers the class.",
    panelLayout: ["wide", "half", "half", "focus"],
    charactersOnScreen: [
      { id: "teacher", pose: "pointing", expression: "excited", x: "left" },
      { id: "ana", pose: "listening", expression: "curious", x: "center" },
      { id: "ben", pose: "thinking", expression: "curious", x: "right" },
      { id: "tom", pose: "cheering", expression: "happy", x: "right" },
    ],
    dialogueLines: [
      { speaker: "teacher", text: "Today we will practice reading fluency!" },
      { speaker: "ben", text: "That sounds fun!", tone: "excited" },
      { speaker: "tom", text: "Meow! I love words!", tone: "excited" },
      {
        speaker: "teacher",
        text: "Which word is spelled correctly?",
        tone: "question",
      },
    ],
    vocabularyTargets: ["cat", "cake", "lake", "ball", "night"],
    visuals: [
      { id: "cat", word: "cat", label: "Cat", emoji: "🐱", hint: "Tom's name" },
      { id: "cake", word: "cake", label: "Cake", emoji: "🎂" },
      { id: "lake", word: "lake", label: "Lake", emoji: "🌊" },
      { id: "ball", word: "ball", label: "Ball", emoji: "⚽" },
      { id: "night", word: "night", label: "Night", emoji: "🌙" },
      { id: "frog", word: "frog", label: "Frog", emoji: "🐸" },
      { id: "ship", word: "ship", label: "Ship", emoji: "🚢" },
      { id: "brush", word: "brush", label: "Brush", emoji: "🪥" },
    ],
    audioKey: "reading-fluency-13",
    miniActivity: {
      question: "Which word is spelled correctly?",
      prompt: "Tap the card that matches Tom's picture.",
      options: [
        { id: "kat", label: "kat", emoji: "🐱", isCorrect: false },
        { id: "cat", label: "cat", emoji: "🐱", isCorrect: true },
        { id: "cot", label: "cot", emoji: "🛏️", isCorrect: false },
      ],
      successText: "Great job! CAT is correct. +1 star",
      retryText: "Nice try. Look at Tom and tap CAT.",
    },
    feedbackText: "Excellent reading! You are improving your fluency.",
  },
];

export function getComicLessonPage(pageNumber: number) {
  return comicLessonPages.find((page) => page.pageNumber === pageNumber);
}
