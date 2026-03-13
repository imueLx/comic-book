"use client";

interface WordVisualIconProps {
  iconKey: string;
  label: string;
  className?: string;
}

function Badge({ text }: { text: string }) {
  return (
    <text
      x="32"
      y="39"
      textAnchor="middle"
      fontSize="15"
      fontWeight="800"
      fill="#0f172a"
      fontFamily="Arial, sans-serif"
    >
      {text.slice(0, 2).toUpperCase()}
    </text>
  );
}

export default function WordVisualIcon({
  iconKey,
  label,
  className = "",
}: WordVisualIconProps) {
  const key = iconKey.toLowerCase();

  return (
    <svg
      viewBox="0 0 64 64"
      aria-label={label}
      role="img"
      className={className}
    >
      <rect x="4" y="4" width="56" height="56" rx="16" fill="#dbeafe" />
      <rect
        x="4"
        y="4"
        width="56"
        height="56"
        rx="16"
        fill="none"
        stroke="#1e293b"
        strokeWidth="3"
      />

      {(key === "cat" || key === "dog" || key === "frog" || key === "pig") && (
        <>
          <circle cx="22" cy="18" r="5" fill="#0f172a" />
          <circle cx="42" cy="18" r="5" fill="#0f172a" />
          <circle cx="32" cy="34" r="13" fill="#38bdf8" />
          <circle cx="27" cy="32" r="1.5" fill="#0f172a" />
          <circle cx="37" cy="32" r="1.5" fill="#0f172a" />
          <path
            d="M27 38 Q32 42 37 38"
            stroke="#0f172a"
            strokeWidth="2"
            fill="none"
          />
        </>
      )}

      {(key === "bat" || key === "bird") && (
        <>
          <ellipse cx="32" cy="34" rx="16" ry="10" fill="#22c55e" />
          <path
            d="M16 34 Q24 20 32 30 Q40 20 48 34"
            fill="#0f172a"
            opacity="0.85"
          />
          <circle cx="30" cy="32" r="1.3" fill="#0f172a" />
        </>
      )}

      {key === "fish" && (
        <>
          <ellipse cx="30" cy="34" rx="14" ry="9" fill="#38bdf8" />
          <polygon points="42,34 52,28 52,40" fill="#0ea5e9" />
          <circle cx="25" cy="32" r="1.4" fill="#0f172a" />
        </>
      )}

      {(key === "runner" ||
        key === "man" ||
        key === "boy" ||
        key === "girl") && (
        <>
          <circle cx="32" cy="18" r="6" fill="#f59e0b" />
          <path
            d="M32 24 L32 36 L22 46"
            stroke="#0f172a"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M32 28 L42 34"
            stroke="#0f172a"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M32 36 L42 46"
            stroke="#0f172a"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </>
      )}

      {(key === "van" || key === "boat") && (
        <>
          <rect x="15" y="24" width="34" height="16" rx="4" fill="#0ea5e9" />
          <rect x="21" y="27" width="12" height="8" rx="2" fill="#e0f2fe" />
          <circle cx="24" cy="43" r="4" fill="#0f172a" />
          <circle cx="41" cy="43" r="4" fill="#0f172a" />
        </>
      )}

      {key === "fan" && (
        <>
          <circle cx="32" cy="34" r="12" fill="#60a5fa" />
          <circle cx="32" cy="34" r="3" fill="#0f172a" />
          <path d="M32 34 L22 26" stroke="#0f172a" strokeWidth="2" />
          <path d="M32 34 L42 26" stroke="#0f172a" strokeWidth="2" />
          <path d="M32 34 L24 42" stroke="#0f172a" strokeWidth="2" />
          <path d="M32 34 L40 42" stroke="#0f172a" strokeWidth="2" />
          <rect x="29" y="46" width="6" height="8" rx="2" fill="#334155" />
        </>
      )}

      {key === "pan" && (
        <>
          <ellipse cx="28" cy="34" rx="13" ry="9" fill="#94a3b8" />
          <ellipse cx="28" cy="34" rx="9" ry="5" fill="#cbd5e1" />
          <rect x="39" y="32" width="13" height="4" rx="2" fill="#475569" />
        </>
      )}

      {key === "ship" && (
        <>
          <rect x="24" y="16" width="4" height="18" fill="#0f172a" />
          <polygon points="28,18 45,26 28,30" fill="#38bdf8" />
          <path d="M14 40 L50 40 L44 47 L20 47 Z" fill="#0f172a" />
        </>
      )}

      {(key === "can" || key === "cup" || key === "pen" || key === "brush") && (
        <>
          <rect x="22" y="18" width="20" height="28" rx="6" fill="#facc15" />
          <rect x="22" y="22" width="20" height="6" fill="#fde68a" />
          <rect x="22" y="38" width="20" height="6" fill="#fde68a" />
        </>
      )}

      {key === "hat" && (
        <>
          <path d="M18 34 Q32 18 46 34" fill="#2563eb" />
          <rect x="16" y="34" width="32" height="5" rx="2.5" fill="#1e293b" />
          <circle cx="32" cy="30" r="2" fill="#f8fafc" />
        </>
      )}

      {(key === "bed" || key === "mat" || key === "cot") && (
        <>
          <rect x="14" y="30" width="36" height="10" rx="3" fill="#22c55e" />
          <rect x="16" y="24" width="12" height="8" rx="2" fill="#f8fafc" />
          <rect x="14" y="40" width="3" height="8" fill="#0f172a" />
          <rect x="47" y="40" width="3" height="8" fill="#0f172a" />
        </>
      )}

      {key === "ball" && (
        <circle
          cx="32"
          cy="32"
          r="14"
          fill="#22c55e"
          stroke="#0f172a"
          strokeWidth="3"
        />
      )}

      {key === "cake" && (
        <>
          <rect x="18" y="30" width="28" height="12" rx="3" fill="#f472b6" />
          <rect x="18" y="24" width="28" height="8" rx="3" fill="#fbcfe8" />
          <rect x="30" y="18" width="4" height="6" fill="#0f172a" />
          <circle cx="32" cy="16" r="3" fill="#f97316" />
        </>
      )}

      {key === "lake" && (
        <>
          <ellipse cx="32" cy="38" rx="18" ry="9" fill="#0ea5e9" />
          <path
            d="M14 23 L24 15 L34 23"
            stroke="#0f172a"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M30 23 L40 15 L50 23"
            stroke="#0f172a"
            strokeWidth="3"
            fill="none"
          />
        </>
      )}

      {(key === "sun" || key === "sunrise") && (
        <>
          <circle cx="32" cy="28" r="10" fill="#f59e0b" />
          <line
            x1="32"
            y1="10"
            x2="32"
            y2="4"
            stroke="#f59e0b"
            strokeWidth="3"
          />
          <line
            x1="32"
            y1="52"
            x2="32"
            y2="46"
            stroke="#f59e0b"
            strokeWidth="3"
          />
          <line
            x1="14"
            y1="28"
            x2="8"
            y2="28"
            stroke="#f59e0b"
            strokeWidth="3"
          />
          <line
            x1="56"
            y1="28"
            x2="50"
            y2="28"
            stroke="#f59e0b"
            strokeWidth="3"
          />
        </>
      )}

      {key === "tree" && (
        <>
          <rect x="29" y="32" width="6" height="14" fill="#92400e" />
          <circle cx="32" cy="24" r="12" fill="#22c55e" />
        </>
      )}

      {key === "light" && (
        <>
          <ellipse cx="32" cy="28" rx="11" ry="13" fill="#facc15" />
          <rect x="27" y="40" width="10" height="8" rx="2" fill="#475569" />
        </>
      )}

      {key === "night" && (
        <>
          <circle cx="30" cy="28" r="11" fill="#e2e8f0" />
          <circle cx="35" cy="24" r="9" fill="#dbeafe" />
          <circle cx="42" cy="18" r="1.5" fill="#f8fafc" />
          <circle cx="46" cy="24" r="1.5" fill="#f8fafc" />
        </>
      )}

      {(key === "box" || key === "large" || key === "big") && (
        <>
          <rect x="18" y="22" width="28" height="24" rx="3" fill="#f59e0b" />
          <path d="M18 28 H46" stroke="#92400e" strokeWidth="2" />
          <path d="M32 22 V46" stroke="#92400e" strokeWidth="2" />
        </>
      )}

      {(key === "happy" || key === "sad") && (
        <>
          <circle cx="32" cy="32" r="14" fill="#facc15" />
          <circle cx="27" cy="29" r="1.5" fill="#0f172a" />
          <circle cx="37" cy="29" r="1.5" fill="#0f172a" />
          {key === "happy" ? (
            <path
              d="M26 36 Q32 41 38 36"
              stroke="#0f172a"
              strokeWidth="2"
              fill="none"
            />
          ) : (
            <path
              d="M26 40 Q32 35 38 40"
              stroke="#0f172a"
              strokeWidth="2"
              fill="none"
            />
          )}
        </>
      )}

      {key === "flag" && (
        <>
          <rect x="22" y="14" width="4" height="32" fill="#0f172a" />
          <path d="M26 16 H46 L40 24 L46 32 H26 Z" fill="#ef4444" />
        </>
      )}

      {key === "hit" && (
        <>
          <circle cx="30" cy="30" r="11" fill="#facc15" />
          <rect
            x="36"
            y="36"
            width="13"
            height="4"
            rx="2"
            transform="rotate(-30 36 36)"
            fill="#92400e"
          />
          <path d="M20 20 L24 16" stroke="#f59e0b" strokeWidth="2" />
          <path d="M22 24 L16 24" stroke="#f59e0b" strokeWidth="2" />
        </>
      )}

      {key === "cape" && (
        <>
          <circle cx="30" cy="20" r="5" fill="#f59e0b" />
          <rect x="27" y="24" width="6" height="14" rx="3" fill="#0f172a" />
          <path d="M33 26 L47 30 L33 42 Z" fill="#ef4444" />
        </>
      )}

      {key === "cope" && (
        <>
          <rect x="20" y="20" width="24" height="20" rx="3" fill="#22c55e" />
          <rect x="26" y="40" width="12" height="4" rx="2" fill="#16a34a" />
          <circle cx="30" cy="30" r="3" fill="#f8fafc" />
          <path d="M34 27 L38 23" stroke="#f8fafc" strokeWidth="2" />
        </>
      )}

      {key === "sing" && (
        <>
          <rect x="22" y="18" width="6" height="20" rx="3" fill="#0f172a" />
          <circle cx="25" cy="41" r="7" fill="#38bdf8" />
          <rect x="36" y="22" width="4" height="14" rx="2" fill="#0f172a" />
          <circle cx="38" cy="39" r="5" fill="#0ea5e9" />
        </>
      )}

      {(key === "book" || key === "grade") && (
        <>
          <rect x="14" y="20" width="16" height="24" rx="2" fill="#3b82f6" />
          <rect x="34" y="20" width="16" height="24" rx="2" fill="#38bdf8" />
          <line
            x1="32"
            y1="20"
            x2="32"
            y2="44"
            stroke="#0f172a"
            strokeWidth="2"
          />
        </>
      )}

      {key === "hot" && (
        <>
          <path
            d="M32 15 C25 24 28 30 32 33 C36 30 39 24 32 15"
            fill="#ef4444"
          />
          <path
            d="M32 28 C27 36 28 43 32 47 C36 43 37 36 32 28"
            fill="#f59e0b"
          />
        </>
      )}

      {key === "fog" && (
        <>
          <rect x="16" y="22" width="32" height="6" rx="3" fill="#94a3b8" />
          <rect x="12" y="31" width="40" height="6" rx="3" fill="#cbd5e1" />
          <rect x="18" y="40" width="28" height="6" rx="3" fill="#94a3b8" />
        </>
      )}

      {(key === "number1" || key === "one") && <Badge text="1" />}

      {(key === "kap" || key === "kat" || key === "cta" || key === "word") && (
        <Badge text={label} />
      )}

      {!(
        [
          "cat",
          "dog",
          "frog",
          "pig",
          "bat",
          "hat",
          "fish",
          "bird",
          "runner",
          "man",
          "boy",
          "girl",
          "fan",
          "pan",
          "van",
          "boat",
          "ship",
          "can",
          "cup",
          "pen",
          "brush",
          "bed",
          "mat",
          "cot",
          "ball",
          "cake",
          "lake",
          "sun",
          "sunrise",
          "tree",
          "light",
          "night",
          "box",
          "large",
          "big",
          "happy",
          "sad",
          "flag",
          "hit",
          "cape",
          "cope",
          "sing",
          "book",
          "grade",
          "hot",
          "fog",
          "number1",
          "one",
          "kap",
          "kat",
          "cta",
          "word",
        ] as string[]
      ).includes(key) && <Badge text={label} />}
    </svg>
  );
}
