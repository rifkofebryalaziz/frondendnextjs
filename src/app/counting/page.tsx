"use client";
import React, { useEffect, useState } from "react";

// buka halaman di localhost:3000/counting

const CountingPage = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // dijalankan ketika component pertama kali dibuat / dimount
    console.log("Komponen baru dibuat");
    const initialCount = Math.floor(Math.random() * 10);
    setCount(initialCount);
  }, []);

  useEffect(() => {
    // Memantau perbuhan state
    console.log(`counting saat ini : ${count}`);
    if (count < 1) {
      alert("Counting kurang dari 1");
    }
  }, [count]);

  return (
    <div>
      <p>{count}</p>
      <div className="flex gap-2">
        <button
          onClick={() => {
            console.log("Increase +1");
            setCount((prevCount) => {
              if (prevCount >= 10) return 10;
              return prevCount + 1;
            });
          }}
          className="bg-indigo-200 text-black p-2 rounded-lg"
        >
          +1
        </button>
        <button
          onClick={() => {
            console.log("Decrease -1");
            setCount((prevCount) => (prevCount < 1 ? 0 : prevCount - 1));
          }}
          className="bg-amber-300 text-black p-2 rounded-lg"
        >
          -1
        </button>
      </div>
    </div>
  );
};

export default CountingPage;