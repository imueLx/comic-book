"use client";

import { motion } from "framer-motion";

interface ComicIllustrationProps {
  pageNumber: number;
  className?: string;
}

/* ── Page 2: Classroom with Teacher Mia at front, Ana & Ben at desks ── */
function Page2Scene() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Classroom wall */}
      <rect width="400" height="220" rx="8" fill="#EFF6FF" />
      <rect y="160" width="400" height="60" fill="#FEF3C7" />
      <line
        x1="0"
        y1="160"
        x2="400"
        y2="160"
        stroke="#D97706"
        strokeWidth="2"
      />

      {/* Window with sun */}
      <rect
        x="15"
        y="15"
        width="55"
        height="65"
        rx="4"
        fill="#BFDBFE"
        stroke="#1E3A5F"
        strokeWidth="2.5"
      />
      <line
        x1="42"
        y1="15"
        x2="42"
        y2="80"
        stroke="#1E3A5F"
        strokeWidth="1.5"
      />
      <line
        x1="15"
        y1="47"
        x2="70"
        y2="47"
        stroke="#1E3A5F"
        strokeWidth="1.5"
      />
      <circle cx="32" cy="32" r="10" fill="#FCD34D" />
      <circle cx="32" cy="32" r="6" fill="#FEF08A" />

      {/* Blackboard */}
      <rect
        x="110"
        y="12"
        width="180"
        height="85"
        rx="6"
        fill="#1E3A5F"
        stroke="#111827"
        strokeWidth="3"
      />
      <rect x="120" y="20" width="160" height="70" rx="3" fill="#234E6F" />
      <text
        x="200"
        y="48"
        textAnchor="middle"
        fill="#86EFAC"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="18"
        fontWeight="bold"
      >
        Word Patterns
      </text>
      <text
        x="200"
        y="72"
        textAnchor="middle"
        fill="#FDE68A"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="14"
      >
        Today&apos;s Lesson!
      </text>
      <rect x="105" y="95" width="190" height="6" rx="2" fill="#92400E" />

      {/* Clock */}
      <circle
        cx="350"
        cy="35"
        r="18"
        fill="#FFF"
        stroke="#111827"
        strokeWidth="2"
      />
      <line
        x1="350"
        y1="35"
        x2="350"
        y2="22"
        stroke="#111827"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="350"
        y1="35"
        x2="360"
        y2="38"
        stroke="#EF4444"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Teacher Mia - standing at front */}
      <g transform="translate(185, 100)">
        {/* Body */}
        <rect x="8" y="28" width="24" height="40" rx="4" fill="#3B82F6" />
        {/* Head */}
        <circle cx="20" cy="18" r="15" fill="#FBBF24" />
        <circle cx="20" cy="18" r="15" fill="#FDE68A" />
        {/* Hair */}
        <ellipse cx="20" cy="10" rx="16" ry="8" fill="#78350F" />
        <rect x="4" y="8" width="6" height="18" rx="3" fill="#78350F" />
        <rect x="30" y="8" width="6" height="18" rx="3" fill="#78350F" />
        {/* Eyes */}
        <circle cx="14" cy="17" r="2" fill="#111827" />
        <circle cx="26" cy="17" r="2" fill="#111827" />
        {/* Smile */}
        <path
          d="M14 23 Q20 28 26 23"
          stroke="#111827"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Pointer stick */}
        <line
          x1="32"
          y1="38"
          x2="65"
          y2="15"
          stroke="#92400E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Legs */}
        <rect x="12" y="68" width="7" height="18" rx="3" fill="#1E3A8A" />
        <rect x="21" y="68" width="7" height="18" rx="3" fill="#1E3A8A" />
        {/* Shoes */}
        <rect x="10" y="84" width="11" height="5" rx="2" fill="#111827" />
        <rect x="19" y="84" width="11" height="5" rx="2" fill="#111827" />
      </g>

      {/* Ana - at desk left */}
      <g transform="translate(50, 115)">
        {/* Desk */}
        <rect
          x="0"
          y="45"
          width="70"
          height="8"
          rx="2"
          fill="#D97706"
          stroke="#92400E"
          strokeWidth="1.5"
        />
        <rect x="5" y="53" width="5" height="22" fill="#92400E" />
        <rect x="60" y="53" width="5" height="22" fill="#92400E" />
        {/* Book on desk */}
        <rect
          x="20"
          y="36"
          width="25"
          height="15"
          rx="2"
          fill="#F9A8D4"
          stroke="#EC4899"
          strokeWidth="1"
        />
        <line
          x1="32"
          y1="36"
          x2="32"
          y2="51"
          stroke="#EC4899"
          strokeWidth="1"
        />
        {/* Body */}
        <rect x="23" y="12" width="20" height="32" rx="4" fill="#EC4899" />
        {/* Head */}
        <circle cx="33" cy="4" r="12" fill="#FDE68A" />
        {/* Hair (pigtails) */}
        <circle cx="22" cy="-2" r="6" fill="#111827" />
        <circle cx="44" cy="-2" r="6" fill="#111827" />
        <ellipse cx="33" cy="-4" rx="12" ry="6" fill="#111827" />
        {/* Eyes */}
        <circle cx="29" cy="3" r="1.5" fill="#111827" />
        <circle cx="37" cy="3" r="1.5" fill="#111827" />
        {/* Smile */}
        <path
          d="M29 8 Q33 11 37 8"
          stroke="#111827"
          strokeWidth="1"
          fill="none"
        />
        {/* Raised hand */}
        <line
          x1="43"
          y1="15"
          x2="55"
          y2="-5"
          stroke="#FDE68A"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="55" cy="-7" r="4" fill="#FDE68A" />
      </g>

      {/* Ben - at desk right */}
      <g transform="translate(290, 115)">
        {/* Desk */}
        <rect
          x="0"
          y="45"
          width="70"
          height="8"
          rx="2"
          fill="#D97706"
          stroke="#92400E"
          strokeWidth="1.5"
        />
        <rect x="5" y="53" width="5" height="22" fill="#92400E" />
        <rect x="60" y="53" width="5" height="22" fill="#92400E" />
        {/* Notebook */}
        <rect
          x="15"
          y="36"
          width="25"
          height="15"
          rx="2"
          fill="#BFDBFE"
          stroke="#3B82F6"
          strokeWidth="1"
        />
        {/* Body */}
        <rect x="23" y="12" width="20" height="32" rx="4" fill="#10B981" />
        {/* Head */}
        <circle cx="33" cy="4" r="12" fill="#FDE68A" />
        {/* Hair */}
        <ellipse cx="33" cy="-2" rx="13" ry="7" fill="#92400E" />
        {/* Eyes */}
        <circle cx="29" cy="3" r="1.5" fill="#111827" />
        <circle cx="37" cy="3" r="1.5" fill="#111827" />
        {/* Smile */}
        <path
          d="M29 8 Q33 11 37 8"
          stroke="#111827"
          strokeWidth="1"
          fill="none"
        />
      </g>

      {/* Speech question marks */}
      <text x="75" y="108" fontSize="16" fill="#EC4899" fontWeight="bold">
        ?
      </text>
      <text x="340" y="108" fontSize="16" fill="#10B981" fontWeight="bold">
        ?
      </text>
      <text x="360" y="55" fontSize="12">
        ✨
      </text>
    </svg>
  );
}

