import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Trash } from "lucide-react";

import Image from "next/image";
import {
  useActiveAccount,
  useConnect,
  useSendTransaction,
} from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { contract } from "@/lib/utils";
import { toast } from "react-toastify";
const moodColors: { [key: string]: string } = {
  Happy: "bg-[#FFD700]",
  Calm: "bg-[#87CEEB]",
  Playful: "bg-[#FFA500]",
  Inspired: "bg-[#9370DB]",
  Reflective: "bg-[#808080]",
  Angry: "bg-[#FF4500]",
};

type FeedCardProps = {
  data: {
    id: number;
    owner: string;
    content: string;
    mood: string;
    vibe: string;
    imageUrl: string;
    videoUrl: string;
    timestamp: bigint;
  };
};
function FeedCard({ data }: FeedCardProps) {
  const { isConnecting } = useConnect();
  const activeAccount = useActiveAccount();

  const { mutate: sendTransaction } = useSendTransaction();

  const handleDelete = (expressionId: string) => {
    const transaction = prepareContractCall({
      contract,
      method: "function deleteExpression(uint256 _expressionId)",
      params: [BigInt(expressionId)],
    });
    sendTransaction(transaction, {
      onSuccess: () => {
        toast.success("Post Deleted");
      },
      onError: (error) => {
        toast.error(error.message);
        console.error(error);
      },
    });
  };

  if (isConnecting) {
    return <p>Connect wallet</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={` ${moodColors[data?.mood as string]}
 rounded-lg shadow-lg p-6 border-primary justify-between flex flex-col space-y-4 break-inside-avoid h-fit mb-4`}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold">{data.mood}</span>
        <span className="text-sm font-semibold">{data.vibe}</span>
      </div>
      <div className="space-y-2">
        {data?.videoUrl && (
          <div className="aspect-video">
            <iframe
              width="100%"
              height="auto"
              src={data.videoUrl}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full aspect-video rounded-md bg-black/30"
            />
          </div>
        )}
        {data?.imageUrl && (
          <div className="rounded-xl overflow-hidden w-full h-fit">
            <Image
              src={data.imageUrl}
              alt="Feed Picture"
              width={200}
              height={200}
              className="w-full h-full"
              unoptimized
            />
          </div>
        )}
        <div className="space-y-1">
          <p>{data.content}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button className="text-gray-600 hover:text-red-500 transition-colors duration-200">
            <Heart size={20} />
          </button>
          <button className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
            <MessageCircle size={20} />
          </button>
        </div>
        {data?.owner == activeAccount?.address && (
          <button
            onClick={() => handleDelete(data.id.toString())}
            className="hover:text-destructive cursor-pointer text-gray-600"
          >
            <Trash size={20} />
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default FeedCard;
