"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import MoodFilter from "./part/MoodFilter";
import Feed from "./part/Feed";
import ExperimentModeButton from "./part/ExperimentModeButton";

export default function HeroSection() {
  const [selectedMood, setSelectedMood] = useState("All");
  const [selectedVibe, setSelectedVibe] = useState("All");
  const text = "Vibin.";

  return (
    <main className="min-h-screen bg-[#fffbf4]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold text-black text-center mb-8"
        >
          Welcome to{" "}
          {text.split("").map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              animate={{
                x: [0, 10, 0],
                y: [0, -5, 0],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: index * 0.1,
                },
              }}
              className="inline-block text-purple-900"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <MoodFilter
          selectedMood={selectedMood}
          setSelectedMood={setSelectedMood}
          selectedVibe={selectedVibe}
          setSelectedVibe={setSelectedVibe}
        />
        <Feed selectedMood={selectedMood} selectedVibe={selectedVibe} />
        <ExperimentModeButton />
      </div>
    </main>
  );
}
