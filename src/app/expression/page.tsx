"use client";
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  DragDropContext,
  DropResult,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import MoodSelector from "@/components/ui/part/MoodSelector";
import VibeToggle from "@/components/ui/part/VibeToggle";
import WorkspaceArea from "@/components/ui/part/WorkspaceArea";
import PostPreview from "@/components/ui/part/PostPreview";
import PublishButton from "@/components/ui/part/PublishButton";

export type ElementsData = {
  id: string;
  type: string;
  content: string;
};
export default function ExperimentMode() {
  const [selectedMood, setSelectedMood] = useState("Happy");
  const [selectedVibe, setSelectedVibe] = useState("Energetic");
  const [elements, setElements] = useState<ElementsData[]>([]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newElements = Array.from(elements);
    const [reorderedItem] = newElements.splice(result.source.index, 1);
    newElements.splice(result.destination.index, 0, reorderedItem);

    setElements(newElements);
  };

  const addElement = (type: string) => {
    setElements([
      ...elements,
      { id: `element-${elements.length}`, type, content: "" },
    ]);
  };

  const updateElement = (id: string, content: string) => {
    setElements(elements.map((el) => (el.id === id ? { ...el, content } : el)));
  };

  const text = "Vibin.";
  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6 ">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-bold text-black text-center mb-8"
      >
        Create {""}
        {text.split("").map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            animate={{
              x: [0, 10, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: index * 0.1,
              },
            }}
            className="inline-block text-purple-900 "
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 gap-5">
        <div className="bg-white rounded-lg shadow-lg border-primary p-6">
          <MoodSelector
            selectedMood={selectedMood}
            setSelectedMood={setSelectedMood}
          />
          <VibeToggle
            selectedVibe={selectedVibe}
            setSelectedVibe={setSelectedVibe}
          />
          <DragDropContext onDragEnd={onDragEnd}>
            <WorkspaceArea
              elements={elements}
              updateElement={updateElement}
              addElement={addElement}
            />
          </DragDropContext>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border-primary">
          <PostPreview
            elements={elements}
            mood={selectedMood}
            vibe={selectedVibe}
          />
          <PublishButton
            elements={elements}
            mood={selectedMood}
            vibe={selectedVibe}
          />
        </div>
      </div>
    </div>
  );
}
