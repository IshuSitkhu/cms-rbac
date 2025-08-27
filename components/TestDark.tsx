"use client";

import { useEffect, useState } from "react";

export default function TestDark() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen p-10">
      <button
        onClick={() => setDark(prev => !prev)}
        className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white p-4 rounded"
      >
        Toggle
      </button>
    </div>
  );
}
