"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { ElementsData } from "@/app/expression/page";
import { useConnect, useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { contract } from "@/lib/utils";
import { toast } from "react-toastify";

export default function PublishButton({
  elements,
  mood,
  vibe,
}: {
  elements: ElementsData[];
  mood: string;
  vibe: string;
}) {
  const [isPublishing, setIsPublishing] = useState(false);
  const { isConnecting, connect } = useConnect();
  const { mutate: sendTransaction } = useSendTransaction();

  if (isConnecting) {
    <div className="">Waller Not Connected</div>;
  }

  const message =
    elements
      .filter((element: { type: string }) => element.type === "text")
      .map((element: { content: string }) => element.content)
      .join(" ") || "";

  const videoUrl =
    elements.find((el: { type: string }) => el.type === "video")?.content || "";
  const imageUrl =
    elements.find((el: { type: string }) => el.type === "image")?.content || "";

  const handlePublish = async () => {
    try {
      setIsPublishing(true);

      const transaction = prepareContractCall({
        contract,
        method:
          "function createExpression(string _content, string _mood, string _vibe, string _imageUrl, string _videoUrl) returns (uint256)",
        params: [message, mood, vibe, imageUrl, videoUrl],
      });

      sendTransaction(transaction, {
        onSuccess: () => {
          confetti();
          toast.success("Post Published");
        },
        onError: (error) => {
          toast.error(error.message);
          console.error(error);
        },
      });
    } catch (error) {
      toast.error("Error Publishing Post");
      console.error(error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full bg-purple-600 border-primary text-white font-bold py-3 px-6 rounded-full shadow-lg"
      disabled={isPublishing}
      onClick={handlePublish}
    >
      {isPublishing ? "Publishing..." : "Publish Post"}
    </motion.button>
  );
}
