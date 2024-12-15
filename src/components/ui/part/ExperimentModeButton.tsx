"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ExperimentModeButton() {
  const router = useRouter();
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        y: [0, -10, 0],
        transition: {
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        },
      }}
      onClick={() => router.push("/expression")}
      className="fixed bottom-8 right-8 bg-yellow-400 border-primary text-purple-800 font-bold py-3 px-6 rounded-full shadow-lg flex items-center"
    >
      <Zap className="mr-2" />
      Lets Vibin
    </motion.button>
  );
}
