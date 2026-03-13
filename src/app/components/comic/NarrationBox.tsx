"use client";

interface NarrationBoxProps {
  text: string;
}

export default function NarrationBox({ text }: NarrationBoxProps) {
  return (
    <div className="rounded-2xl border-2 border-amber-700 bg-amber-100 px-3 py-2 shadow-[2px_2px_0_#b45309]">
      <p className="text-sm font-extrabold uppercase tracking-wide text-amber-800">
        Narrator
      </p>
      <p className="text-base font-semibold leading-snug text-amber-950">
        {text}
      </p>
    </div>
  );
}
