"use client";

interface TapToHearImageProps {
  emoji: string;
  label: string;
  hint?: string;
  onTap: () => void;
}

export default function TapToHearImage({
  emoji,
  label,
  hint,
  onTap,
}: TapToHearImageProps) {
  return (
    <button
      onClick={onTap}
      className="flex min-h-28 w-full flex-col items-center justify-center rounded-2xl border-3 border-sky-800 bg-sky-100 p-3 shadow-[3px_3px_0_#1e3a8a] active:translate-y-px"
      aria-label={`Hear ${label}`}
    >
      <span className="text-4xl" aria-hidden>
        {emoji}
      </span>
      <span className="mt-1 text-base font-black text-sky-900">{label}</span>
      {hint && <span className="text-xs font-bold text-sky-700">{hint}</span>}
      <span className="mt-1 text-[11px] font-bold text-sky-800">
        Tap to hear
      </span>
    </button>
  );
}
