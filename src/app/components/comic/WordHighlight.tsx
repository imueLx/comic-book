"use client";

interface WordHighlightProps {
  word: string;
  onClick?: (word: string) => void;
}

export default function WordHighlight({ word, onClick }: WordHighlightProps) {
  return (
    <button
      onClick={() => onClick?.(word)}
      className="rounded-xl border-2 border-amber-600 bg-amber-200 px-2.5 py-1 text-sm font-black text-amber-900 shadow-[2px_2px_0_#b45309] active:translate-y-px"
    >
      {word}
    </button>
  );
}
