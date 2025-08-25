"use client";
import React, { useState } from "react";

type Op = "+" | "-" | "=" | null;

export default function Page() {
  const [digit1, setDigit1] = useState<number | null>(null);
  const [digit2, setDigit2] = useState<number | null>(null);
  const [op, setOp] = useState<Op>(null);
  const [result, setResult] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const reset = () => {
    setDigit1(null);
    setDigit2(null);
    setOp(null);
    setResult(null);
    setDone(false);
  };

  const handleDigit = (n: number) => {
    if (done) reset();
    if (digit1 === null) setDigit1(n);
    else if (op && digit2 === null) setDigit2(n);
  };

  const handleOp = (symbol: "+" | "-") => {
    if (done) {
      if (result !== null) {
        setDigit1(result);
        setDigit2(null);
        setOp(symbol);
        setResult(null);
        setDone(false);
        return;
      }
      reset();
    }
    if (digit1 !== null && op === null) setOp(symbol);
  };

  const handleEquals = () => {
    if (digit1 === null || op === null || digit2 === null) return;
    const r = op === "+" ? digit1 + digit2 : digit1 - digit2;
    setResult(r);
    setDone(true);
  };

  const displayValue = () => {
    if (done && result !== null) return String(result);
    return `${digit1 ?? ""}${op ?? ""}${digit2 ?? ""}` || "0";
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-6 bg-black">
      <div className="w-full max-w-sm rounded-2xl shadow-lg bg-white p-5">
        {/* Display */}
        <div className="bg-slate-900 text-white rounded-xl px-4 py-3 text-right text-3xl font-semibold">
          {displayValue()}
        </div>
        <div className="text-right text-xs text-slate-500 mt-1 h-4">
          {done && digit1 !== null && op && digit2 !== null
            ? `${digit1} ${op} ${digit2} = ${result}`
            : "\u00A0"}
        </div>

        {/* Layout angka + operator di kanan */}
        <div className="grid grid-cols-4 gap-3 mt-4">
          {/* angka (3 kolom) */}
          <div className="grid grid-cols-3 gap-3 col-span-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <button
                key={n}
                onClick={() => handleDigit(n)}
                className="bg-slate-200 hover:bg-slate-300 rounded-xl py-3 text-xl font-bold text-slate-900"
              >
                {n}
              </button>
            ))}
          </div>

          {/* operator (1 kolom vertikal) */}
          <div className="flex flex-col gap-3">
            <button
              onClick={reset}
              className="bg-orange-500 hover:bg-orange-600 rounded-xl py-3 text-xl font-bold text-white"
            >
              AC
            </button>
            <button
              onClick={() => handleOp("+")}
              className="bg-orange-500 hover:bg-orange-600 rounded-xl py-3 text-xl font-bold text-white"
            >
              +
            </button>
            <button
              onClick={() => handleOp("-")}
              className="bg-orange-500 hover:bg-orange-600 rounded-xl py-3 text-xl font-bold text-white"
            >
              -
            </button>
            <button
              onClick={handleEquals}
              className="bg-orange-500 hover:bg-orange-600 rounded-xl py-3 text-xl font-bold text-white"
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