/* ── Page 3: Teacher writing cat/bat/hat/mat on board ── */
function Page3Scene() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="220" rx="8" fill="#EFF6FF" />
      <rect y="170" width="400" height="50" fill="#FEF3C7" />

      {/* Big Blackboard - center focus */}
      <rect
        x="40"
        y="10"
        width="320"
        height="130"
        rx="8"
        fill="#1E3A5F"
        stroke="#111827"
        strokeWidth="3"
      />
      <rect x="50" y="18" width="300" height="115" rx="4" fill="#234E6F" />

      {/* Words on board in a grid */}
      <text
        x="120"
        y="55"
        textAnchor="middle"
        fill="#86EFAC"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="26"
        fontWeight="bold"
      >
        Cat
      </text>
      <text
        x="280"
        y="55"
        textAnchor="middle"
        fill="#FDE68A"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="26"
        fontWeight="bold"
      >
        Bat
      </text>
      <text
        x="120"
        y="100"
        textAnchor="middle"
        fill="#93C5FD"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="26"
        fontWeight="bold"
      >
        Hat
      </text>
      <text
        x="280"
        y="100"
        textAnchor="middle"
        fill="#F9A8D4"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="26"
        fontWeight="bold"
      >
        Mat
      </text>

      {/* Highlight -at pattern */}
      <rect
        x="133"
        y="38"
        width="35"
        height="22"
        rx="4"
        fill="#86EFAC"
        opacity="0.3"
      />
      <rect
        x="293"
        y="38"
        width="35"
        height="22"
        rx="4"
        fill="#FDE68A"
        opacity="0.3"
      />
      <rect
        x="133"
        y="83"
        width="35"
        height="22"
        rx="4"
        fill="#93C5FD"
        opacity="0.3"
      />
      <rect
        x="293"
        y="83"
        width="35"
        height="22"
        rx="4"
        fill="#F9A8D4"
        opacity="0.3"
      />

      {/* Arrow pointing to -at */}
      <text
        x="200"
        y="125"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="14"
        fontWeight="bold"
      >
        All end with –at!
      </text>

      {/* Board ledge */}
      <rect x="35" y="138" width="330" height="7" rx="2" fill="#92400E" />
      {/* Chalk */}
      <rect x="70" y="139" width="14" height="5" rx="1" fill="#FFF" />
      <rect x="95" y="139" width="12" height="5" rx="1" fill="#FDE68A" />

      {/* Teacher with chalk */}
      <g transform="translate(10, 100)">
        <rect x="8" y="28" width="22" height="36" rx="4" fill="#3B82F6" />
        <circle cx="19" cy="18" r="13" fill="#FDE68A" />
        <ellipse cx="19" cy="10" rx="14" ry="7" fill="#78350F" />
        <rect x="4" y="8" width="5" height="16" rx="3" fill="#78350F" />
        <circle cx="14" cy="17" r="1.5" fill="#111827" />
        <circle cx="24" cy="17" r="1.5" fill="#111827" />
        <path
          d="M14 22 Q19 26 24 22"
          stroke="#111827"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Arm with chalk */}
        <line
          x1="30"
          y1="35"
          x2="50"
          y2="20"
          stroke="#FDE68A"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <rect x="48" y="16" width="8" height="4" rx="1" fill="#FFF" />
        <rect x="12" y="64" width="6" height="16" rx="3" fill="#1E3A8A" />
        <rect x="20" y="64" width="6" height="16" rx="3" fill="#1E3A8A" />
      </g>

      {/* Ana excited */}
      <g transform="translate(310, 150)">
        <rect x="8" y="20" width="18" height="28" rx="4" fill="#EC4899" />
        <circle cx="17" cy="12" r="10" fill="#FDE68A" />
        <circle cx="15" cy="0" r="5" fill="#111827" />
        <circle cx="25" cy="0" r="5" fill="#111827" />
        <ellipse cx="17" cy="4" rx="11" ry="5" fill="#111827" />
        <circle cx="13" cy="11" r="1.5" fill="#111827" />
        <circle cx="21" cy="11" r="1.5" fill="#111827" />
        <path
          d="M13 16 Q17 20 21 16"
          stroke="#111827"
          strokeWidth="1"
          fill="none"
        />
        {/* Excited hand */}
        <line
          x1="26"
          y1="22"
          x2="38"
          y2="8"
          stroke="#FDE68A"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      <text x="355" y="155" fontSize="14">
        💡
      </text>
      <text x="380" y="25" fontSize="14">
        ⭐
      </text>
    </svg>
  );
}

/* ── Page 4: Tom the cat sitting on a mat, students reading ── */
function Page4Scene() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="220" rx="8" fill="#FFF7ED" />
      <rect y="170" width="400" height="50" fill="#FEF3C7" />

      {/* Word family banner */}
      <rect x="90" y="8" width="220" height="35" rx="8" fill="#8B5CF6" />
      <text
        x="200"
        y="32"
        textAnchor="middle"
        fill="#FFF"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="20"
        fontWeight="bold"
      >
        The –at Word Family!
      </text>

      {/* Word bubbles */}
      {[
        { word: "Cat", x: 50, color: "#86EFAC", border: "#10B981" },
        { word: "Bat", x: 150, color: "#FDE68A", border: "#F59E0B" },
        { word: "Hat", x: 250, color: "#93C5FD", border: "#3B82F6" },
        { word: "Mat", x: 350, color: "#F9A8D4", border: "#EC4899" },
      ].map((w) => (
        <g key={w.word} transform={`translate(${w.x - 30}, 48)`}>
          <rect
            width="60"
            height="34"
            rx="10"
            fill={w.color}
            stroke={w.border}
            strokeWidth="2"
          />
          <text
            x="30"
            y="24"
            textAnchor="middle"
            fill="#111827"
            fontFamily="var(--font-comic), sans-serif"
            fontSize="18"
            fontWeight="bold"
          >
            {w.word}
          </text>
        </g>
      ))}

      {/* Tom the Cat - big, sitting on mat */}
      <g transform="translate(150, 90)">
        {/* Mat */}
        <ellipse
          cx="50"
          cy="85"
          rx="65"
          ry="14"
          fill="#F9A8D4"
          stroke="#EC4899"
          strokeWidth="2"
        />
        <text
          x="50"
          y="90"
          textAnchor="middle"
          fill="#BE185D"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="10"
          fontWeight="bold"
        >
          MAT
        </text>

        {/* Cat body */}
        <ellipse cx="50" cy="55" rx="28" ry="30" fill="#F59E0B" />
        {/* Cat head */}
        <circle cx="50" cy="22" r="22" fill="#FCD34D" />
        {/* Ears */}
        <polygon
          points="32,8 28,-8 42,4"
          fill="#FCD34D"
          stroke="#F59E0B"
          strokeWidth="1.5"
        />
        <polygon
          points="68,8 72,-8 58,4"
          fill="#FCD34D"
          stroke="#F59E0B"
          strokeWidth="1.5"
        />
        <polygon points="34,6 31,-3 40,4" fill="#FECACA" />
        <polygon points="66,6 69,-3 60,4" fill="#FECACA" />
        {/* Eyes */}
        <ellipse cx="40" cy="20" rx="4" ry="5" fill="#111827" />
        <ellipse cx="60" cy="20" rx="4" ry="5" fill="#111827" />
        <circle cx="42" cy="18" r="1.5" fill="#FFF" />
        <circle cx="62" cy="18" r="1.5" fill="#FFF" />
        {/* Nose */}
        <polygon points="50,27 47,31 53,31" fill="#F472B6" />
        {/* Whiskers */}
        <line
          x1="26"
          y1="28"
          x2="42"
          y2="30"
          stroke="#111827"
          strokeWidth="1"
        />
        <line
          x1="26"
          y1="33"
          x2="42"
          y2="32"
          stroke="#111827"
          strokeWidth="1"
        />
        <line
          x1="74"
          y1="28"
          x2="58"
          y2="30"
          stroke="#111827"
          strokeWidth="1"
        />
        <line
          x1="74"
          y1="33"
          x2="58"
          y2="32"
          stroke="#111827"
          strokeWidth="1"
        />
        {/* Smile */}
        <path
          d="M44 33 Q50 38 56 33"
          stroke="#111827"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Tail */}
        <path
          d="M78 55 Q100 40 95 20 Q92 10 85 15"
          stroke="#F59E0B"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Paws */}
        <ellipse cx="32" cy="75" rx="10" ry="6" fill="#FCD34D" />
        <ellipse cx="68" cy="75" rx="10" ry="6" fill="#FCD34D" />
      </g>

      {/* Students on left reading */}
      <g transform="translate(15, 130)">
        {/* Ana */}
        <circle cx="20" cy="12" r="10" fill="#FDE68A" />
        <ellipse cx="20" cy="6" rx="10" ry="5" fill="#111827" />
        <circle cx="10" cy="4" r="4" fill="#111827" />
        <circle cx="30" cy="4" r="4" fill="#111827" />
        <rect x="10" y="22" width="18" height="25" rx="4" fill="#EC4899" />
        <circle cx="16" cy="11" r="1.2" fill="#111827" />
        <circle cx="24" cy="11" r="1.2" fill="#111827" />
        {/* Speech */}
        <text
          x="40"
          y="20"
          fill="#111827"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="10"
          fontWeight="bold"
        >
          Cat!
        </text>
      </g>

      <g transform="translate(330, 130)">
        {/* Ben */}
        <circle cx="20" cy="12" r="10" fill="#FDE68A" />
        <ellipse cx="20" cy="6" rx="11" ry="5" fill="#92400E" />
        <rect x="10" y="22" width="18" height="25" rx="4" fill="#10B981" />
        <circle cx="16" cy="11" r="1.2" fill="#111827" />
        <circle cx="24" cy="11" r="1.2" fill="#111827" />
        <text
          x="40"
          y="20"
          fill="#111827"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="10"
          fontWeight="bold"
        >
          Bat!
        </text>
      </g>

      <text x="308" y="108" fontSize="14">
        ⭐
      </text>
      <text x="15" y="100" fontSize="14">
        ✨
      </text>
    </svg>
  );
}

