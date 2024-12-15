import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { defineChain, getContract } from "thirdweb";
import { client } from "@/app/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const contract = getContract({
  client,
  chain: defineChain(4202),
  address: "0xA044C13610355e7EcE0D8ae82E97F46613688A2E",
});
