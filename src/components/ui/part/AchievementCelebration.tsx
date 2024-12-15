"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import React from "react";
interface AchievementCelebrationProps {
  onClose: () => void;
}

export default function AchievementCelebration({
  onClose,
}: AchievementCelebrationProps) {
  const confettiRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (confettiRef.current) {
      const myConfetti = confetti.create(confettiRef.current, {
        resize: true,
        useWorker: true,
      });

      myConfetti({
        particleCount: 100,
        spread: 160,
        origin: { y: 0.6 },
      });

      const timeout = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <canvas ref={confettiRef} className="fixed inset-0 w-full h-full" />
      <motion.div
        className="bg-white p-8 rounded-lg shadow-xl text-center"
        initial={{ scale: 0.8, y: -50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <h2 className="text-3xl font-bold mb-4">Achievement Unlocked!</h2>
        <p className="text-xl mb-4">
          Congratulations on your amazing accomplishment!
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}
