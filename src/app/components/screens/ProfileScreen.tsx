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
    <div className="min-h-dvh bg-linear-to-b from-lavender to-mint flex flex-col items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 rounded-3xl p-6 sm:p-8 shadow-xl border-3 border-purple-300 max-w-sm w-full"
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold text-purple-800 text-center mb-2">
          Who&apos;s Reading? 📚
        </h2>
        <p className="text-center text-purple-600 mb-6 text-sm">
          Create your learner profile
        </p>

        {/* Avatar picker */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {avatars.map((a) => (
            <motion.button
              key={a}
              whileTap={{ scale: 0.9 }}
              onClick={() => setAvatar(a)}
              className={`w-14 h-14 text-3xl rounded-full flex items-center justify-center border-3 transition-all min-h-12 cursor-pointer ${
                avatar === a
                  ? "border-purple-600 bg-purple-100 scale-110"
                  : "border-gray-200 bg-white"
              }`}
            >
              {a}
            </motion.button>
          ))}
        </div>

        {/* Name input */}
        <label className="block mb-1 text-sm font-bold text-purple-700">
          Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, 20))}
          placeholder="Type your name..."
          maxLength={20}
          className="w-full p-3 rounded-xl border-2 border-purple-300 text-lg font-bold text-purple-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 mb-6 bg-white"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={name.trim().length === 0}
          className="w-full py-3 rounded-full bg-green-500 text-white font-bold text-xl shadow-lg min-h-13 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Start Reading! ✨
        </motion.button>
      </motion.div>
    </div>
  );
}
