"use client";

interface VisualChoiceCardProps {
  emoji: string;
  label: string;
  selected?: boolean;
  onClick: () => void;
}

export default function VisualChoiceCard({
  emoji,
  label,
  selected,
  onClick,
}: VisualChoiceCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex min-h-24 w-full flex-col items-center justify-center rounded-2xl border-3 p-2 text-center shadow-[3px_3px_0_#111827] transition-transform active:translate-y-px ${
        selected
          ? "border-emerald-700 bg-emerald-100"
          : "border-gray-900 bg-white hover:bg-sky-50"
      }`}
    >
      <span className="text-3xl" aria-hidden>
        {emoji}
      </span>
      <span className="mt-1 text-sm font-black text-gray-800">{label}</span>
    </button>
  );
}
