// ============================================
// Audio / Text-to-Speech utilities
// ============================================

let speechSynthRef: SpeechSynthesis | null = null;

function getSpeech(): SpeechSynthesis | null {
  if (typeof window === "undefined") return null;
  if (!speechSynthRef) {
    speechSynthRef = window.speechSynthesis;
  }
  return speechSynthRef;
}

export function speak(text: string, rate = 0.85, pitch = 1.1): Promise<void> {
  return new Promise((resolve) => {
    const synth = getSpeech();
    if (!synth) {
      resolve();
      return;
    }

    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.lang = "en-US";

    // Prefer a friendly-sounding voice
    const voices = synth.getVoices();
    const preferred = voices.find(
      (v) =>
        v.name.includes("Samantha") ||
        v.name.includes("Google US English") ||
        v.name.includes("Microsoft Zira"),
    );
    if (preferred) utterance.voice = preferred;

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    synth.speak(utterance);
  });
}

export function speakWord(word: string): Promise<void> {
  return speak(word, 0.75, 1.15);
}

export function stopSpeaking() {
  getSpeech()?.cancel();
}

export function isSpeaking(): boolean {
  return getSpeech()?.speaking ?? false;
}

// Play a short praise audio
export function speakPraise() {
  const phrases = [
    "Great job!",
    "Awesome!",
    "You got it!",
    "Well done!",
    "Fantastic!",
    "Super!",
    "Amazing!",
    "Keep it up!",
  ];
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];
  return speak(phrase, 1, 1.2);
}

// Narrate comic dialog
export function narrateDialog(character: string, text: string): Promise<void> {
  const rates: Record<string, number> = {
    teacher: 0.85,
    ana: 0.9,
    ben: 0.9,
    narrator: 0.8,
    students: 0.85,
  };
  const pitches: Record<string, number> = {
    teacher: 1.0,
    ana: 1.3,
    ben: 1.1,
    narrator: 0.95,
    students: 1.15,
  };
  return speak(text, rates[character] ?? 0.85, pitches[character] ?? 1.1);
}
