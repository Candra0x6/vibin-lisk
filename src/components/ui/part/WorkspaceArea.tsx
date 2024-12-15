"use client";

import { Droppable, Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import { Plus, Type, Image, Video, ImageIcon } from "lucide-react";
import { ElementsData } from "@/app/expression/page";

export default function WorkspaceArea({
  elements,
  updateElement,
  addElement,
}: {
  elements: ElementsData[];
  updateElement: (id: string, content: string) => void;
  addElement: (type: string) => void;
}) {
  const isAlreadyVideo = elements.some((element) => element.type === "video");
  const isAlreadyImage = elements.some((element) => element.type === "image");

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Workspace</h2>
      <div className="flex space-x-4 mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => addElement("text")}
          className="flex items-center w-12 p-2 bg-[#BBF252] text-black rounded-md border-primary aspect-square"
        >
          <Type className="w-full h-full" />
        </motion.button>
        <motion.button
          disabled={isAlreadyImage}
          whileHover={{ scale: isAlreadyImage ? 1 : 1.05 }}
          whileTap={{ scale: isAlreadyImage ? 1 : 0.95 }}
          onClick={() => addElement("image")}
          className={`flex items-center w-12 p-2 text-black bg-[#87CEEB] ${
            isAlreadyImage ? "opacity-50" : "opacity-100"
          } border-primary rounded-md aspect-square`}
        >
          <ImageIcon className="w-full h-full" />
        </motion.button>
        <motion.button
          whileHover={{ scale: isAlreadyVideo ? 1 : 1.05 }}
          whileTap={{ scale: isAlreadyVideo ? 1 : 0.95 }}
          disabled={isAlreadyVideo}
          onClick={() => addElement("video")}
          className={`flex items-center w-12 p-2 bg-[#F7EB3E] ${
            isAlreadyVideo ? "opacity-50" : ""
          } text-black rounded-md aspect-square border-primary`}
        >
          <Video className="w-full h-full" />
        </motion.button>
      </div>
      <Droppable droppableId="workspace">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-h-[300px] border-2 border-dashed border-gray-300 p-4 rounded-md"
          >
            {elements.map((element, index) => (
              <Draggable
                key={element.id}
                draggableId={element.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-gray-100 p-4 mb-4 rounded-md"
                  >
                    {element.type === "text" && (
                      <textarea
                        value={element.content}
                        onChange={(e) =>
                          updateElement(element.id, e.target.value)
                        }
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter your text here"
                      />
                    )}
                    {element.type === "image" && (
                      <input
                        type="text"
                        value={element.content}
                        onChange={(e) =>
                          updateElement(element.id, e.target.value)
                        }
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter image URL"
                      />
                    )}
                    {element.type === "video" && (
                      <input
                        type="text"
                        value={element.content}
                        onChange={(e) =>
                          updateElement(element.id, e.target.value)
                        }
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter embedded YouTube video URL"
                      />
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
