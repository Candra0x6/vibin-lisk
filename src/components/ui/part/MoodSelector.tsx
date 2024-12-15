"use client";

import { motion } from "framer-motion";

const moods = ["Happy", "Inspired", "Playful", "Calm", "Reflective", "Angry"];

export default function MoodSelector({
  selectedMood,
  setSelectedMood,
}: {
  selectedMood: string;
  setSelectedMood: (value: string) => void;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Select Your Mood</h2>
      <div className="grid grid-cols-3 gap-4">
        {moods.map((mood) => (
          <motion.button
            key={mood}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedMood(mood)}
            className={`py-2 rounded-full text-sm font-semibold border-primary ${
              selectedMood === mood
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {mood}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
