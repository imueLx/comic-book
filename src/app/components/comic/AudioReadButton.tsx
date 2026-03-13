"use client";

interface AudioReadButtonProps {
  onClick: () => void;
  isReading: boolean;
  label?: string;
}

export default function AudioReadButton({
  onClick,
  isReading,
  label = "Read Aloud",
}: AudioReadButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex min-h-12 items-center gap-2 rounded-full border-3 border-gray-900 px-4 py-2 text-sm font-extrabold text-gray-900 shadow-[3px_3px_0_#111827] active:translate-y-px active:shadow-[2px_2px_0_#111827] ${
        isReading ? "bg-red-200" : "bg-yellow-300"
      }`}
      aria-label={label}
    >
      <span className="text-base" aria-hidden>
        {isReading ? "⏹️" : "🔊"}
      </span>
      {isReading ? "Stop" : label}
    </button>
  );
}