/* ── Page 5: Students reading a sentence together ── */
function Page5Scene() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="220" rx="8" fill="#FFF1F2" />
      <rect y="170" width="400" height="50" fill="#FEF3C7" />

      {/* Big sentence banner */}
      <rect
        x="30"
        y="15"
        width="340"
        height="50"
        rx="12"
        fill="#FFF"
        stroke="#8B5CF6"
        strokeWidth="3"
      />
      <text
        x="200"
        y="48"
        textAnchor="middle"
        fill="#111827"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="22"
        fontWeight="bold"
      >
        &quot;The cat sat on the mat.&quot;
      </text>

      {/* Highlight the -at words */}
      <rect
        x="105"
        y="30"
        width="38"
        height="25"
        rx="5"
        fill="#86EFAC"
        opacity="0.4"
      />
      <rect
        x="155"
        y="30"
        width="38"
        height="25"
        rx="5"
        fill="#86EFAC"
        opacity="0.4"
      />
      <rect
        x="285"
        y="30"
        width="48"
        height="25"
        rx="5"
        fill="#86EFAC"
        opacity="0.4"
      />

      {/* Teacher at side */}
      <g transform="translate(15, 75)">
        <rect x="8" y="28" width="22" height="36" rx="4" fill="#3B82F6" />
        <circle cx="19" cy="18" r="13" fill="#FDE68A" />
        <ellipse cx="19" cy="10" rx="14" ry="7" fill="#78350F" />
        <circle cx="14" cy="17" r="1.5" fill="#111827" />
        <circle cx="24" cy="17" r="1.5" fill="#111827" />
        <path
          d="M14 22 Q19 26 24 22"
          stroke="#111827"
          strokeWidth="1.5"
          fill="none"
        />
        <rect x="12" y="64" width="6" height="16" rx="3" fill="#1E3A8A" />
        <rect x="20" y="64" width="6" height="16" rx="3" fill="#1E3A8A" />
        {/* Thumbs up */}
        <line
          x1="30"
          y1="35"
          x2="45"
          y2="25"
          stroke="#FDE68A"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <text x="42" y="22" fontSize="16">
          👍
        </text>
      </g>

      {/* Students reading together - group */}
      <g transform="translate(120, 85)">
        {/* Ana */}
        <circle cx="30" cy="12" r="12" fill="#FDE68A" />
        <ellipse cx="30" cy="5" rx="12" ry="6" fill="#111827" />
        <circle cx="19" cy="2" r="5" fill="#111827" />
        <circle cx="41" cy="2" r="5" fill="#111827" />
        <rect x="18" y="24" width="22" height="30" rx="4" fill="#EC4899" />
        <circle cx="26" cy="11" r="1.5" fill="#111827" />
        <circle cx="34" cy="11" r="1.5" fill="#111827" />
        <path
          d="M26 16 Q30 20 34 16"
          stroke="#111827"
          strokeWidth="1"
          fill="none"
        />
      </g>

      <g transform="translate(210, 85)">
        {/* Ben */}
        <circle cx="30" cy="12" r="12" fill="#FDE68A" />
        <ellipse cx="30" cy="5" rx="13" ry="6" fill="#92400E" />
        <rect x="18" y="24" width="22" height="30" rx="4" fill="#10B981" />
        <circle cx="26" cy="11" r="1.5" fill="#111827" />
        <circle cx="34" cy="11" r="1.5" fill="#111827" />
        <path
          d="M26 16 Q30 20 34 16"
          stroke="#111827"
          strokeWidth="1"
          fill="none"
        />
      </g>

      {/* Open book between them */}
      <g transform="translate(155, 130)">
        <path
          d="M0 8 Q25 -3 50 8 L50 40 Q25 30 0 40 Z"
          fill="#FFF"
          stroke="#111827"
          strokeWidth="1.5"
        />
        <path
          d="M50 8 Q75 -3 100 8 L100 40 Q75 30 50 40 Z"
          fill="#FFFBEB"
          stroke="#111827"
          strokeWidth="1.5"
        />
        <line x1="50" y1="8" x2="50" y2="40" stroke="#111827" strokeWidth="1" />
      </g>

      {/* "That was easy!" bubble */}
      <g transform="translate(280, 100)">
        <rect
          x="0"
          y="0"
          width="95"
          height="30"
          rx="10"
          fill="#FEF9C3"
          stroke="#F59E0B"
          strokeWidth="1.5"
        />
        <text
          x="47"
          y="20"
          textAnchor="middle"
          fill="#92400E"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="11"
          fontWeight="bold"
        >
          That was easy!
        </text>
        <polygon
          points="20,30 30,30 15,42"
          fill="#FEF9C3"
          stroke="#F59E0B"
          strokeWidth="1.5"
        />
      </g>

      <text x="370" y="85" fontSize="14">
        ⭐
      </text>
      <text x="100" y="200" fontSize="14">
        📖
      </text>
    </svg>
  );
}

