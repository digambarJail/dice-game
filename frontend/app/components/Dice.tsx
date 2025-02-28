"use client";
import { useEffect, useState } from "react";

interface DiceProps {
  roll: number | null;
}

export default function Dice({ roll }: DiceProps) {
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (roll !== null) {
      setAnimationClass("animate-roll");
      setTimeout(() => setAnimationClass(""), 600); // Reset animation after rolling
    }
  }, [roll]);

  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-24 h-24 flex items-center justify-center bg-white text-black text-4xl font-bold rounded-lg shadow-md border-4 border-gray-700 ${animationClass}`}
      >
        {roll !== null ? roll : "🎲"}
      </div>
      <style>
        {`
          @keyframes roll {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
          }
          .animate-roll {
            animation: roll 0.6s ease-in-out;
          }
        `}
      </style>
    </div>
  );
}
