"use client";

import { ElementsData } from "@/app/expression/page";
import { motion } from "framer-motion";
import Image from "next/image";

const moodColors: { [key: string]: string } = {
  Happy: "bg-[#FFD700]",
  Calm: "bg-[#87CEEB]",
  Playful: "bg-[#FFA500]",
  Inspired: "bg-[#9370DB]",
  Reflective: "bg-[#808080]",
  Angry: "bg-[#FF4500]",
};

export default function PostPreview({
  elements,
  mood,
  vibe,
}: {
  elements: ElementsData[];
  mood: string;
  vibe: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Post Preview</h2>
      <motion.div
        layout
        className={`${moodColors[mood]} p-6 rounded-lg shadow-md border-primary`}
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold">{mood}</span>
          <span className="text-sm font-semibold">{vibe}</span>
        </div>
        {elements.map((element) => (
          <motion.div
            key={element.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            {element.type === "text" && <p>{element.content}</p>}
            {element.type === "image" && (
              <Image
                src={element.content}
                width={200}
                height={200}
                alt="Feed Picture"
                className="w-full h-full rounded-md"
                unoptimized
              />
            )}
            {element.type === "video" && (
              <iframe
                width="100%"
                height="auto"
                src={element.content}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full aspect-video rounded-md bg-black/30"
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
