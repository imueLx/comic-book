export type Character =
  | "teacher"
  | "ana"
  | "ben"
  | "tom"
  | "narrator"
  | "students";

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

const comicPagesData: ComicPage[] = [
  {
    pageNumber: 1,
    title: "The Word Pattern Adventure",
    background: "bg-linear-to-b from-sky to-mint",
    isCover: true,
    scene: "cover",
    dialog: [
      {
        character: "narrator",
        text: "A comic story that helps Grade 3 learners read words correctly using word patterns.",
      },
    ],
  },
  {
    pageNumber: 2,
    title: "A New Reading Lesson",
    background: "bg-linear-to-b from-lavender to-peach",
    scene: "classroom",
    dialog: [
      {
        character: "narrator",
        text: "One morning in Grade 3, Teacher Mia prepared a fun reading lesson.",
      },
      {
        character: "teacher",
        text: "Today we will learn how word patterns help us read words correctly.",
      },
      {
        character: "ana",
        text: "What are word patterns?",
      },
      {
        character: "ben",
        text: "Are they like a reading trick?",
      },
    ],
  },
  {
    pageNumber: 3,
    title: "What Are Word Patterns?",
    background: "bg-linear-to-b from-sky to-lavender",
    scene: "classroom-board",
    dialog: [
      {
        character: "teacher",
        text: "Word patterns are groups of words that have the same ending sound.",
      },
      {
        character: "ana",
        text: "They all end with -at!",
      },
    ],
    boardWords: ["Cat", "Bat", "Hat", "Mat"],
    boardLabel: "Word Patterns",
    highlightPattern: "at",
  },
  {
    pageNumber: 4,
    title: "The –at Word Family",
    background: "bg-linear-to-b from-mint to-sky",
    scene: "reading",
    dialog: [
      {
        character: "teacher",
        text: "Yes! This is called the –at word family.",
      },
      {
        character: "ben",
        text: "If I know –at, I can read many words!",
      },
      {
        character: "students",
        text: "Cat! Bat! Hat! Mat!",
      },
    ],
    boardWords: ["Cat", "Bat", "Hat", "Mat"],
    highlightPattern: "at",
  },
  {
    pageNumber: 5,
    title: "Reading Sentences",
    background: "bg-linear-to-b from-peach to-pink",
    scene: "classroom",
    dialog: [
      {
        character: "teacher",
        text: "Let's read a sentence.",
      },
      {
        character: "students",
        text: "The cat sat on the mat.",
      },
      {
        character: "ana",
        text: "That was easy!",
      },
      {
        character: "teacher",
        text: "Word patterns help us read faster.",
      },
    ],
    highlightPattern: "at",
  },
  {
    pageNumber: 6,
    title: "Another Word Family",
    background: "bg-linear-to-b from-lavender to-mint",
    scene: "classroom-board",
    dialog: [
      {
        character: "teacher",
        text: "Let's learn another word pattern.",
      },
      {
        character: "ben",
        text: "These words end with –an!",
      },
      {
        character: "students",
        text: "Fan! Man! Pan!",
      },
    ],
    boardWords: ["Fan", "Man", "Pan"],
    boardLabel: "New Pattern!",
    highlightPattern: "an",
  },
  {
    pageNumber: 7,
    title: "Practice Time",
    background: "bg-linear-to-b from-sky to-peach",
    scene: "practice",
    dialog: [
      {
        character: "teacher",
        text: "Now let's practice.",
      },
      {
        character: "ana",
        text: "Ran!",
      },
      {
        character: "ben",
        text: "Van!",
      },
      {
        character: "students",
        text: "Can!",
      },
      {
        character: "teacher",
        text: "Excellent reading!",
      },
    ],
    boardWords: ["Ran", "Van", "Can"],
    highlightPattern: "an",
  },
  {
    pageNumber: 8,
    title: "Short Vowel Words",
    background: "bg-linear-to-b from-pink to-lavender",
    scene: "classroom-board",
    dialog: [
      {
        character: "teacher",
        text: "Short vowels also help us read words.",
      },
      {
        character: "ana",
        text: "Pig! Pen!",
      },
      {
        character: "ben",
        text: "Cup! Bed!",
      },
    ],
    boardWords: ["Pig", "Pen", "Cup", "Bed"],
    boardLabel: "Short Vowels",
  },
  {
    pageNumber: 9,
    title: "Blends",
    background: "bg-linear-to-b from-mint to-lavender",
    scene: "classroom-board",
    dialog: [
      {
        character: "teacher",
        text: "Sometimes letters work together. These are called blends.",
      },
      {
        character: "students",
        text: "Ship! Brush! Frog!",
      },
    ],
    boardWords: ["sh → Ship", "br → Brush", "fr → Frog"],
    boardLabel: "Blends",
  },
  {
    pageNumber: 10,
    title: "Using Context Clues",
    background: "bg-linear-to-b from-peach to-sky",
    scene: "quiz",
    isQuiz: true,
    quizSentence: "The frog can ___.",
    quizAnswer: "Hop",
    quizOptions: ["Hop", "Sit", "Fly"],
    dialog: [
      {
        character: "teacher",
        text: "Now read the sentence and choose the correct word.",
      },
      {
        character: "ana",
        text: "Hop!",
      },
      {
        character: "ben",
        text: "The word hop makes sense.",
      },
    ],
  },
  {
    pageNumber: 11,
    title: "Reading is Fun!",
    background: "bg-linear-to-b from-sky to-mint",
    scene: "happy",
    dialog: [
      {
        character: "narrator",
        text: "The students were happy because reading became easier.",
      },
      {
        character: "ana",
        text: "Word patterns help us read new words.",
      },
      {
        character: "ben",
        text: "Reading is fun!",
      },
      {
        character: "teacher",
        text: "Keep practicing every day.",
      },
    ],
  },
  {
    pageNumber: 12,
    title: "What We Have Learned",
    background: "bg-linear-to-b from-peach to-pink",
    scene: "classroom-board",
    dialog: [
      {
        character: "teacher",
        text: "Let's review what we have learned before the next lessons!",
      },
      {
        character: "ana",
        text: "✅ Word patterns help me read words correctly.",
      },
      {
        character: "ben",
        text: "✅ Words with the same ending sound belong to the same word family.",
      },
      {
        character: "ana",
        text: "✅ The -at word family includes: cat, bat, hat, mat.",
      },
      {
        character: "ben",
        text: "✅ The -an word family includes: fan, man, pan, ran, van, can.",
      },
      {
        character: "ana",
        text: "✅ Short vowel sounds help me read words like pig, pen, cup, and bed.",
      },
      {
        character: "ben",
        text: "✅ Blends are letters that work together like sh, br, and fr.",
      },
      {
        character: "ana",
        text: "✅ Context clues help me choose the correct word in a sentence.",
      },
      {
        character: "students",
        text: "✅ Practicing word patterns makes reading easier and more enjoyable.",
      },
      {
        character: "teacher",
        text: "Awesome! Next, let's practice comprehension and fluency.",
      },
    ],
    boardWords: [
      "Word Patterns",
      "Word Family",
      "-at",
      "-an",
      "Short Vowels",
      "Blends",
      "Context Clues",
    ],
    boardLabel: "What We Have Learned",
  },
  {
    pageNumber: 14,
    title: "Reading Fluency",
    background: "bg-linear-to-b from-sky to-mint",
    scene: "classroom",
    dialog: [
      {
        character: "narrator",
        text: "In the classroom, Teacher Mia holds a book while Ben, Ana, and Tom the Cat listen.",
      },
      {
        character: "teacher",
        text: "Today we will practice reading fluency!",
      },
      {
        character: "ben",
        text: "That sounds fun!",
      },
      {
        character: "tom",
        text: "Meow! I love words!",
      },
      {
        character: "teacher",
        text: "Which word is spelled correctly?",
      },
      {
        character: "ben",
        text: "I think the answer is cat!",
      },
      {
        character: "tom",
        text: "Meow! That's my name!",
      },
      {
        character: "teacher",
        text: "Which word rhymes with cake?",
      },
      {
        character: "ana",
        text: "Lake! Cake and lake sound the same!",
      },
      {
        character: "teacher",
        text: "Which word begins with the sound /b/?",
      },
      {
        character: "ben",
        text: "Ball!",
      },
      {
        character: "teacher",
        text: "Which word has the same ending sound as light?",
      },
      {
        character: "ana",
        text: "Night!",
      },
      {
        character: "teacher",
        text: "Very good! You are improving your reading fluency!",
      },
    ],
    boardWords: ["cat", "cake", "lake", "ball", "light", "night"],
    boardLabel: "Reading Fluency Practice",
  },
  {
    pageNumber: 13,
    title: "Reading Comprehension",
    background: "bg-linear-to-b from-lavender to-peach",
    scene: "classroom-board",
    dialog: [
      {
        character: "teacher",
        text: "Now let's learn about word meanings.",
      },
      {
        character: "teacher",
        text: "Which word means the same as big?",
      },
      {
        character: "ben",
        text: "Large!",
      },
      {
        character: "teacher",
        text: "What is the opposite of happy?",
      },
      {
        character: "ana",
        text: "Sad.",
      },
      {
        character: "teacher",
        text: "Which word tells about an animal?",
      },
      {
        character: "ben",
        text: "Dog!",
      },
      {
        character: "tom",
        text: "Meow! Cats too!",
      },
      {
        character: "teacher",
        text: "Which word means to move fast on foot?",
      },
      {
        character: "ana",
        text: "Run!",
      },
      {
        character: "teacher",
        text: "Excellent! You learned many new words today!",
      },
      {
        character: "ben",
        text: "Reading is fun!",
      },
      {
        character: "ana",
        text: "Let's practice every day!",
      },
      {
        character: "tom",
        text: "Meow! I love reading too!",
      },
    ],
    boardWords: ["big", "large", "happy", "sad", "dog", "run"],
    boardLabel: "Word Meanings",
  },
  {
    pageNumber: 15,
    title: "The End: Reading Champions",
    background: "bg-linear-to-b from-sun to-pink",
    scene: "celebration",
    isEnd: true,
    dialog: [
      {
        character: "narrator",
        text: "Ana and Ben became better readers because they learned word patterns.",
      },
      {
        character: "students",
        text: "Hooray for reading!",
      },
    ],
  },
];

export const comicPages: ComicPage[] = comicPagesData.sort(
  (a: ComicPage, b: ComicPage) => a.pageNumber - b.pageNumber,
);
