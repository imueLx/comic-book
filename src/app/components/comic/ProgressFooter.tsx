"use client";

interface ProgressFooterProps {
  currentPanel: number;
  totalPanels: number;
  onNextPanel: () => void;
  canAdvance: boolean;
}

export default function ProgressFooter({
  currentPanel,
  totalPanels,
  onNextPanel,
  canAdvance,
}: ProgressFooterProps) {
  return (
    <div className="sticky bottom-0 z-10 mt-3 rounded-2xl border-3 border-gray-900 bg-white/95 p-2 shadow-[4px_4px_0_#111827] backdrop-blur">
      <div className="mb-2 flex items-center gap-1.5">
        {Array.from({ length: totalPanels }).map((_, i) => (
          <div
            key={i}
            className={`h-2.5 rounded-full transition-all ${
              i < currentPanel ? "w-8 bg-emerald-500" : "w-3 bg-gray-300"
            }`}
          />
        ))}
      </div>
      <button
        onClick={onNextPanel}
        disabled={!canAdvance}
        className="w-full min-h-12 rounded-2xl border-3 border-gray-900 bg-emerald-300 text-base font-black text-emerald-950 shadow-[3px_3px_0_#111827] disabled:opacity-40"
      >
        Next Panel
      </button>
    </div>
  );
}