/* ── Page 6: Teacher writes Fan/Man/Pan on board ── */
function Page6Scene() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="220" rx="8" fill="#ECFDF5" />
      <rect y="170" width="400" height="50" fill="#FEF3C7" />

      {/* Board */}
      <rect
        x="60"
        y="10"
        width="280"
        height="110"
        rx="8"
        fill="#1E3A5F"
        stroke="#111827"
        strokeWidth="3"
      />
      <rect x="70" y="18" width="260" height="95" rx="4" fill="#234E6F" />

      {/* Words */}
      <text
        x="130"
        y="58"
        textAnchor="middle"
        fill="#86EFAC"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="28"
        fontWeight="bold"
      >
        Fan
      </text>
      <text
        x="200"
        y="58"
        textAnchor="middle"
        fill="#FDE68A"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="28"
        fontWeight="bold"
      >
        Man
      </text>
      <text
        x="270"
        y="58"
        textAnchor="middle"
        fill="#F9A8D4"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="28"
        fontWeight="bold"
      >
        Pan
      </text>

      {/* Pattern highlight */}
      <text
        x="200"
        y="98"
        textAnchor="middle"
        fill="#FFF"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="16"
        fontWeight="bold"
      >
        These end with –an!
      </text>

      {/* Board ledge */}
      <rect x="55" y="118" width="290" height="6" rx="2" fill="#92400E" />

      {/* Teacher pointing */}
      <g transform="translate(15, 95)">
        <rect x="8" y="28" width="22" height="36" rx="4" fill="#3B82F6" />
        <circle cx="19" cy="18" r="13" fill="#FDE68A" />
        <ellipse cx="19" cy="10" rx="14" ry="7" fill="#78350F" />
        <circle cx="14" cy="17" r="1.5" fill="#111827" />
        <circle cx="24" cy="17" r="1.5" fill="#111827" />
        <path
          d="M14 22 Q19 26 24 22"
          stroke="#111827"
          strokeWidth="1.5"
          fill="none"
        />
        <line
          x1="30"
          y1="32"
          x2="55"
          y2="15"
          stroke="#FDE68A"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <rect x="12" y="64" width="6" height="16" rx="3" fill="#1E3A8A" />
        <rect x="20" y="64" width="6" height="16" rx="3" fill="#1E3A8A" />
      </g>

      {/* Ben excited - end with -an! */}
      <g transform="translate(320, 130)">
        <circle cx="20" cy="12" r="10" fill="#FDE68A" />
        <ellipse cx="20" cy="6" rx="11" ry="5" fill="#92400E" />
        <rect x="10" y="22" width="18" height="25" rx="4" fill="#10B981" />
        <circle cx="16" cy="11" r="1.2" fill="#111827" />
        <circle cx="24" cy="11" r="1.2" fill="#111827" />
        <path
          d="M16 16 Q20 19 24 16"
          stroke="#111827"
          strokeWidth="1"
          fill="none"
        />
      </g>

      {/* Students saying words */}
      <g transform="translate(120, 140)">
        <rect
          x="0"
          y="0"
          width="170"
          height="28"
          rx="10"
          fill="#D1FAE5"
          stroke="#10B981"
          strokeWidth="1.5"
        />
        <text
          x="85"
          y="19"
          textAnchor="middle"
          fill="#065F46"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="13"
          fontWeight="bold"
        >
          Fan! Man! Pan!
        </text>
      </g>

      <text x="365" y="30" fontSize="14">
        🌟
      </text>
      <text x="25" y="45" fontSize="14">
        ✨
      </text>
    </svg>
  );
}

/* ── Page 7: Practice - Ran/Van/Can ── */
function Page7Scene() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="220" rx="8" fill="#ECFDF5" />
      <rect y="180" width="400" height="40" fill="#FEF3C7" />

      {/* Practice Time banner */}
      <rect x="85" y="8" width="230" height="35" rx="10" fill="#F59E0B" />
      <text
        x="200"
        y="32"
        textAnchor="middle"
        fill="#FFF"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="20"
        fontWeight="bold"
      >
        ⏰ Practice Time!
      </text>

      {/* Word cards */}
      {[
        { word: "Ran", x: 65, color: "#DBEAFE", border: "#3B82F6", who: "Ana" },
        {
          word: "Van",
          x: 200,
          color: "#D1FAE5",
          border: "#10B981",
          who: "Ben",
        },
        {
          word: "Can",
          x: 335,
          color: "#FEF9C3",
          border: "#F59E0B",
          who: "All",
        },
      ].map((w) => (
        <g key={w.word} transform={`translate(${w.x - 40}, 55)`}>
          <rect
            width="80"
            height="48"
            rx="12"
            fill={w.color}
            stroke={w.border}
            strokeWidth="2.5"
          />
          <text
            x="40"
            y="32"
            textAnchor="middle"
            fill="#111827"
            fontFamily="var(--font-comic), sans-serif"
            fontSize="24"
            fontWeight="bold"
          >
            {w.word}
          </text>
          <text
            x="40"
            y="60"
            textAnchor="middle"
            fill="#6B7280"
            fontFamily="var(--font-comic), sans-serif"
            fontSize="9"
          >
            — {w.who}
          </text>
        </g>
      ))}

      {/* Ana saying "Ran!" */}
      <g transform="translate(30, 125)">
        <circle cx="20" cy="12" r="11" fill="#FDE68A" />
        <ellipse cx="20" cy="5" rx="12" ry="5" fill="#111827" />
        <circle cx="10" cy="3" r="5" fill="#111827" />
        <circle cx="30" cy="3" r="5" fill="#111827" />
        <rect x="9" y="23" width="20" height="28" rx="4" fill="#EC4899" />
        <circle cx="16" cy="11" r="1.3" fill="#111827" />
        <circle cx="24" cy="11" r="1.3" fill="#111827" />
        <path
          d="M16 16 Q20 19 24 16"
          stroke="#111827"
          strokeWidth="1"
          fill="none"
        />
      </g>

      {/* Ben saying "Van!" */}
      <g transform="translate(340, 125)">
        <circle cx="20" cy="12" r="11" fill="#FDE68A" />
        <ellipse cx="20" cy="5" rx="12" ry="5" fill="#92400E" />
        <rect x="9" y="23" width="20" height="28" rx="4" fill="#10B981" />
        <circle cx="16" cy="11" r="1.3" fill="#111827" />
        <circle cx="24" cy="11" r="1.3" fill="#111827" />
        <path
          d="M16 16 Q20 19 24 16"
          stroke="#111827"
          strokeWidth="1"
          fill="none"
        />
      </g>

      {/* Teacher - Excellent reading! */}
      <g transform="translate(165, 130)">
        <rect x="8" y="28" width="20" height="30" rx="4" fill="#3B82F6" />
        <circle cx="18" cy="18" r="12" fill="#FDE68A" />
        <ellipse cx="18" cy="11" rx="13" ry="6" fill="#78350F" />
        <circle cx="13" cy="17" r="1.3" fill="#111827" />
        <circle cx="23" cy="17" r="1.3" fill="#111827" />
        <path
          d="M13 22 Q18 26 23 22"
          stroke="#111827"
          strokeWidth="1"
          fill="none"
        />
      </g>

      <g transform="translate(125, 172)">
        <rect
          x="0"
          y="0"
          width="150"
          height="24"
          rx="8"
          fill="#F0FDF4"
          stroke="#10B981"
          strokeWidth="1.5"
        />
        <text
          x="75"
          y="16"
          textAnchor="middle"
          fill="#065F46"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="11"
          fontWeight="bold"
        >
          Excellent reading! ⭐
        </text>
      </g>

      <text x="15" y="55" fontSize="14">
        ✏️
      </text>
      <text x="380" y="180" fontSize="14">
        🌟
      </text>
    </svg>
  );
}

