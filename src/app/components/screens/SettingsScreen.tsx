"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AppSettings } from "../../lib/types";

interface SettingsScreenProps {
  settings: AppSettings;
  onSave: (settings: AppSettings) => void;
  onBack: () => void;
}

export default function SettingsScreen({
  settings,
  onSave,
  onBack,
}: SettingsScreenProps) {
  const [local, setLocal] = useState<AppSettings>({ ...settings });

  const update = (partial: Partial<AppSettings>) => {
    setLocal((prev) => ({ ...prev, ...partial }));
  };

  const handleSave = () => {
    onSave(local);
    onBack();
  };

  return (
    <div className="min-h-dvh bg-linear-to-b from-lavender to-white flex flex-col">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-sm border-b-2 border-purple-300 py-2 px-3 sticky top-0 z-10 safe-top">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="text-sm font-bold text-purple-600 min-h-9 cursor-pointer"
          >
            ← Back
          </motion.button>
          <h2 className="text-base font-extrabold text-purple-800">
            Settings ⚙️
          </h2>
          <div className="w-12" />
        </div>
      </header>

      <div className="flex-1 px-3 py-4 max-w-lg mx-auto w-full space-y-4">
        {/* Audio */}
        <div className="bg-white/90 rounded-2xl p-4 shadow-md border-2 border-purple-200">
          <h3 className="font-extrabold text-purple-800 mb-3">🔊 Sound</h3>
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
        </div>

        {/* Display */}
        <div className="bg-white/90 rounded-2xl p-4 shadow-md border-2 border-purple-200">
          <h3 className="font-extrabold text-purple-800 mb-3">📱 Display</h3>
          <div className="mb-3">
            <p className="text-sm font-bold text-purple-700 mb-2">Text Size</p>
            <div className="flex gap-2">
              {(["small", "medium", "large"] as const).map((size) => (
                <motion.button
                  key={size}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => update({ textSize: size })}
                  className={`flex-1 py-2 rounded-xl font-bold text-sm border-2 capitalize min-h-11 cursor-pointer ${
                    local.textSize === size
                      ? "bg-purple-500 text-white border-purple-600"
                      : "bg-white text-purple-700 border-purple-200"
                  }`}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-purple-700 mb-2">Theme</p>
            <div className="flex gap-2">
              {(["light", "dark"] as const).map((theme) => (
                <motion.button
                  key={theme}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => update({ theme })}
                  className={`flex-1 py-2 rounded-xl font-bold text-sm border-2 min-h-11 cursor-pointer ${
                    local.theme === theme
                      ? "bg-purple-500 text-white border-purple-600"
                      : "bg-white text-purple-700 border-purple-200"
                  }`}
                >
                  {theme === "light" ? "Light" : "Dark"}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Save */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="w-full py-3 rounded-full bg-green-500 text-white font-bold text-lg shadow-lg min-h-12 cursor-pointer"
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
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-bold text-purple-700">{label}</p>
        <p className="text-xs text-purple-400">{description}</p>
      </div>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(!value)}
        className={`w-12 h-7 rounded-full flex items-center px-1 transition-colors cursor-pointer ${
          value ? "bg-green-400" : "bg-gray-300"
        }`}
      >
        <motion.div
          animate={{ x: value ? 18 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-5 h-5 bg-white rounded-full shadow"
        />
      </motion.button>
    </div>
  );
}
