"use client";

import { useState, useEffect } from 'react';
import { ConnectButton } from "thirdweb/react";
import { toast } from 'react-toastify';
import { createThirdwebClient, getContract, prepareContractCall, prepareEvent } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { client } from "@/app/client";
import { useReadContract, useSendTransaction, TransactionButton, useContractEvents } from "thirdweb/react";

export default function Home() {
  const [number, setNumber] = useState(0);
  const [tempNumber, setTempNumber] = useState("");

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

  const preparedEvent = prepareEvent({
    signature: "event NumberSet(uint256 number)",
  });

  const { data: event } = useContractEvents({
    contract,
    events: [preparedEvent],
    watch: true,
  });

  useEffect(() => {
    console.log(event);
  }, [event]);

  useEffect(() => {
    if (dataNumber) {
      setNumber(parseInt(dataNumber.toString()));
    }
  }, [dataNumber]);

  // Simulating contract functions
  const handleSetTempNumber = (newNumber: string) => {
    try {
      setTempNumber(newNumber);
    } catch (err) {
      toast.error("Invalid number input!");
    }
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

                const tx = prepareContractCall({
                  contract,
                  method: "function decrement()",
                  params: [],
                });
                return tx;
              }}
              onTransactionSent={(result) => {
                toast.info("Decrementing Number...");
              }}
              onTransactionConfirmed={(receipt) => {
                // console.log("Transaction confirmed", receipt.transactionHash);
                toast.success("Number decremented!");
              }}
              onError={(error) => {
                // console.error("Transaction error", error);
                toast.error(error.message);
              }}
            >
              Decrement
            </TransactionButton>
            
            <div className="relative">
              <input
                type="number"
                onChange={(e) => handleSetTempNumber(e.target.value)}
                placeholder="Set number"
                className="w-full bg-zinc-200 text-black px-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <TransactionButton
              className="hover:bg-zinc-400 text-white font-bold py-4 px-6 rounded-lg transition-colors"
              transaction={async () => {

                const tx = prepareContractCall({
                  contract,
                  method: "function increment()",
                  params: [],
                });
                return tx;
              }}
              onTransactionSent={(result) => {
                toast.info("Incrementing Number...");
              }}
              onTransactionConfirmed={(receipt) => {
                // console.log("Transaction confirmed", receipt.transactionHash);
                toast.success("Number incremented!");
              }}
              onError={(error) => {
                // console.error("Transaction error", error);
                toast.error(error.message);
              }}
            >
              Increment
            </TransactionButton>
          </div>

          <div className="grid gap-4 mb-8">
          <TransactionButton
              className="bg-blue-200 hover:bg-blue-200 text-white font-bold py-4 px-6"
              transaction={async () => {

                const tx = prepareContractCall({
                  contract,
                  method: "function setNumber(uint256 newNumber)",
                  params: [BigInt(tempNumber)],
                });
                return tx;
              }}
              onTransactionSent={(result) => {
                toast.info("Setting Number...");
                setTempNumber("");
              }}
              onTransactionConfirmed={(receipt) => {
                // console.log("Transaction confirmed", receipt.transactionHash);
                toast.success("Number Set!");
              }}
              onError={(error) => {
                // console.error("Transaction error", error);
                toast.error(error.message);
              }}
            >
              Set Number
            </TransactionButton>
          </div>
        </div>
      </div>
    </main>
  );
}