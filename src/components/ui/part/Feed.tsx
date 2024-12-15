"use client";

import FeedCard from "../cards/FeedCard";
import { useReadContract } from "thirdweb/react";
import { defineChain, getContract } from "thirdweb";
import { contract } from "@/app/client";
import { useEffect, useState } from "react";
export default function Feed({
  selectedMood,
  selectedVibe,
}: {
  selectedMood: string;
  selectedVibe: string;
}) {
  const { data: feedData, isPending } = useReadContract({
    contract,
    method:
      "function getAllExpressions() view returns ((address owner, string content, string mood, string vibe, string imageUrl, string videoUrl, uint256 timestamp)[])",
    params: [],
  });
  const { data } = useReadContract({
    contract,
    method:
      "function getUserExpressions() view returns ((address owner, string content, string mood, string vibe, string imageUrl, string videoUrl, uint256 timestamp)[])",
    params: [],
  });

  const filteredData = feedData?.filter(
    (post) =>
      (selectedMood === "All" || post?.mood === selectedMood) &&
      (selectedVibe === "All" || post?.vibe === selectedVibe)
  );
  return (
    <div className="columns-2 md:columns-2 lg:columns-3 ">
      {isPending && <div>Loading...</div>}
      {filteredData?.map((post, i) => (
        <FeedCard key={i} data={{ ...post, id: i }} />
      ))}
    </div>
  );
}