/* ── Page 8: Short Vowel Words - pig/pen/cup/bed ── */
function Page8Scene() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="220" rx="8" fill="#FDF4FF" />
      <rect y="180" width="400" height="40" fill="#FEF3C7" />

      {/* Title */}
      <rect x="90" y="8" width="220" height="32" rx="8" fill="#A855F7" />
      <text
        x="200"
        y="30"
        textAnchor="middle"
        fill="#FFF"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="18"
        fontWeight="bold"
      >
        Short Vowel Words
      </text>

      {/* Picture cards with illustrations */}
      {/* Pig */}
      <g transform="translate(15, 50)">
        <rect
          width="80"
          height="85"
          rx="10"
          fill="#FFF"
          stroke="#EC4899"
          strokeWidth="2"
        />
        <text x="40" y="40" textAnchor="middle" fontSize="32">
          🐷
        </text>
        <text
          x="40"
          y="68"
          textAnchor="middle"
          fill="#111827"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="20"
          fontWeight="bold"
        >
          Pig
        </text>
      </g>

      {/* Pen */}
      <g transform="translate(110, 50)">
        <rect
          width="80"
          height="85"
          rx="10"
          fill="#FFF"
          stroke="#3B82F6"
          strokeWidth="2"
        />
        <text x="40" y="40" textAnchor="middle" fontSize="32">
          🖊️
        </text>
        <text
          x="40"
          y="68"
          textAnchor="middle"
          fill="#111827"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="20"
          fontWeight="bold"
        >
          Pen
        </text>
      </g>

      {/* Cup */}
      <g transform="translate(205, 50)">
        <rect
          width="80"
          height="85"
          rx="10"
          fill="#FFF"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        <text x="40" y="40" textAnchor="middle" fontSize="32">
          ☕
        </text>
        <text
          x="40"
          y="68"
          textAnchor="middle"
          fill="#111827"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="20"
          fontWeight="bold"
        >
          Cup
        </text>
      </g>

      {/* Bed */}
      <g transform="translate(300, 50)">
        <rect
          width="80"
          height="85"
          rx="10"
          fill="#FFF"
          stroke="#10B981"
          strokeWidth="2"
        />
        <text x="40" y="40" textAnchor="middle" fontSize="32">
          🛏️
        </text>
        <text
          x="40"
          y="68"
          textAnchor="middle"
          fill="#111827"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="20"
          fontWeight="bold"
        >
          Bed
        </text>
      </g>

      {/* Ana & Ben reading */}
      <g transform="translate(60, 150)">
        <circle cx="18" cy="8" r="9" fill="#FDE68A" />
        <ellipse cx="18" cy="2" rx="10" ry="5" fill="#111827" />
        <rect x="8" y="17" width="18" height="22" rx="4" fill="#EC4899" />
        <text
          x="45"
          y="18"
          fill="#111827"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="11"
          fontWeight="bold"
        >
          Pig! Pen!
        </text>
      </g>

      <g transform="translate(250, 150)">
        <circle cx="18" cy="8" r="9" fill="#FDE68A" />
        <ellipse cx="18" cy="2" rx="10" ry="5" fill="#92400E" />
        <rect x="8" y="17" width="18" height="22" rx="4" fill="#10B981" />
        <text
          x="45"
          y="18"
          fill="#111827"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="11"
          fontWeight="bold"
        >
          Cup! Bed!
        </text>
      </g>

      <text x="190" y="175" fontSize="16">
        📚
      </text>
    </svg>
  );
}

/* ── Page 9: Blends - sh/br/fr with ship/brush/frog ── */
function Page9Scene() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="220" rx="8" fill="#EFF6FF" />
      <rect y="180" width="400" height="40" fill="#FEF3C7" />

      {/* Title */}
      <rect x="120" y="8" width="160" height="32" rx="8" fill="#3B82F6" />
      <text
        x="200"
        y="30"
        textAnchor="middle"
        fill="#FFF"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="18"
        fontWeight="bold"
      >
        Blends!
      </text>

      {/* Ship card */}
      <g transform="translate(15, 50)">
        <rect
          width="110"
          height="100"
          rx="12"
          fill="#FFF"
          stroke="#06B6D4"
          strokeWidth="2.5"
        />
        <rect x="10" y="8" width="40" height="22" rx="6" fill="#06B6D4" />
        <text
          x="30"
          y="24"
          textAnchor="middle"
          fill="#FFF"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="14"
          fontWeight="bold"
        >
          sh
        </text>
        <text x="55" y="50" textAnchor="middle" fontSize="34">
          🚢
        </text>
        <text
          x="55"
          y="82"
          textAnchor="middle"
          fill="#111827"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="20"
          fontWeight="bold"
        >
          Ship
        </text>
      </g>

      {/* Brush card */}
      <g transform="translate(145, 50)">
        <rect
          width="110"
          height="100"
          rx="12"
          fill="#FFF"
          stroke="#8B5CF6"
          strokeWidth="2.5"
        />
        <rect x="10" y="8" width="40" height="22" rx="6" fill="#8B5CF6" />
        <text
          x="30"
          y="24"
          textAnchor="middle"
          fill="#FFF"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="14"
          fontWeight="bold"
        >
          br
        </text>
        <text x="55" y="50" textAnchor="middle" fontSize="34">
          🖌️
        </text>
        <text
          x="55"
          y="82"
          textAnchor="middle"
          fill="#111827"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="20"
          fontWeight="bold"
        >
          Brush
        </text>
      </g>

      {/* Frog card */}
      <g transform="translate(275, 50)">
        <rect
          width="110"
          height="100"
          rx="12"
          fill="#FFF"
          stroke="#10B981"
          strokeWidth="2.5"
        />
        <rect x="10" y="8" width="40" height="22" rx="6" fill="#10B981" />
        <text
          x="30"
          y="24"
          textAnchor="middle"
          fill="#FFF"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="14"
          fontWeight="bold"
        >
          fr
        </text>
        <text x="55" y="50" textAnchor="middle" fontSize="34">
          🐸
        </text>
        <text
          x="55"
          y="82"
          textAnchor="middle"
          fill="#111827"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="20"
          fontWeight="bold"
        >
          Frog
        </text>
      </g>

      {/* Students listening */}
      <g transform="translate(100, 162)">
        <rect
          x="0"
          y="0"
          width="200"
          height="26"
          rx="10"
          fill="#DBEAFE"
          stroke="#3B82F6"
          strokeWidth="1.5"
        />
        <text
          x="100"
          y="18"
          textAnchor="middle"
          fill="#1E3A8A"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="12"
          fontWeight="bold"
        >
          Ship! Brush! Frog! 🎉
        </text>
      </g>

      {/* Teacher note */}
      <g transform="translate(10, 170)">
        <circle cx="12" cy="12" r="9" fill="#FDE68A" />
        <ellipse cx="12" cy="6" rx="10" ry="5" fill="#78350F" />
        <rect x="4" y="21" width="14" height="16" rx="3" fill="#3B82F6" />
      </g>

      <text x="375" y="48" fontSize="14">
        ✨
      </text>
    </svg>
  );
}

