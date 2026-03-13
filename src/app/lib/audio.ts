// ============================================
// Audio / Text-to-Speech utilities
// ============================================

let speechSynthRef: SpeechSynthesis | null = null;
let speedMultiplier = 1.0;
let speechAvailable: boolean | null = null;

function reportSpeechIssue(code: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("app:speech-issue", {
      detail: { code },
    }),
  );
}

function getSpeech(): SpeechSynthesis | null {
  if (typeof window === "undefined") return null;
  if (!speechSynthRef) {
    speechSynthRef = window.speechSynthesis;
  }
  return speechSynthRef;
}

/** Check whether the Web Speech API is usable on this device. */
export function isSpeechSupported(): boolean {
  if (speechAvailable !== null) return speechAvailable;
  if (typeof window === "undefined") return false;
  speechAvailable =
    "speechSynthesis" in window &&
    typeof SpeechSynthesisUtterance !== "undefined";
  return speechAvailable;
}

function getPreferredVoice(
  voices: SpeechSynthesisVoice[],
): SpeechSynthesisVoice | null {
  if (!voices.length) return null;

  const preferredNames = [
    "aria",
    "jenny",
    "libby",
    "samantha",
    "sonia",
    "zira",
    "female",
    "natural",
    "neural",
    "premium",
    "google us english",
    "google uk english female",
  ];
  const avoidNames = ["david", "mark", "male", "robot", "compact", "espeak"];

  const scored = voices
    .filter((v) => v.lang.toLowerCase().startsWith("en"))
    .map((voice) => {
      const name = voice.name.toLowerCase();
      let score = 0;

      for (const key of preferredNames) {
        if (name.includes(key)) score += 3;
      }
      for (const key of avoidNames) {
        if (name.includes(key)) score -= 2;
      }
      if (voice.default) score += 1;
      if (voice.localService) score += 1;

      // Strongly favor voices commonly labeled as higher-quality.
      if (name.includes("online")) score += 4;
      if (name.includes("natural") || name.includes("neural")) score += 4;
      if (name.includes("enhanced")) score += 2;

      return { voice, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored[0]?.voice ?? voices[0] ?? null;
}

function pickVoice(synth: SpeechSynthesis): SpeechSynthesisVoice | null {
  const voices = synth.getVoices();
  return getPreferredVoice(voices);
}

function waitForVoices(synth: SpeechSynthesis, timeoutMs = 800): Promise<void> {
  return new Promise((resolve) => {
    if (synth.getVoices().length > 0) {
      resolve();
      return;
    }

    const done = () => {
      synth.removeEventListener("voiceschanged", onVoicesChanged);
      clearTimeout(timer);
      resolve();
    };

    const onVoicesChanged = () => done();
    const timer = setTimeout(done, timeoutMs);
    synth.addEventListener("voiceschanged", onVoicesChanged);
  });
}

function normalizeSpeechText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\s([,.!?])/g, "$1")
    .replace(/&/g, " and ")
    .trim();
}

export function setPlaybackSpeed(speed: "slow" | "normal") {
  speedMultiplier = speed === "slow" ? 0.72 : 1.0;
}

export function warmupSpeechVoices() {
  const synth = getSpeech();
  if (!synth) return;
  void waitForVoices(synth, 1000);
}

export function speak(text: string, rate = 0.88, pitch = 1.18): Promise<void> {
  return new Promise((resolve) => {
    if (!isSpeechSupported()) {
      reportSpeechIssue("speech-not-supported");
      resolve();
      return;
    }
    const synth = getSpeech();
    if (!synth) {
      reportSpeechIssue("speech-not-available");
      resolve();
      return;
    }

    void (async () => {
      await waitForVoices(synth);
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(normalizeSpeechText(text));
      utterance.rate = Math.max(0.5, Math.min(1.05, rate * speedMultiplier));
      utterance.pitch = Math.max(0.95, Math.min(1.28, pitch));
      utterance.lang = "en-US";
      utterance.volume = 1;

      // Prefer a friendlier voice profile when available on device.
      const preferred = pickVoice(synth);
      if (preferred) {
        utterance.voice = preferred;
        utterance.lang = preferred.lang || "en-US";
      }

      const selectedName = utterance.voice?.name.toLowerCase() ?? "";
      const isNaturalLike =
        selectedName.includes("natural") ||
        selectedName.includes("neural") ||
        selectedName.includes("online");

      // Non-neural voices sound less robotic with flatter prosody.
      if (!isNaturalLike) {
        utterance.rate = Math.max(0.76, Math.min(0.9, utterance.rate));
        utterance.pitch = Math.max(0.98, Math.min(1.08, utterance.pitch));
      }

      utterance.onend = () => resolve();
      utterance.onerror = (e) => {
        // Most TTS errors should be non-fatal for app flow.
        if (
          e.error === "interrupted" ||
          e.error === "canceled" ||
          e.error === "not-allowed" ||
          e.error === "audio-busy" ||
          e.error === "audio-hardware"
        ) {
          reportSpeechIssue(e.error || "speech-error");
          resolve();
        } else {
          reportSpeechIssue(e.error || "speech-error");
          resolve();
        }
      };
      synth.speak(utterance);
    })();
  });
}

export function speakWord(word: string): Promise<void> {
  // A tiny pause at the end helps short words sound less clipped/robotic.
  const cleanWord = word.trim();
  return speak(`${cleanWord}.`, 0.78, 1.02);
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
  return speak(phrase, 0.93, 1.08);
}

// Narrate comic dialog
export function narrateDialog(character: string, text: string): Promise<void> {
  const rates: Record<string, number> = {
    teacher: 0.86,
    ana: 0.92,
    ben: 0.9,
    tom: 0.95,
    narrator: 0.82,
    students: 0.9,
  };
  const pitches: Record<string, number> = {
    teacher: 1.05,
    ana: 1.1,
    ben: 1.05,
    tom: 1.2,
    narrator: 0.98,
    students: 1.08,
  };
  return speak(text, rates[character] ?? 0.88, pitches[character] ?? 1.18);
}

// Narrate all dialog lines sequentially with pauses
export async function narrateAllDialog(
  dialogs: Array<{ character: string; text: string }>,
  onLineStart?: (index: number) => void,
): Promise<void> {
  for (let i = 0; i < dialogs.length; i++) {
    onLineStart?.(i);
    await narrateDialog(dialogs[i].character, dialogs[i].text);
    if (i < dialogs.length - 1) {
      await new Promise((r) => setTimeout(r, 400));
    }
  }
  onLineStart?.(-1);
}

// Speak a sentence with word-level highlighting callback
export async function speakSentence(
  sentence: string,
  rate = 0.82,
): Promise<void> {
  return speak(sentence, rate, 1.02);
}
