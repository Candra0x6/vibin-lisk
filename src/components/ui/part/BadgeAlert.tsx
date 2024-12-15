'use client'

import { motion } from 'framer-motion'
import { FaMedal } from 'react-icons/fa'

interface BadgeAlertProps {
  badge: string
  onClose: () => void
}

export default function BadgeAlert({ badge, onClose }: BadgeAlertProps) {
  return (
    <motion.div
      className="fixed top-4 right-4 bg-yellow-400 text-yellow-900 p-4 rounded-lg shadow-lg z-50"
      initial={{ opacity: 0, scale: 0.8, y: -50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -50 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <div className="flex items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <FaMedal className="text-4xl mr-3" />
        </motion.div>
        <div>
          <h3 className="font-bold text-lg">New Badge Earned!</h3>
          <p>{badge}</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="absolute top-1 right-1 text-yellow-800 hover:text-yellow-900"
      >
        &times;
      </button>
    </motion.div>
  )
}