/* ── Page 10: Context clues quiz - "The frog can ___" ── */
function Page10Scene() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="220" rx="8" fill="#FEF9C3" />
      <rect y="180" width="400" height="40" fill="#FEF3C7" />

      {/* Quiz banner */}
      <rect x="100" y="8" width="200" height="35" rx="10" fill="#EF4444" />
      <text
        x="200"
        y="32"
        textAnchor="middle"
        fill="#FFF"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="18"
        fontWeight="bold"
      >
        🧩 Quiz Time!
      </text>

      {/* Sentence card */}
      <rect
        x="40"
        y="55"
        width="320"
        height="50"
        rx="12"
        fill="#FFF"
        stroke="#111827"
        strokeWidth="2.5"
      />
      <text
        x="200"
        y="86"
        textAnchor="middle"
        fill="#111827"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="20"
        fontWeight="bold"
      >
        The frog can ___.
      </text>

      {/* Frog illustration */}
      <text x="55" y="85" fontSize="28">
        🐸
      </text>

      {/* Answer options */}
      <g transform="translate(60, 120)">
        <rect
          width="80"
          height="40"
          rx="10"
          fill="#D1FAE5"
          stroke="#10B981"
          strokeWidth="2.5"
        />
        <text
          x="40"
          y="27"
          textAnchor="middle"
          fill="#065F46"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="18"
          fontWeight="bold"
        >
          Hop
        </text>
        <text x="70" y="14" fontSize="12">
          ✅
        </text>
      </g>

      <g transform="translate(160, 120)">
        <rect
          width="80"
          height="40"
          rx="10"
          fill="#FEF3C7"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        <text
          x="40"
          y="27"
          textAnchor="middle"
          fill="#92400E"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="18"
          fontWeight="bold"
        >
          Sit
        </text>
      </g>

      <g transform="translate(260, 120)">
        <rect
          width="80"
          height="40"
          rx="10"
          fill="#FEE2E2"
          stroke="#EF4444"
          strokeWidth="2"
        />
        <text
          x="40"
          y="27"
          textAnchor="middle"
          fill="#991B1B"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="18"
          fontWeight="bold"
        >
          Fly
        </text>
      </g>

      {/* Ana saying Hop! */}
      <g transform="translate(30, 165)">
        <circle cx="15" cy="8" r="9" fill="#FDE68A" />
        <ellipse cx="15" cy="2" rx="10" ry="5" fill="#111827" />
        <rect x="6" y="17" width="16" height="18" rx="3" fill="#EC4899" />
        <text
          x="42"
          y="18"
          fill="#EC4899"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="12"
          fontWeight="bold"
        >
          Hop!
        </text>
      </g>

      {/* Ben explaining */}
      <g transform="translate(240, 165)">
        <circle cx="15" cy="8" r="9" fill="#FDE68A" />
        <ellipse cx="15" cy="2" rx="10" ry="5" fill="#92400E" />
        <rect x="6" y="17" width="16" height="18" rx="3" fill="#10B981" />
        <text
          x="38"
          y="14"
          fill="#10B981"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="9"
          fontWeight="bold"
        >
          Hop makes
        </text>
        <text
          x="38"
          y="26"
          fill="#10B981"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="9"
          fontWeight="bold"
        >
          sense!
        </text>
      </g>

      <text x="370" y="60" fontSize="14">
        🏆
      </text>
    </svg>
  );
}

/* ── Page 11: Happy students - "Reading is Fun" ── */
function Page11Scene() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="220" rx="8" fill="#F0FDF4" />
      <rect y="180" width="400" height="40" fill="#D1FAE5" />

      {/* Rainbow/celebration arc */}
      <path
        d="M50 120 Q200 -20 350 120"
        fill="none"
        stroke="#EF4444"
        strokeWidth="4"
        opacity="0.3"
      />
      <path
        d="M60 120 Q200 0 340 120"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="4"
        opacity="0.3"
      />
      <path
        d="M70 120 Q200 20 330 120"
        fill="none"
        stroke="#10B981"
        strokeWidth="4"
        opacity="0.3"
      />

      {/* "Reading is Fun!" banner */}
      <rect x="80" y="15" width="240" height="40" rx="12" fill="#10B981" />
      <text
        x="200"
        y="42"
        textAnchor="middle"
        fill="#FFF"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="22"
        fontWeight="bold"
      >
        📖 Reading is Fun!
      </text>

      {/* Happy students group */}
      {/* Teacher Mia */}
      <g transform="translate(155, 65)">
        <rect x="8" y="28" width="24" height="40" rx="4" fill="#3B82F6" />
        <circle cx="20" cy="18" r="15" fill="#FDE68A" />
        <ellipse cx="20" cy="10" rx="16" ry="7" fill="#78350F" />
        <rect x="4" y="8" width="6" height="16" rx="3" fill="#78350F" />
        <rect x="30" y="8" width="6" height="16" rx="3" fill="#78350F" />
        <circle cx="14" cy="17" r="2" fill="#111827" />
        <circle cx="26" cy="17" r="2" fill="#111827" />
        <path
          d="M14 23 Q20 28 26 23"
          stroke="#111827"
          strokeWidth="1.5"
          fill="none"
        />
        <rect x="12" y="68" width="7" height="16" rx="3" fill="#1E3A8A" />
        <rect x="21" y="68" width="7" height="16" rx="3" fill="#1E3A8A" />
      </g>

      {/* Ana - happy jumping */}
      <g transform="translate(60, 75)">
        <rect x="8" y="28" width="20" height="35" rx="4" fill="#EC4899" />
        <circle cx="18" cy="18" r="13" fill="#FDE68A" />
        <ellipse cx="18" cy="10" rx="13" ry="6" fill="#111827" />
        <circle cx="7" cy="7" r="5" fill="#111827" />
        <circle cx="29" cy="7" r="5" fill="#111827" />
        <circle cx="13" cy="17" r="1.5" fill="#111827" />
        <circle cx="23" cy="17" r="1.5" fill="#111827" />
        <path
          d="M13 22 Q18 26 23 22"
          stroke="#111827"
          strokeWidth="1"
          fill="none"
        />
        <rect x="11" y="63" width="6" height="15" rx="3" fill="#BE185D" />
        <rect x="19" y="63" width="6" height="15" rx="3" fill="#BE185D" />
        {/* Raised arms */}
        <line
          x1="5"
          y1="32"
          x2="-8"
          y2="12"
          stroke="#FDE68A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="31"
          y1="32"
          x2="44"
          y2="12"
          stroke="#FDE68A"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* Ben - happy */}
      <g transform="translate(280, 75)">
        <rect x="8" y="28" width="20" height="35" rx="4" fill="#10B981" />
        <circle cx="18" cy="18" r="13" fill="#FDE68A" />
        <ellipse cx="18" cy="10" rx="13" ry="6" fill="#92400E" />
        <circle cx="13" cy="17" r="1.5" fill="#111827" />
        <circle cx="23" cy="17" r="1.5" fill="#111827" />
        <path
          d="M13 22 Q18 26 23 22"
          stroke="#111827"
          strokeWidth="1"
          fill="none"
        />
        <rect x="11" y="63" width="6" height="15" rx="3" fill="#065F46" />
        <rect x="19" y="63" width="6" height="15" rx="3" fill="#065F46" />
        <line
          x1="5"
          y1="32"
          x2="-8"
          y2="12"
          stroke="#FDE68A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="31"
          y1="32"
          x2="44"
          y2="12"
          stroke="#FDE68A"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* Book icons floating */}
      <text x="40" y="55" fontSize="18">
        📚
      </text>
      <text x="340" y="55" fontSize="18">
        📖
      </text>
      <text x="120" y="185" fontSize="14">
        ⭐
      </text>
      <text x="270" y="185" fontSize="14">
        🌟
      </text>

      {/* Keep practicing speech bubble */}
      <g transform="translate(100, 170)">
        <rect
          x="0"
          y="0"
          width="200"
          height="24"
          rx="8"
          fill="#FFF"
          stroke="#10B981"
          strokeWidth="1.5"
        />
        <text
          x="100"
          y="16"
          textAnchor="middle"
          fill="#065F46"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="11"
          fontWeight="bold"
        >
          Keep practicing every day! 🎵
        </text>
      </g>
    </svg>
  );
}

