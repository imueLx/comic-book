"use client";

import { motion } from "framer-motion";

type SceneType =
  | "classroom"
  | "classroom-board"
  | "reading"
  | "practice"
  | "quiz"
  | "happy"
  | "celebration"
  | "cover";

interface SceneIllustrationProps {
  scene: string;
  className?: string;
}

function ClassroomScene() {
  return (
    <svg viewBox="0 0 400 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sky / wall */}
      <rect width="400" height="140" rx="8" fill="#EFF6FF" />
      {/* Floor */}
      <rect y="100" width="400" height="40" rx="0" fill="#FEF3C7" />
      <line
        x1="0"
        y1="100"
        x2="400"
        y2="100"
        stroke="#D97706"
        strokeWidth="2"
        strokeDasharray="8 4"
      />

      {/* Blackboard */}
      <rect
        x="120"
        y="12"
        width="160"
        height="72"
        rx="6"
        fill="#1E3A5F"
        stroke="#111827"
        strokeWidth="3"
      />
      <rect x="130" y="20" width="140" height="56" rx="3" fill="#234E6F" />
      <text
        x="200"
        y="46"
        textAnchor="middle"
        fill="#86EFAC"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="16"
        fontWeight="bold"
      >
        ABC
      </text>
      <text
        x="200"
        y="66"
        textAnchor="middle"
        fill="#FDE68A"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="12"
      >
        cat · bat · hat
      </text>
      {/* Board ledge */}
      <rect x="115" y="82" width="170" height="6" rx="2" fill="#92400E" />
      {/* Chalk pieces */}
      <rect x="140" y="83" width="12" height="4" rx="1" fill="#FFFFFF" />
      <rect x="160" y="83" width="10" height="4" rx="1" fill="#FDE68A" />

      {/* Desk left */}
      <rect
        x="30"
        y="90"
        width="60"
        height="8"
        rx="2"
        fill="#D97706"
        stroke="#92400E"
        strokeWidth="1.5"
      />
      <rect x="35" y="98" width="4" height="20" fill="#92400E" />
      <rect x="81" y="98" width="4" height="20" fill="#92400E" />
      {/* Book on desk */}
      <rect
        x="42"
        y="82"
        width="18"
        height="12"
        rx="2"
        fill="#F472B6"
        stroke="#BE185D"
        strokeWidth="1"
      />
      <line x1="51" y1="82" x2="51" y2="94" stroke="#BE185D" strokeWidth="1" />

      {/* Desk right */}
      <rect
        x="310"
        y="90"
        width="60"
        height="8"
        rx="2"
        fill="#D97706"
        stroke="#92400E"
        strokeWidth="1.5"
      />
      <rect x="315" y="98" width="4" height="20" fill="#92400E" />
      <rect x="361" y="98" width="4" height="20" fill="#92400E" />
      {/* Pencil on desk */}
      <line
        x1="325"
        y1="85"
        x2="350"
        y2="82"
        stroke="#F59E0B"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="325" cy="85" r="2" fill="#111827" />

      {/* Window */}
      <rect
        x="20"
        y="15"
        width="40"
        height="50"
        rx="4"
        fill="#BFDBFE"
        stroke="#111827"
        strokeWidth="2"
      />
      <line
        x1="40"
        y1="15"
        x2="40"
        y2="65"
        stroke="#111827"
        strokeWidth="1.5"
      />
      <line
        x1="20"
        y1="40"
        x2="60"
        y2="40"
        stroke="#111827"
        strokeWidth="1.5"
      />
      {/* Sun through window */}
      <circle cx="35" cy="28" r="8" fill="#FCD34D" />

      {/* Clock */}
      <circle
        cx="340"
        cy="30"
        r="16"
        fill="#FFFFFF"
        stroke="#111827"
        strokeWidth="2"
      />
      <line
        x1="340"
        y1="30"
        x2="340"
        y2="20"
        stroke="#111827"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="340"
        y1="30"
        x2="348"
        y2="34"
        stroke="#EF4444"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Stars / sparkles */}
      <text x="300" y="55" fontSize="14">
        ✨
      </text>
      <text x="100" y="35" fontSize="12">
        ⭐
      </text>
    </svg>
  );
}

