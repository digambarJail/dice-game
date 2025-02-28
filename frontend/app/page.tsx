"use client";
import { useState } from "react";
import { rollDiceApi } from "./api";
import Dice from "./components/Dice";

export default function DiceGame() {
  const [bet, setBet] = useState<number>(0);
  const [balance, setBalance] = useState<number>(1000);
  const [roll, setRoll] = useState<number | null>(null);
  const [result, setResult] = useState<string>("");

  const rollDice = async () => {
    if (bet <= 0 || bet > balance) {
      setResult("Invalid bet amount.");
      return;
    }

    try {
      const { roll, newBalance } = await rollDiceApi(bet);
      setRoll(roll);
      setBalance(newBalance);
      setResult(`You rolled a ${roll}. ${roll >= 4 ? "You won!" : "You lost!"}`);
    } catch (error) {
      setResult((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-blue-400">🎲 Provably Fair Dice Game 🎲</h1>
      <p className="mb-4 text-lg font-semibold">Balance: <span className="text-green-400">${balance}</span></p>

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
