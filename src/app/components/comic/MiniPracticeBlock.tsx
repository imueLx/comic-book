"use client";

import { useMemo, useState } from "react";
import { MiniActivity } from "../../data/comicLessonPages";
import VisualChoiceCard from "./VisualChoiceCard";

interface MiniPracticeBlockProps {
  activity: MiniActivity;
  onCorrect?: () => void;
}

export default function MiniPracticeBlock({
  activity,
  onCorrect,
}: MiniPracticeBlockProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = useMemo(
    () => activity.options.find((opt) => opt.id === selectedId),
    [activity.options, selectedId],
  );

  const isCorrect = !!selected?.isCorrect;

  return (
    <div className="rounded-3xl border-3 border-gray-900 bg-white p-3 shadow-[4px_4px_0_#111827]">
      <p className="text-sm font-black uppercase tracking-wide text-violet-700">
        Mini Practice
      </p>
      <h4 className="mt-1 text-lg font-black text-gray-900">
        {activity.question}
      </h4>
      <p className="text-sm font-semibold text-gray-700">{activity.prompt}</p>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {activity.options.map((option) => (
          <VisualChoiceCard
            key={option.id}
            emoji={option.emoji}
            label={option.label}
            selected={option.id === selectedId}
            onClick={() => {
              setSelectedId(option.id);
              if (option.isCorrect) onCorrect?.();
            }}
          />
        ))}
      </div>

      {selected && (
        <p
          className={`mt-3 rounded-xl px-3 py-2 text-sm font-bold ${
            isCorrect
              ? "bg-emerald-100 text-emerald-800"
              : "bg-amber-100 text-amber-900"
          }`}
        >
          {isCorrect ? activity.successText : activity.retryText}
        </p>
      )}
    </div>
  );
}