function ReadingScene() {
  return (
    <svg viewBox="0 0 400 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cozy background */}
      <rect width="400" height="140" rx="8" fill="#FFF7ED" />
      {/* Rug */}
      <ellipse
        cx="200"
        cy="120"
        rx="160"
        ry="25"
        fill="#FECACA"
        stroke="#EF4444"
        strokeWidth="1.5"
        strokeDasharray="6 3"
      />

      {/* Bookshelf */}
      <rect
        x="20"
        y="10"
        width="100"
        height="90"
        rx="4"
        fill="#92400E"
        stroke="#78350F"
        strokeWidth="2"
      />
      {/* Shelf 1 */}
      <rect x="24" y="14" width="92" height="26" fill="#78350F" />
      <rect x="28" y="16" width="10" height="22" rx="1" fill="#EF4444" />
      <rect x="40" y="18" width="10" height="20" rx="1" fill="#3B82F6" />
      <rect x="52" y="15" width="10" height="23" rx="1" fill="#10B981" />
      <rect x="64" y="17" width="10" height="21" rx="1" fill="#F59E0B" />
      <rect x="76" y="16" width="12" height="22" rx="1" fill="#8B5CF6" />
      <rect x="90" y="18" width="10" height="20" rx="1" fill="#EC4899" />
      {/* Shelf 2 */}
      <rect x="24" y="44" width="92" height="26" fill="#78350F" />
      <rect x="28" y="46" width="12" height="22" rx="1" fill="#06B6D4" />
      <rect x="42" y="48" width="10" height="20" rx="1" fill="#F97316" />
      <rect x="54" y="46" width="10" height="22" rx="1" fill="#A855F7" />
      <rect x="66" y="47" width="14" height="21" rx="1" fill="#22C55E" />
      <rect x="82" y="46" width="10" height="22" rx="1" fill="#E11D48" />
      {/* Shelf 3 */}
      <rect x="24" y="74" width="92" height="26" fill="#78350F" />
      <rect x="28" y="76" width="10" height="22" rx="1" fill="#FBBF24" />
      <rect x="40" y="78" width="12" height="20" rx="1" fill="#7C3AED" />

      {/* Open book (center) */}
      <g transform="translate(170, 60)">
        <path
          d="M0 10 Q30 -5 60 10 L60 55 Q30 42 0 55 Z"
          fill="#FFFFFF"
          stroke="#111827"
          strokeWidth="2"
        />
        <path
          d="M60 10 Q90 -5 120 10 L120 55 Q90 42 60 55 Z"
          fill="#FFFBEB"
          stroke="#111827"
          strokeWidth="2"
        />
        <line
          x1="60"
          y1="10"
          x2="60"
          y2="55"
          stroke="#111827"
          strokeWidth="1.5"
        />
        {/* Text lines */}
        <line
          x1="10"
          y1="22"
          x2="50"
          y2="20"
          stroke="#CBD5E1"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="10"
          y1="32"
          x2="45"
          y2="30"
          stroke="#CBD5E1"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="10"
          y1="42"
          x2="48"
          y2="40"
          stroke="#CBD5E1"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="70"
          y1="20"
          x2="110"
          y2="22"
          stroke="#CBD5E1"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="70"
          y1="30"
          x2="105"
          y2="32"
          stroke="#CBD5E1"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Lamp */}
      <rect x="330" y="30" width="6" height="60" rx="2" fill="#D97706" />
      <path
        d="M310 15 Q340 5 365 15 L355 35 L320 35 Z"
        fill="#FDE68A"
        stroke="#F59E0B"
        strokeWidth="1.5"
      />
      <circle cx="340" cy="28" r="5" fill="#FEF08A" opacity="0.7" />

      {/* Reading emojis */}
      <text x="145" y="50" fontSize="20">
        📖
      </text>
      <text x="320" y="100" fontSize="14">
        💡
      </text>
      <text x="140" y="130" fontSize="12">
        📚
      </text>
    </svg>
  );
}

