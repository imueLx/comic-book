export interface PracticeComicPanel {
  id: number;
  title: string;
  speaker: "teacher" | "ana" | "ben" | "students";
  speech: string;
  expectedWord?: "ran" | "van" | "can";
  prompt?: string;
  showTom?: boolean;
}

export const practiceComicPanels: PracticeComicPanel[] = [
  {
    id: 1,
    title: "Panel 1",
    speaker: "teacher",
    speech: "Now let's practice!",
    prompt: "Look at the picture cards on the board.",
  },
  {
    id: 2,
    title: "Panel 2",
    speaker: "ana",
    speech: "Ran!",
    expectedWord: "ran",
    prompt: "Tap the running child image or word.",
  },
  {
    id: 3,
    title: "Panel 3",
    speaker: "ben",
    speech: "Van!",
    expectedWord: "van",
    showTom: true,
    prompt: "Tap the van image or word.",
  },
  {
    id: 4,
    title: "Panel 4",
    speaker: "students",
    speech: "Can!",
    expectedWord: "can",
    prompt: "Tap the can image or word.",
  },
];

export const practiceObjectCards = [
  { id: "ran" as const, word: "Ran", emoji: "🏃" },
  { id: "van" as const, word: "Van", emoji: "🚐" },
  { id: "can" as const, word: "Can", emoji: "🥫" },
];
