// ============================================
// Activities data for each lesson
// ============================================

import { Activity } from "../lib/types";

export const activities: Activity[] = [
  // Lesson 1: Intro - no activities (just comic)

  // Lesson 2: -at word family
  {
    id: "at-tap-1",
    lessonId: 2,
    type: "tapCorrectWord",
    title: "Find the -at word!",
    instruction: "Tap the word that belongs to the -at family.",
    prompt: "Which word ends with -at?",
    correctAnswer: "Cat",
    options: ["Cat", "Dog", "Frog", "Pig"],
  },
  {
    id: "at-tap-2",
    lessonId: 2,
    type: "tapCorrectWord",
    title: "Find the -at word!",
    instruction: "Tap the word that belongs to the -at family.",
    prompt: "Which word ends with -at?",
    correctAnswer: "Bat",
    options: ["Sun", "Bat", "Cup", "Fan"],
  },
  {
    id: "at-sentence-1",
    lessonId: 2,
    type: "completeTheSentence",
    title: "Finish the sentence!",
    instruction: "Pick the right word to complete the sentence.",
    sentence: "The ___ sat on the mat.",
    blank: "cat",
    correctAnswer: "cat",
    options: ["cat", "cup", "fan"],
  },
  {
    id: "at-listen-1",
    lessonId: 2,
    type: "listenAndChoose",
    title: "Listen and pick!",
    instruction: "Listen to the word and tap the correct one.",
    word: "Hat",
    correctAnswer: "Hat",
    options: ["Hat", "Hot", "Hit"],
  },

  // Lesson 3: -an word family
  {
    id: "an-tap-1",
    lessonId: 3,
    type: "tapCorrectWord",
    title: "Find the -an word!",
    instruction: "Tap the word that belongs to the -an family.",
    prompt: "Which word ends with -an?",
    correctAnswer: "Fan",
    options: ["Fan", "Cat", "Cup", "Ship"],
  },
  {
    id: "an-tap-2",
    lessonId: 3,
    type: "tapCorrectWord",
    title: "Find the -an word!",
    instruction: "Tap the word that belongs to the -an family.",
    prompt: "Which word ends with -an?",
    correctAnswer: "Van",
    options: ["Bat", "Van", "Bed", "Frog"],
  },
  {
    id: "an-sentence-1",
    lessonId: 3,
    type: "completeTheSentence",
    title: "Finish the sentence!",
    instruction: "Pick the right word to complete the sentence.",
    sentence: "The ___ is in the pan.",
    blank: "man",
    correctAnswer: "man",
    options: ["man", "mat", "bed"],
  },
  {
    id: "an-sort-1",
    lessonId: 3,
    type: "wordFamilySort",
    title: "Sort the word families!",
    instruction: "Put each word in the right family.",
    family1: { pattern: "-at", words: ["cat", "bat", "mat"] },
    family2: { pattern: "-an", words: ["fan", "man", "pan"] },
    allWords: ["cat", "fan", "bat", "man", "mat", "pan"],
  },

  // Lesson 4: Short vowels
  {
    id: "sv-tap-1",
    lessonId: 4,
    type: "tapCorrectWord",
    title: "Short vowel check!",
    instruction: "Which word has a short vowel sound?",
    prompt: "Tap the short vowel word.",
    correctAnswer: "Pig",
    options: ["Pig", "Cake", "Tree", "Boat"],
  },
  {
    id: "sv-listen-1",
    lessonId: 4,
    type: "listenAndChoose",
    title: "Listen and pick!",
    instruction: "Listen to the word and tap the correct one.",
    word: "Cup",
    correctAnswer: "Cup",
    options: ["Cup", "Cape", "Cope"],
  },
  {
    id: "sv-sentence-1",
    lessonId: 4,
    type: "completeTheSentence",
    title: "Finish the sentence!",
    instruction: "Pick the right word to complete the sentence.",
    sentence: "I sleep on my ___.",
    blank: "bed",
    correctAnswer: "bed",
    options: ["bed", "bat", "pan"],
  },

  // Lesson 5: Blends
  {
    id: "bl-tap-1",
    lessonId: 5,
    type: "tapCorrectWord",
    title: "Find the blend!",
    instruction: "Which word starts with 'sh'?",
    prompt: "Which word starts with sh?",
    correctAnswer: "Ship",
    options: ["Ship", "Frog", "Brush", "Cup"],
  },
  {
    id: "bl-match-1",
    lessonId: 5,
    type: "matchWords",
    title: "Match the blends!",
    instruction: "Match each blend to its word.",
    pairs: [
      { word: "sh", match: "Ship" },
      { word: "br", match: "Brush" },
      { word: "fr", match: "Frog" },
    ],
  },
  {
    id: "bl-listen-1",
    lessonId: 5,
    type: "listenAndChoose",
    title: "Listen and pick!",
    instruction: "Listen to the word and tap the correct one.",
    word: "Frog",
    correctAnswer: "Frog",
    options: ["Frog", "Flag", "Fog"],
  },

  // Lesson 6: Context Clues
  {
    id: "cc-sentence-1",
    lessonId: 6,
    type: "completeTheSentence",
    title: "Use context clues!",
    instruction: "Read the sentence and pick the word that makes sense.",
    sentence: "The frog can ___.",
    blank: "hop",
    correctAnswer: "hop",
    options: ["hop", "fly", "sing"],
  },
  {
    id: "cc-sentence-2",
    lessonId: 6,
    type: "completeTheSentence",
    title: "Use context clues!",
    instruction: "Read the sentence and pick the word that makes sense.",
    sentence: "The cat sat on the ___.",
    blank: "mat",
    correctAnswer: "mat",
    options: ["mat", "van", "pen"],
  },
  {
    id: "cc-tap-1",
    lessonId: 6,
    type: "tapCorrectWord",
    title: "Pick the right word!",
    instruction: "What word makes sense in: 'The ___ can swim.'",
    prompt: "The ___ can swim.",
    correctAnswer: "Fish",
    options: ["Fish", "Cat", "Hat", "Pan"],
  },
];

export function getActivitiesForLesson(lessonId: number): Activity[] {
  return activities.filter((a) => a.lessonId === lessonId);
}