function PracticeScene() {
  return (
    <svg viewBox="0 0 400 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="400" height="140" rx="8" fill="#ECFDF5" />

      {/* Notebook */}
      <g transform="translate(40, 15)">
        <rect
          width="120"
          height="100"
          rx="4"
          fill="#FFFFFF"
          stroke="#111827"
          strokeWidth="2"
        />
        <rect x="-4" y="0" width="8" height="100" rx="2" fill="#EF4444" />
        {/* Spiral */}
        {[12, 28, 44, 60, 76, 92].map((y) => (
          <circle
            key={y}
            cx="-0"
            cy={y}
            r="4"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="1.5"
          />
        ))}
        {/* Lines */}
        <line
          x1="20"
          y1="20"
          x2="110"
          y2="20"
          stroke="#BFDBFE"
          strokeWidth="1"
        />
        <line
          x1="20"
          y1="35"
          x2="110"
          y2="35"
          stroke="#BFDBFE"
          strokeWidth="1"
        />
        <line
          x1="20"
          y1="50"
          x2="110"
          y2="50"
          stroke="#BFDBFE"
          strokeWidth="1"
        />
        <line
          x1="20"
          y1="65"
          x2="110"
          y2="65"
          stroke="#BFDBFE"
          strokeWidth="1"
        />
        <line
          x1="20"
          y1="80"
          x2="110"
          y2="80"
          stroke="#BFDBFE"
          strokeWidth="1"
        />
        {/* Written words */}
        <text
          x="25"
          y="32"
          fill="#4B5563"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="11"
        >
          c-a-t = cat ✓
        </text>
        <text
          x="25"
          y="47"
          fill="#4B5563"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="11"
        >
          b-a-t = bat ✓
        </text>
        <text
          x="25"
          y="62"
          fill="#10B981"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="11"
          fontWeight="bold"
        >
          h-a-t = hat ✓
        </text>
        <text
          x="25"
          y="77"
          fill="#D97706"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="11"
        >
          m-a-t = ?
        </text>
      </g>

      {/* Pencil */}
      <g transform="translate(200, 30) rotate(25)">
        <rect
          x="0"
          y="0"
          width="80"
          height="10"
          rx="1"
          fill="#FCD34D"
          stroke="#F59E0B"
          strokeWidth="1"
        />
        <polygon
          points="80,0 80,10 92,5"
          fill="#FDBA74"
          stroke="#F59E0B"
          strokeWidth="1"
        />
        <circle cx="88" cy="5" r="1.5" fill="#111827" />
        <rect x="-8" y="1" width="10" height="8" rx="1" fill="#F472B6" />
      </g>

      {/* Eraser */}
      <rect
        x="310"
        y="85"
        width="40"
        height="20"
        rx="4"
        fill="#F9A8D4"
        stroke="#EC4899"
        strokeWidth="1.5"
      />
      <text
        x="318"
        y="99"
        fill="#FFFFFF"
        fontFamily="var(--font-comic), sans-serif"
        fontSize="8"
        fontWeight="bold"
      >
        ERASE
      </text>

      {/* Star stickers */}
      <text x="270" y="45" fontSize="22">
        ⭐
      </text>
      <text x="300" y="65" fontSize="16">
        🌟
      </text>
      <text x="330" y="35" fontSize="18">
        ✨
      </text>

      {/* Ruler */}
      <rect
        x="250"
        y="100"
        width="100"
        height="14"
        rx="2"
        fill="#60A5FA"
        stroke="#2563EB"
        strokeWidth="1"
      />
      {[260, 270, 280, 290, 300, 310, 320, 330, 340].map((x, i) => (
        <line
          key={x}
          x1={x}
          y1="100"
          x2={x}
          y2={i % 2 === 0 ? "110" : "106"}
          stroke="#FFFFFF"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

function QuizScene() {
  return (
    <svg viewBox="0 0 400 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="400" height="140" rx="8" fill="#EFF6FF" />

      {/* Big question mark */}
      <g transform="translate(30, 10)">
        <circle
          cx="45"
          cy="55"
          r="45"
          fill="#DBEAFE"
          stroke="#3B82F6"
          strokeWidth="2"
        />
        <text
          x="45"
          y="72"
          textAnchor="middle"
          fill="#2563EB"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="50"
          fontWeight="bold"
        >
          ?
        </text>
      </g>

      {/* Answer cards */}
      <g transform="translate(140, 15)">
        <rect
          width="70"
          height="45"
          rx="8"
          fill="#FFFFFF"
          stroke="#10B981"
          strokeWidth="2.5"
        />
        <text
          x="35"
          y="30"
          textAnchor="middle"
          fill="#065F46"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="14"
          fontWeight="bold"
        >
          cat
        </text>
        <text x="60" y="14" fontSize="12">
          ✅
        </text>
      </g>
      <g transform="translate(220, 20)">
        <rect
          width="70"
          height="45"
          rx="8"
          fill="#FFFFFF"
          stroke="#F59E0B"
          strokeWidth="2.5"
        />
        <text
          x="35"
          y="30"
          textAnchor="middle"
          fill="#92400E"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="14"
          fontWeight="bold"
        >
          bat
        </text>
      </g>
      <g transform="translate(300, 15)">
        <rect
          width="70"
          height="45"
          rx="8"
          fill="#FFFFFF"
          stroke="#EF4444"
          strokeWidth="2.5"
        />
        <text
          x="35"
          y="30"
          textAnchor="middle"
          fill="#991B1B"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="14"
          fontWeight="bold"
        >
          hat
        </text>
      </g>

      {/* Thinking bubble */}
      <g transform="translate(140, 75)">
        <ellipse
          cx="100"
          cy="25"
          rx="90"
          ry="28"
          fill="#FEF9C3"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        <text
          x="100"
          y="32"
          textAnchor="middle"
          fill="#92400E"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="12"
        >
          The ___ sat on the mat!
        </text>
        <circle
          cx="20"
          cy="55"
          r="6"
          fill="#FEF9C3"
          stroke="#F59E0B"
          strokeWidth="1.5"
        />
        <circle
          cx="10"
          cy="65"
          r="3.5"
          fill="#FEF9C3"
          stroke="#F59E0B"
          strokeWidth="1.5"
        />
      </g>

      {/* Trophy */}
      <text x="350" y="110" fontSize="24">
        🏆
      </text>
      <text x="30" y="130" fontSize="14">
        🧩
      </text>
    </svg>
  );
}

function CelebrationScene() {
  return (
    <svg viewBox="0 0 400 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="400" height="140" rx="8" fill="#FEF9C3" />

      {/* Confetti */}
      {[
        { x: 30, y: 20, color: "#EF4444", r: -20 },
        { x: 80, y: 45, color: "#3B82F6", r: 15 },
        { x: 130, y: 15, color: "#10B981", r: -35 },
        { x: 200, y: 30, color: "#F59E0B", r: 25 },
        { x: 250, y: 10, color: "#8B5CF6", r: -10 },
        { x: 300, y: 40, color: "#EC4899", r: 30 },
        { x: 350, y: 20, color: "#06B6D4", r: -25 },
        { x: 370, y: 55, color: "#EF4444", r: 20 },
        { x: 60, y: 70, color: "#F59E0B", r: -15 },
        { x: 160, y: 55, color: "#10B981", r: 40 },
        { x: 280, y: 65, color: "#8B5CF6", r: -30 },
        { x: 340, y: 75, color: "#EC4899", r: 12 },
      ].map((c, i) => (
        <rect
          key={i}
          x={c.x}
          y={c.y}
          width="8"
          height="16"
          rx="2"
          fill={c.color}
          transform={`rotate(${c.r} ${c.x + 4} ${c.y + 8})`}
          opacity="0.8"
        />
      ))}

      {/* Trophy */}
      <g transform="translate(155, 30)">
        <rect x="25" y="60" width="40" height="8" rx="3" fill="#D97706" />
        <rect x="33" y="50" width="24" height="14" rx="2" fill="#F59E0B" />
        <path
          d="M20 10 Q20 0 35 0 L55 0 Q70 0 70 10 L65 35 Q60 50 45 50 Q30 50 25 35 Z"
          fill="#FCD34D"
          stroke="#D97706"
          strokeWidth="2"
        />
        <path
          d="M20 12 Q10 12 12 25 Q14 35 24 33"
          fill="none"
          stroke="#D97706"
          strokeWidth="2"
        />
        <path
          d="M70 12 Q80 12 78 25 Q76 35 66 33"
          fill="none"
          stroke="#D97706"
          strokeWidth="2"
        />
        <text
          x="45"
          y="30"
          textAnchor="middle"
          fill="#92400E"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="14"
          fontWeight="bold"
        >
          #1
        </text>
      </g>

      {/* Stars */}
      <text x="50" y="110" fontSize="22">
        ⭐
      </text>
      <text x="120" y="120" fontSize="18">
        🌟
      </text>
      <text x="260" y="115" fontSize="20">
        🎉
      </text>
      <text x="330" y="120" fontSize="22">
        🎊
      </text>

      {/* Banner */}
      <g transform="translate(50, 90)">
        <polygon
          points="0,0 15,-10 300,-10 315,0 300,10 15,10"
          fill="#EF4444"
          stroke="#991B1B"
          strokeWidth="1.5"
        />
        <text
          x="157"
          y="5"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="var(--font-comic), sans-serif"
          fontSize="13"
          fontWeight="bold"
        >
          GREAT JOB, READER!
        </text>
      </g>
    </svg>
  );
}

function CoverIllustration() {
  return (
    <svg viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Rainbow arch */}
      {[
        { r: 95, color: "#EF4444" },
        { r: 87, color: "#F97316" },
        { r: 79, color: "#FCD34D" },
        { r: 71, color: "#10B981" },
        { r: 63, color: "#3B82F6" },
        { r: 55, color: "#8B5CF6" },
      ].map((arc, i) => (
        <path
          key={i}
          d={`M ${200 - arc.r} 110 A ${arc.r} ${arc.r} 0 0 1 ${200 + arc.r} 110`}
          fill="none"
          stroke={arc.color}
          strokeWidth="7"
          opacity="0.5"
        />
      ))}

      {/* Floating books */}
      <g transform="translate(30, 50) rotate(-10)">
        <rect
          width="30"
          height="40"
          rx="3"
          fill="#EF4444"
          stroke="#991B1B"
          strokeWidth="1.5"
        />
        <line x1="5" y1="0" x2="5" y2="40" stroke="#991B1B" strokeWidth="1" />
        <text
          x="18"
          y="25"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="8"
          fontWeight="bold"
        >
          ABC
        </text>
      </g>
      <g transform="translate(340, 40) rotate(8)">
        <rect
          width="30"
          height="40"
          rx="3"
          fill="#3B82F6"
          stroke="#1D4ED8"
          strokeWidth="1.5"
        />
        <line x1="5" y1="0" x2="5" y2="40" stroke="#1D4ED8" strokeWidth="1" />
        <text
          x="18"
          y="25"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="8"
          fontWeight="bold"
        >
          123
        </text>
      </g>

      {/* Clouds */}
      <g transform="translate(80, 10)">
        <ellipse cx="20" cy="15" rx="20" ry="12" fill="#FFFFFF" opacity="0.7" />
        <ellipse cx="38" cy="12" rx="16" ry="10" fill="#FFFFFF" opacity="0.7" />
        <ellipse cx="10" cy="12" rx="12" ry="8" fill="#FFFFFF" opacity="0.7" />
      </g>
      <g transform="translate(260, 5)">
        <ellipse
          cx="20"
          cy="15"
          rx="22"
          ry="13"
          fill="#FFFFFF"
          opacity="0.65"
        />
        <ellipse
          cx="40"
          cy="12"
          rx="18"
          ry="10"
          fill="#FFFFFF"
          opacity="0.65"
        />
      </g>

      {/* Stars */}
      <text x="160" y="30" fontSize="16">
        ✨
      </text>
      <text x="220" y="25" fontSize="14">
        ⭐
      </text>
      <text x="140" y="100" fontSize="12">
        💫
      </text>
      <text x="250" y="95" fontSize="14">
        🌟
      </text>
    </svg>
  );
}

const sceneComponents: Record<SceneType, () => React.JSX.Element> = {
  classroom: ClassroomScene,
  "classroom-board": ClassroomScene,
  reading: ReadingScene,
  practice: PracticeScene,
  quiz: QuizScene,
  happy: CelebrationScene,
  celebration: CelebrationScene,
  cover: CoverIllustration,
};

export default function SceneIllustration({
  scene,
  className = "",
}: SceneIllustrationProps) {
  const SceneComponent = sceneComponents[scene as SceneType] || ClassroomScene;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={`scene-illustration ${className}`}
    >
      <SceneComponent />
    </motion.div>
  );
}

export function CoverSceneIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="scene-illustration scene-illustration-lg"
    >
      <CoverIllustration />
    </motion.div>
  );
}

export function CelebrationIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="scene-illustration scene-illustration-lg"
    >
      <CelebrationScene />
    </motion.div>
  );
}
