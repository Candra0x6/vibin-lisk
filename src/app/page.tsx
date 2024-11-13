"use client";

import { useState, useEffect } from 'react';
import { ConnectButton } from "thirdweb/react";
import { toast } from 'react-toastify';
import { createThirdwebClient, getContract, prepareContractCall } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { client } from "@/app/client";
import { useReadContract, useSendTransaction, TransactionButton } from "thirdweb/react";

export default function Home() {
  const [number, setNumber] = useState(0);
  const [error, setError] = useState('');
  const [isLoadingDecrement, setIsLoadingDecrement] = useState(false);
  const [isLoadingIncrement, setIsLoadingIncrement] = useState(false);

  const { mutate: sendTransaction } = useSendTransaction();

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

  const triggerSetNumber = () => {
    // ...
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="mx-auto py-5 text-center">
          <ConnectButton
            client={client}
            appMetadata={{
              name: "Counter DApp",
              url: "https://pelitabangsa.co.id",
            }}
          />
        </div>
        <div className="bg-zinc-900 rounded-xl p-8 shadow-lg">
          <h1 className="text-4xl font-bold mb-8 text-center">Counter DApp</h1>
          
          {/* Current Number Display */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold mb-2">Current Number</h2>
            <div className="text-6xl font-bold text-blue-500">{number}</div>
          </div>

          {/* Control Buttons */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            <TransactionButton
              className="hover:bg-zinc-400 text-white font-bold py-4 px-6 rounded-lg transition-colors"
              transaction={async () => {
                setIsLoadingDecrement(true);

                const tx = prepareContractCall({
                  contract,
                  method: "function decrement()",
                  params: [],
                });
                return tx;
              }}
              onTransactionSent={(result) => {
                toast.info("Decrementing Number...");
                setIsLoadingDecrement(false);
              }}
              onTransactionConfirmed={(receipt) => {
                // console.log("Transaction confirmed", receipt.transactionHash);
                toast.success("Number decremented!");
              }}
              onError={(error) => {
                // console.error("Transaction error", error);
                toast.error(error.message);
                setIsLoadingDecrement(false);
              }}
            >
              Decrement
            </TransactionButton>
            
            <div className="relative">
              <input
                type="number"
                onChange={(e) => handleSetNumber(e.target.value)}
                placeholder="Set number"
                className="w-full bg-zinc-200 text-white px-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <TransactionButton
              className="hover:bg-zinc-400 text-white font-bold py-4 px-6 rounded-lg transition-colors"
              transaction={async () => {
                setIsLoadingIncrement(true);

                const tx = prepareContractCall({
                  contract,
                  method: "function increment()",
                  params: [],
                });
                return tx;
              }}
              onTransactionSent={(result) => {
                toast.info("Incrementing Number...");
                setIsLoadingIncrement(false);
              }}
              onTransactionConfirmed={(receipt) => {
                // console.log("Transaction confirmed", receipt.transactionHash);
                toast.success("Number incremented!");
              }}
              onError={(error) => {
                // console.error("Transaction error", error);
                toast.error(error.message);
                setIsLoadingIncrement(false);
              }}
            >
              Increment
            </TransactionButton>
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