/* ── Page 12: The End - celebration ── */
function Page12Scene() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="220" rx="8" fill="#FEF9C3" />

      {/* Confetti */}
      {[
        { x: 25, y: 25, c: "#EF4444" },
        { x: 85, y: 15, c: "#3B82F6" },
        { x: 145, y: 30, c: "#10B981" },
        { x: 220, y: 12, c: "#F59E0B" },
        { x: 280, y: 28, c: "#8B5CF6" },
        { x: 340, y: 18, c: "#EC4899" },
        { x: 375, y: 40, c: "#06B6D4" },
        { x: 50, y: 50, c: "#F59E0B" },
        { x: 310, y: 50, c: "#EF4444" },
        { x: 170, y: 45, c: "#8B5CF6" },
      ].map((c, i) => (
        <rect
          key={i}
          x={c.x}
          y={c.y}
          width="8"
          height="4"
          rx="1"
          fill={c.c}
          transform={`rotate(${i * 30} ${c.x + 4} ${c.y + 2})`}
        />
      ))}

      {/* Trophy */}
      <text x="175" y="45" fontSize="40">
        🏆
      </text>

      {/* Hooray banner */}
      <rect x="60" y="55" width="280" height="42" rx="14" fill="#8B5CF6" />
      <text
        x="200"
        y="83"
        textAnchor="middle"
        fill="#FFF"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="24"
        fontWeight="bold"
      >
        🎵 Hooray for Reading! 🎵
      </text>

      {/* All characters celebrating */}
      {/* Teacher happy */}
      <g transform="translate(85, 105)">
        <rect x="8" y="28" width="22" height="36" rx="4" fill="#3B82F6" />
        <circle cx="19" cy="18" r="14" fill="#FDE68A" />
        <ellipse cx="19" cy="10" rx="15" ry="7" fill="#78350F" />
        <rect x="3" y="8" width="6" height="16" rx="3" fill="#78350F" />
        <rect x="29" y="8" width="6" height="16" rx="3" fill="#78350F" />
        <circle cx="13" cy="17" r="1.5" fill="#111827" />
        <circle cx="25" cy="17" r="1.5" fill="#111827" />
        <path
          d="M13 23 Q19 28 25 23"
          stroke="#111827"
          strokeWidth="1.5"
          fill="none"
        />
        <rect x="12" y="64" width="6" height="16" rx="3" fill="#1E3A8A" />
        <rect x="20" y="64" width="6" height="16" rx="3" fill="#1E3A8A" />
      </g>

      {/* Ana jumping */}
      <g transform="translate(165, 100)">
        <rect x="8" y="28" width="20" height="32" rx="4" fill="#EC4899" />
        <circle cx="18" cy="18" r="13" fill="#FDE68A" />
        <ellipse cx="18" cy="10" rx="13" ry="6" fill="#111827" />
        <circle cx="7" cy="7" r="5" fill="#111827" />
        <circle cx="29" cy="7" r="5" fill="#111827" />
        <circle cx="13" cy="17" r="1.5" fill="#111827" />
        <circle cx="23" cy="17" r="1.5" fill="#111827" />
        <path
          d="M13 22 Q18 26 23 22"
          stroke="#111827"
          strokeWidth="1"
          fill="none"
        />
        <line
          x1="3"
          y1="30"
          x2="-10"
          y2="10"
          stroke="#FDE68A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="33"
          y1="30"
          x2="46"
          y2="10"
          stroke="#FDE68A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <rect x="11" y="60" width="6" height="14" rx="3" fill="#BE185D" />
        <rect x="19" y="60" width="6" height="14" rx="3" fill="#BE185D" />
      </g>

      {/* Ben jumping */}
      <g transform="translate(250, 100)">
        <rect x="8" y="28" width="20" height="32" rx="4" fill="#10B981" />
        <circle cx="18" cy="18" r="13" fill="#FDE68A" />
        <ellipse cx="18" cy="10" rx="13" ry="6" fill="#92400E" />
        <circle cx="13" cy="17" r="1.5" fill="#111827" />
        <circle cx="23" cy="17" r="1.5" fill="#111827" />
        <path
          d="M13 22 Q18 26 23 22"
          stroke="#111827"
          strokeWidth="1"
          fill="none"
        />
        <line
          x1="3"
          y1="30"
          x2="-10"
          y2="10"
          stroke="#FDE68A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="33"
          y1="30"
          x2="46"
          y2="10"
          stroke="#FDE68A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <rect x="11" y="60" width="6" height="14" rx="3" fill="#065F46" />
        <rect x="19" y="60" width="6" height="14" rx="3" fill="#065F46" />
      </g>

      {/* Tom the Cat */}
      <g transform="translate(320, 120)">
        <ellipse cx="22" cy="35" rx="18" ry="22" fill="#F59E0B" />
        <circle cx="22" cy="12" r="14" fill="#FCD34D" />
        <polygon
          points="10,4 7,-8 18,1"
          fill="#FCD34D"
          stroke="#F59E0B"
          strokeWidth="1"
        />
        <polygon
          points="34,4 37,-8 26,1"
          fill="#FCD34D"
          stroke="#F59E0B"
          strokeWidth="1"
        />
        <ellipse cx="16" cy="11" rx="3" ry="3.5" fill="#111827" />
        <ellipse cx="28" cy="11" rx="3" ry="3.5" fill="#111827" />
        <circle cx="17.5" cy="10" r="1.2" fill="#FFF" />
        <circle cx="29.5" cy="10" r="1.2" fill="#FFF" />
        <polygon points="22,16 20,19 24,19" fill="#F472B6" />
        <path
          d="M18 21 Q22 25 26 21"
          stroke="#111827"
          strokeWidth="1"
          fill="none"
        />
        <line
          x1="6"
          y1="16"
          x2="16"
          y2="17"
          stroke="#111827"
          strokeWidth="0.8"
        />
        <line
          x1="6"
          y1="20"
          x2="16"
          y2="19"
          stroke="#111827"
          strokeWidth="0.8"
        />
        <line
          x1="38"
          y1="16"
          x2="28"
          y2="17"
          stroke="#111827"
          strokeWidth="0.8"
        />
        <line
          x1="38"
          y1="20"
          x2="28"
          y2="19"
          stroke="#111827"
          strokeWidth="0.8"
        />
        <path
          d="M40 35 Q55 22 52 8"
          stroke="#F59E0B"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Stars */}
      <text x="15" y="80" fontSize="18">
        ⭐
      </text>
      <text x="370" y="80" fontSize="18">
        🌟
      </text>
      <text x="200" y="210" fontSize="14">
        ✨
      </text>
      <text x="50" y="200" fontSize="14">
        🎊
      </text>
      <text x="340" y="200" fontSize="14">
        🎉
      </text>
    </svg>
  );
}

