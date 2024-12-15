"use client";

import { motion } from "framer-motion";

const moodsList = [
  "All",
  "Happy",
  "Inspired",
  "Playful",
  "Calm",
  "Reflective",
  "Angry",
];
export const vibesList = [
  "All",
  "Chill",
  "Cozy",
  "Nostalgic",
  "Vibrant",
  "Energetic",
  "Romance",
];

export default function MoodFilter({
  selectedMood,
  setSelectedMood,
  selectedVibe,
  setSelectedVibe,
}: {
  selectedMood: string;
  setSelectedMood: (value: string) => void;
  selectedVibe: string;
  setSelectedVibe: (value: string) => void;
}) {
  return (
    <div className="mb-20 w-full">
      <div className="flex flex-wrap justify-center gap-4 mb-10 h-full">
        {moodsList.map((mood) => (
          <motion.button
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            key={mood}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedMood(mood)}
            className={`w-32 py-3 rounded-full border-primary ${
              selectedMood === mood
                ? "bg-purple-600 text-white"
                : "bg-white text-purple-600"
            }`}
          >
            {mood}
          </motion.button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {vibesList.map((vibe) => (
          <motion.button
            key={vibe}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedVibe(vibe)}
            className={`w-32 py-3 rounded-full border-primary ${
              selectedVibe === vibe
                ? "bg-pink-500 text-white"
                : "bg-white text-pink-500"
            }`}
          >
            {vibe}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
