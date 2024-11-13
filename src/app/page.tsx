"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { createThirdwebClient, getContract, readContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { client } from "@/app/client";
import { useReadContract } from "thirdweb/react";

export default function Home() {
  const [number, setNumber] = useState(0);
  const [error, setError] = useState('');

  const contract = getContract({
    client,
    chain: defineChain(4202),
    address: "0xa36d09e39Ef9b1D0685e3caECcD20f6379a1a9E5",
  });
  
  const { data: dataNumber, isPending: isPendingNumber } = useReadContract({
    contract,
    method: "function number() view returns (uint256)",
    params: [],
  });

  useEffect(() => {
    if (dataNumber) {
      setNumber(parseInt(dataNumber.toString()));
    }
  }, [dataNumber]);

  // Simulating contract functions
  const handleSetNumber = (newNumber: string) => {
    try {
      const num = parseInt(newNumber);
      setNumber(num);
      setError('');
    } catch (err) {
      toast.error("Invalid number input!");
    }
  };

  const triggerIncrement = () => {
    if (number >= 10) {
      setError(`NumberTooHigh: Current number is ${number}`);
      return;
    }
    setNumber(prev => prev + 1);
  };

  const triggerDecrement = () => {
    if (number <= 0) {
      setError(`NumberTooLow: Current number is ${number}`);
      return;
    }
    setNumber(prev => prev - 1);
  };

  const triggerSetNumber = () => {
    // ...
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="bg-zinc-900 rounded-xl p-8 shadow-lg">
          <h1 className="text-4xl font-bold mb-8 text-center">Counter DApp</h1>
          
          {/* Current Number Display */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold mb-2">Current Number</h2>
            <div className="text-6xl font-bold text-blue-500">{number}</div>
          </div>

          {/* Control Buttons */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            <button
              onClick={() => triggerDecrement()}
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 px-6 rounded-lg transition-colors"
            >
              Decrement
            </button>
            
            <div className="relative">
              <input
                type="number"
                onChange={(e) => handleSetNumber(e.target.value)}
                placeholder="Set number"
                className="w-full bg-zinc-800 text-white px-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <button
              onClick={() => triggerIncrement()}
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 px-6 rounded-lg transition-colors"
            >
              Increment
            </button>
          </div>

          <div className="grid gap-4 mb-8">
            
            <button
              onClick={() => triggerSetNumber()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors"
            >
              Set Number
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}