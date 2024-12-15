"use client";

import { motion } from "framer-motion";

const vibes = ["Chill", "Cozy", "Nostalgic", "Vibrant", "Energetic", "Romance"];
export default function VibeToggle({
  selectedVibe,
  setSelectedVibe,
}: {
  selectedVibe: string;
  setSelectedVibe: (value: string) => void;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Select Your Vibe</h2>
      <div className="grid grid-cols-3 gap-4">
        {vibes.map((vibe) => (
          <motion.button
            key={vibe}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedVibe(vibe)}
            className={`py-2 rounded-full text-sm font-semibold border-primary ${
              selectedVibe === vibe
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {vibe}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
