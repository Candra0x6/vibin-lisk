'use client'

import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useEffect } from 'react'

interface UserProgressProps {
  points: number
  showCelebration: boolean
}

export default function UserProgress({ points, showCelebration }: UserProgressProps) {
  useEffect(() => {
    if (showCelebration) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [showCelebration])

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
      <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-green-400 to-blue-500 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${(points / 2000) * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-sm font-semibold">0 points</span>
        <span className="text-sm font-semibold">2000 points</span>
      </div>
      <p className="text-center mt-4 font-bold text-xl">{points} points</p>
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center text-2xl font-bold text-green-600 mt-4"
          >
            🎉 Challenge Completed! 🎉
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

