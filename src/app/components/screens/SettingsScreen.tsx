"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AppSettings, LearnerProfile } from "../../lib/types";
import InstallPrompt from "../InstallPrompt";

interface SettingsScreenProps {
  profile: LearnerProfile | null;
  settings: AppSettings;
  onSave: (settings: AppSettings) => void;
  onSaveName: (name: string) => void;
  onBack: () => void;
}

export default function SettingsScreen({
  profile,
  settings,
  onSave,
  onSaveName,
  onBack,
}: SettingsScreenProps) {
  const [local, setLocal] = useState<AppSettings>({ ...settings });
  const [name, setName] = useState(profile?.name ?? "");
  const [isEditingName, setIsEditingName] = useState(false);

  const update = (partial: Partial<AppSettings>) => {
    setLocal((prev) => ({ ...prev, ...partial }));
  };

  const handleSave = () => {
    if (name.trim()) {
      onSaveName(name);
    }
    onSave(local);
    onBack();
  };

  const handleNameAction = () => {
    if (!isEditingName) {
      setIsEditingName(true);
      return;
    }

    const trimmed = name.trim();
    if (!trimmed) return;
    onSaveName(trimmed);
    setName(trimmed);
    setIsEditingName(false);
  };

  return (
    <div className="app-shell min-h-dvh flex flex-col">
      {/* Header */}
      <header className="app-header py-3 px-4 sticky top-0 z-10 safe-top">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-sm cursor-pointer"
          >
            ←
          </motion.button>
          <h2 className="text-base font-extrabold text-gray-900">Settings</h2>
          <div className="w-9" />
        </div>
      </header>

      <div className="flex-1 px-4 py-4 max-w-lg mx-auto w-full space-y-4 pb-8">
        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="app-card p-5"
        >
          <h3 className="font-extrabold text-gray-900 mb-3 flex items-center gap-2">
            👤 Profile
          </h3>
          <div className="mb-2 flex items-center justify-between gap-2">
            <label className="block text-sm font-bold text-gray-700">
              Display Name
            </label>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleNameAction}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold min-h-8 cursor-pointer ${
                isEditingName
                  ? "bg-emerald-500 text-white"
                  : "bg-violet-100 text-violet-700"
              }`}
            >
              {isEditingName ? "Save Name" : "Edit Name"}
            </motion.button>
          </div>
          <input
            type="text"
            value={name}
            maxLength={32}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            disabled={!isEditingName}
            className="w-full rounded-xl border-2 border-violet-200 bg-white px-3 py-2.5 text-sm font-bold text-gray-800 outline-none focus:border-violet-400 disabled:bg-gray-100 disabled:text-gray-500"
          />
          <p className="mt-2 text-xs text-gray-500">
            Tap Edit Name to change your name, then tap Save Name.
          </p>
        </motion.div>

        {/* Audio */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="app-card p-5"
        >
          <h3 className="font-extrabold text-gray-900 mb-3 flex items-center gap-2">
            🔊 Sound
          </h3>
          <Toggle
            label="Audio Enabled"
            description="Play sounds and read words aloud"
            value={local.audioEnabled}
            onChange={(v) => update({ audioEnabled: v })}
          />
          <Toggle
            label="Auto-Read Pages"
            description="Automatically read comic dialog"
            value={local.autoRead}
            onChange={(v) => update({ autoRead: v })}
          />
          <div className="pt-2">
            <p className="text-sm font-bold text-gray-700 mb-2">
              Reading Speed
            </p>
            <div className="flex gap-2">
              {(["slow", "normal"] as const).map((speed) => (
                <motion.button
                  key={speed}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => update({ playbackSpeed: speed })}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm capitalize min-h-11 cursor-pointer transition-all ${
                    local.playbackSpeed === speed
                      ? "bg-linear-to-b from-violet-500 to-purple-600 text-white shadow-md shadow-violet-200"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {speed === "slow" ? "🐢 Slow" : "🐇 Normal"}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Display */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="app-card p-5"
        >
          <h3 className="font-extrabold text-gray-900 mb-3 flex items-center gap-2">
            📱 Display
          </h3>
          <div className="mb-4">
            <p className="text-sm font-bold text-gray-700 mb-2">Text Size</p>
            <div className="flex gap-2">
              {(["small", "medium", "large"] as const).map((size) => (
                <motion.button
                  key={size}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => update({ textSize: size })}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm capitalize min-h-11 cursor-pointer transition-all ${
                    local.textSize === size
                      ? "bg-linear-to-b from-violet-500 to-purple-600 text-white shadow-md shadow-violet-200"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700 mb-2">Theme</p>
            <div className="flex gap-2">
              {(["light", "dark"] as const).map((theme) => (
                <motion.button
                  key={theme}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => update({ theme })}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm min-h-11 cursor-pointer transition-all ${
                    local.theme === theme
                      ? "bg-linear-to-b from-violet-500 to-purple-600 text-white shadow-md shadow-violet-200"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {theme === "light" ? "☀️ Light" : "🌙 Dark"}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Install App */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="app-card p-5"
        >
          <h3 className="font-extrabold text-gray-900 mb-3 flex items-center gap-2">
            📲 Install and Offline Use
          </h3>
          <p className="text-xs text-gray-600 mb-3">
            Install the app so kids can keep reading comics and doing lessons
            even without internet.
          </p>
          <InstallPrompt variant="card" persistent />
        </motion.div>

        {/* Save */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="w-full py-3.5 rounded-2xl bg-linear-to-b from-violet-500 to-purple-600 text-white font-bold text-base shadow-lg shadow-violet-200 min-h-12 cursor-pointer"
        >
          Save Settings ✓
        </motion.button>
      </div>
    </div>
  );
}

function Toggle({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div>
        <p className="text-sm font-bold text-gray-800">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(!value)}
        className={`w-12 h-7 rounded-full flex items-center px-1 transition-colors cursor-pointer ${
          value ? "bg-violet-500" : "bg-gray-300"
        }`}
      >
        <motion.div
          animate={{ x: value ? 18 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-5 h-5 bg-white rounded-full shadow-md"
        />
      </motion.button>
    </div>
  );
}
