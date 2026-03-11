"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ProfileScreenProps {
  onCreateProfile: (name: string, avatar: string) => void;
}

const avatars = ["👧", "👦", "👩", "🧑", "👶", "🧒", "👱", "🧔"];

export default function ProfileScreen({ onCreateProfile }: ProfileScreenProps) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(avatars[0]);

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (trimmed.length > 0) {
      onCreateProfile(trimmed, avatar);
    }
  };

  return (
    <div className="app-shell min-h-dvh flex flex-col items-center justify-center px-5 py-8 safe-top safe-bottom">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="app-card p-6 sm:p-8 max-w-sm w-full"
      >
        {/* Selected avatar big preview */}
        <motion.div
          key={avatar}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 mx-auto mb-4 rounded-full bg-linear-to-br from-violet-100 to-purple-100 flex items-center justify-center border-4 border-violet-200 shadow-lg"
        >
          <span className="text-4xl">{avatar}</span>
        </motion.div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-1">
          Who&apos;s Reading?
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm font-medium">
          Pick your avatar and name
        </p>

        {/* Avatar grid */}
        <div className="grid grid-cols-4 gap-2.5 mb-6">
          {avatars.map((a) => (
            <motion.button
              key={a}
              whileTap={{ scale: 0.85 }}
              onClick={() => setAvatar(a)}
              className={`aspect-square text-2xl sm:text-3xl rounded-2xl flex items-center justify-center transition-all min-h-[52px] cursor-pointer ${
                avatar === a
                  ? "bg-violet-100 ring-3 ring-violet-400 scale-105 shadow-md"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              {a}
            </motion.button>
          ))}
        </div>

        {/* Name input */}
        <label className="block mb-1.5 text-sm font-bold text-gray-700">
          Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, 20))}
          placeholder="Type your name..."
          maxLength={20}
          className="w-full p-3.5 rounded-2xl border-2 border-gray-200 text-lg font-bold text-gray-900 focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100 mb-6 bg-gray-50 placeholder:text-gray-400 transition-all"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={name.trim().length === 0}
          className="w-full py-3.5 rounded-2xl primary-btn font-extrabold text-lg min-h-[52px] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Start Reading! ✨
        </motion.button>
      </motion.div>
    </div>
  );
}
