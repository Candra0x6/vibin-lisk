"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, User, Bell, Compass, Award, Zap, Wallet } from "lucide-react";
import { ConnectButton } from "thirdweb/react";
import { defineChain, getContract } from "thirdweb";
import { client } from "@/app/client";

const menuItems = [
  { name: "Home", icon: Home },
  { name: "Profile", icon: User },
  { name: "Notifications", icon: Bell },
  { name: "Explore", icon: Compass },
  { name: "Challenges", icon: Award },
];

export default function Navbar() {
  const contract = getContract({
    client,
    chain: defineChain(4202),
    address: "0x955289EFBD17c10d0180e5Dde37F366226402e02",
  });

  return (
    <nav className="bg-[#fffbf4] px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-3xl font-bold text-purple-600">
            Vibin.
          </Link>
          <ul className="flex space-x-6">
            <ConnectButton
              client={client}
              appMetadata={{
                name: "Counter DApp",
                url: "https://pelitabangsa.co.id",
              }}
            />
          </ul>
        </div>
      </div>
    </nav>
  );
}
