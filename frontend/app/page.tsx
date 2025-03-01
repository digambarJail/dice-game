"use client";

declare global {
  interface Window {
    ethereum?: any;
  }
}
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { rollDiceApi } from "./api";
import Dice from "./components/Dice";

export default function DiceGame() {
  const [bet, setBet] = useState<number | "">("");
  const [balance, setBalance] = useState<number>(1000); // Default balance
  const [roll, setRoll] = useState<number | null>(null);
  const [result, setResult] = useState<string>("");
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [ethBalance, setEthBalance] = useState<string | null>(null);

  useEffect(() => {
    const storedBalance = localStorage.getItem("cryptoBalance");
    if (storedBalance) {
      setBalance(Number(storedBalance));
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Using local balance.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const balance = await provider.getBalance(accounts[0]);
      const ethBalanceFormatted = ethers.formatEther(balance);

      setWalletConnected(true);
      setEthBalance(ethBalanceFormatted);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  const rollDice = async () => {
    if (bet <= 0 || bet > balance) {
      setResult("Invalid bet amount.");
      return;
    }

    try {
      const { roll, newBalance } = await rollDiceApi(bet);
      setRoll(roll);
      setBalance(newBalance);
      localStorage.setItem("cryptoBalance", newBalance.toString());

      setResult(`You rolled a ${roll}. ${roll >= 4 ? "You won!" : "You lost!"}`);
    } catch (error) {
      setResult((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-blue-400">🎲 Provably Fair Dice Game 🎲</h1>
      <p className="mb-4 text-lg font-semibold">
        Balance: <span className="text-green-400">${balance}</span>
      </p>

      {walletConnected ? (
        <p className="text-yellow-400">Wallet Connected! ETH Balance: {ethBalance} ETH</p>
      ) : (
        <button
          onClick={connectWallet}
          className="mb-4 px-4 py-2 bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 transition-all"
        >
          Connect Wallet
        </button>
      )}

      <Dice roll={roll} />

      <div className="relative w-full max-w-xs mt-6">
        <input
          type="number"
          value={bet}
          onChange={(e) => setBet(Number(e.target.value))}
          className="w-full p-3 text-lg border border-gray-500 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
          placeholder="Enter Bet Amount"
        />
        <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400">$</span>
      </div>

      <button
        onClick={rollDice}
        className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
      >
        🎲 Roll Dice
      </button>

      {result && <p className="mt-6 text-lg font-medium">{result}</p>}
    </div>
  );
}