/* ── Cover Page: Teacher Mia with Ana & Ben holding a big book, Tom on book ── */
function CoverScene() {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sky background */}
      <rect width="400" height="240" rx="8" fill="#EDE9FE" />
      {/* Stars/sparkles */}
      <text x="30" y="30" fontSize="16">
        ✨
      </text>
      <text x="340" y="25" fontSize="18">
        ⭐
      </text>
      <text x="180" y="22" fontSize="14">
        🌟
      </text>
      <text x="70" y="50" fontSize="12">
        ⭐
      </text>
      <text x="310" y="55" fontSize="12">
        ✨
      </text>

      {/* Big Book - center */}
      <g transform="translate(110, 55)">
        {/* Book cover */}
        <rect
          x="0"
          y="0"
          width="180"
          height="130"
          rx="8"
          fill="#7C3AED"
          stroke="#111827"
          strokeWidth="3"
        />
        <rect x="8" y="8" width="164" height="114" rx="4" fill="#8B5CF6" />
        {/* Book spine */}
        <rect
          x="0"
          y="0"
          width="14"
          height="130"
          rx="4"
          fill="#6D28D9"
          stroke="#111827"
          strokeWidth="1.5"
        />
        {/* Title on book */}
        <text
          x="98"
          y="42"
          textAnchor="middle"
          fill="#FFF"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="14"
          fontWeight="bold"
        >
          The Word
        </text>
        <text
          x="98"
          y="62"
          textAnchor="middle"
          fill="#FDE68A"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="14"
          fontWeight="bold"
        >
          Pattern
        </text>
        <text
          x="98"
          y="82"
          textAnchor="middle"
          fill="#FFF"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="14"
          fontWeight="bold"
        >
          Adventure
        </text>
        {/* Book pages */}
        <rect
          x="175"
          y="8"
          width="8"
          height="114"
          rx="2"
          fill="#FFF"
          stroke="#D1D5DB"
          strokeWidth="1"
        />

        {/* Tom the Cat sitting ON the book */}
        <g transform="translate(62, -40)">
          <ellipse cx="20" cy="28" rx="16" ry="18" fill="#F59E0B" />
          <circle cx="20" cy="10" r="12" fill="#FCD34D" />
          <polygon
            points="10,4 8,-6 16,2"
            fill="#FCD34D"
            stroke="#F59E0B"
            strokeWidth="1"
          />
          <polygon
            points="30,4 32,-6 24,2"
            fill="#FCD34D"
            stroke="#F59E0B"
            strokeWidth="1"
          />
          <ellipse cx="15" cy="9" rx="2.5" ry="3" fill="#111827" />
          <ellipse cx="25" cy="9" rx="2.5" ry="3" fill="#111827" />
          <circle cx="16" cy="8" r="1" fill="#FFF" />
          <circle cx="26" cy="8" r="1" fill="#FFF" />
          <polygon points="20,13 18,16 22,16" fill="#F472B6" />
          <path
            d="M16 18 Q20 21 24 18"
            stroke="#111827"
            strokeWidth="1"
            fill="none"
          />
          <line
            x1="6"
            y1="13"
            x2="14"
            y2="14"
            stroke="#111827"
            strokeWidth="0.7"
          />
          <line
            x1="6"
            y1="16"
            x2="14"
            y2="15"
            stroke="#111827"
            strokeWidth="0.7"
          />
          <line
            x1="34"
            y1="13"
            x2="26"
            y2="14"
            stroke="#111827"
            strokeWidth="0.7"
          />
          <line
            x1="34"
            y1="16"
            x2="26"
            y2="15"
            stroke="#111827"
            strokeWidth="0.7"
          />
          <path
            d="M36 28 Q48 18 46 5"
            stroke="#F59E0B"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Paws on book edge */}
          <ellipse cx="10" cy="38" rx="7" ry="4" fill="#FCD34D" />
          <ellipse cx="30" cy="38" rx="7" ry="4" fill="#FCD34D" />
        </g>
      </g>

      {/* Teacher Mia - holding book from left */}
      <g transform="translate(45, 95)">
        <rect x="8" y="28" width="26" height="44" rx="4" fill="#3B82F6" />
        <circle cx="21" cy="18" r="16" fill="#FDE68A" />
        <ellipse cx="21" cy="9" rx="17" ry="8" fill="#78350F" />
        <rect x="4" y="7" width="6" height="18" rx="3" fill="#78350F" />
        <rect x="33" y="7" width="6" height="18" rx="3" fill="#78350F" />
        <circle cx="15" cy="17" r="2" fill="#111827" />
        <circle cx="27" cy="17" r="2" fill="#111827" />
        <path
          d="M15 23 Q21 28 27 23"
          stroke="#111827"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Arm reaching to book */}
        <line
          x1="34"
          y1="36"
          x2="65"
          y2="30"
          stroke="#FDE68A"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <rect x="13" y="72" width="7" height="18" rx="3" fill="#1E3A8A" />
        <rect x="22" y="72" width="7" height="18" rx="3" fill="#1E3A8A" />
        <rect x="11" y="88" width="11" height="5" rx="2" fill="#111827" />
        <rect x="20" y="88" width="11" height="5" rx="2" fill="#111827" />
      </g>

      {/* Ana - holding book from right */}
      <g transform="translate(280, 110)">
        <rect x="8" y="24" width="22" height="38" rx="4" fill="#EC4899" />
        <circle cx="19" cy="14" r="14" fill="#FDE68A" />
        <ellipse cx="19" cy="6" rx="14" ry="6" fill="#111827" />
        <circle cx="8" cy="4" r="6" fill="#111827" />
        <circle cx="30" cy="4" r="6" fill="#111827" />
        <circle cx="14" cy="13" r="1.5" fill="#111827" />
        <circle cx="24" cy="13" r="1.5" fill="#111827" />
        <path
          d="M14 18 Q19 22 24 18"
          stroke="#111827"
          strokeWidth="1"
          fill="none"
        />
        {/* Arm reaching to book */}
        <line
          x1="4"
          y1="30"
          x2="-22"
          y2="20"
          stroke="#FDE68A"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <rect x="11" y="62" width="6" height="16" rx="3" fill="#BE185D" />
        <rect x="19" y="62" width="6" height="16" rx="3" fill="#BE185D" />
      </g>

      {/* Ben - next to Ana */}
      <g transform="translate(340, 115)">
        <rect x="8" y="24" width="22" height="38" rx="4" fill="#10B981" />
        <circle cx="19" cy="14" r="14" fill="#FDE68A" />
        <ellipse cx="19" cy="6" rx="14" ry="6" fill="#92400E" />
        <circle cx="14" cy="13" r="1.5" fill="#111827" />
        <circle cx="24" cy="13" r="1.5" fill="#111827" />
        <path
          d="M14 18 Q19 22 24 18"
          stroke="#111827"
          strokeWidth="1"
          fill="none"
        />
        <line
          x1="4"
          y1="30"
          x2="-16"
          y2="22"
          stroke="#FDE68A"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <rect x="11" y="62" width="6" height="16" rx="3" fill="#065F46" />
        <rect x="19" y="62" width="6" height="16" rx="3" fill="#065F46" />
      </g>

      {/* Floor/ground */}
      <rect y="200" width="400" height="40" fill="#C4B5FD" />
      <line
        x1="0"
        y1="200"
        x2="400"
        y2="200"
        stroke="#8B5CF6"
        strokeWidth="2"
      />
    </svg>
  );
}

const illustrations: Record<number, () => React.JSX.Element> = {
  2: Page2Scene,
  3: Page3Scene,
  4: Page4Scene,
  5: Page5Scene,
  6: Page6Scene,
  7: Page7Scene,
  8: Page8Scene,
  9: Page9Scene,
  10: Page10Scene,
  11: Page11Scene,
  12: Page12Scene,
};

export default function ComicIllustration({
  pageNumber,
  className = "",
}: ComicIllustrationProps) {
  const Scene = illustrations[pageNumber];
  if (!Scene) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`w-full rounded-xl overflow-hidden border-3 border-gray-900 ${className}`}
      style={{ boxShadow: "3px 3px 0 #111827" }}
    >
      <Scene />
    </motion.div>
  );
}

export function CoverIllustration({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`w-full max-w-md mx-auto rounded-xl overflow-hidden border-3 border-gray-900 ${className}`}
      style={{ boxShadow: "4px 4px 0 #111827" }}
    >
      <CoverScene />
    </motion.div>
  );
}

export function EndIllustration({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`w-full max-w-md mx-auto rounded-xl overflow-hidden border-3 border-gray-900 ${className}`}
      style={{ boxShadow: "4px 4px 0 #111827" }}
    >
      <Page12Scene />
    </motion.div>
  );
}
