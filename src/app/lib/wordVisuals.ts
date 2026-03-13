const ICON_KEYS: Record<string, string> = {
  cat: "cat",
  bat: "bat",
  hat: "hat",
  mat: "mat",
  dog: "dog",
  fish: "fish",
  frog: "frog",
  pig: "pig",
  bird: "bird",
  man: "man",
  boy: "boy",
  girl: "girl",

  fan: "fan",
  pan: "pan",
  van: "van",
  can: "can",
  ran: "runner",
  run: "runner",
  sat: "mat",
  hop: "frog",
  fly: "bird",
  sit: "mat",

  pen: "pen",
  cup: "cup",
  bed: "bed",
  ship: "ship",
  brush: "brush",
  ball: "ball",
  cake: "cake",
  lake: "lake",
  light: "light",
  night: "night",
  large: "large",
  big: "big",
  happy: "happy",
  sad: "sad",

  sun: "sun",
  hot: "hot",
  hit: "hit",
  tree: "tree",
  boat: "boat",
  cape: "cape",
  cope: "cope",
  flag: "flag",
  fog: "fog",
  sing: "sing",

  one: "one",
  morning: "sunrise",
  grade: "grade",
  sh: "ship",
  br: "brush",
  fr: "frog",
  kat: "kat",
  cot: "cot",
  cta: "cta",
};

export function normalizeWordKey(raw: string): string {
  return (
    raw
      .trim()
      .split("→")
      .pop()
      ?.replace(/[^a-zA-Z]/g, "")
      .toLowerCase() || ""
  );
}

export function getWordIconKey(word: string): string {
  const key = normalizeWordKey(word);
  return ICON_KEYS[key] || "word";
}

export function getDisplayWord(raw: string): string {
  const trimmed = raw.trim();
  return trimmed.includes("→")
    ? trimmed.split("→").pop()?.trim() || trimmed
    : trimmed;
}
