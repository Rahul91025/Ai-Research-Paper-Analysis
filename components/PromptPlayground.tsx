"use client";
import { useState } from "react";

export default function PromptPlayground() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");

  const runPrompt = async () => {
    const res = await fetch("/api/research/prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setOutput(data.result);
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="font-bold text-xl">Prompt Playground</h2>
      <textarea
        className="w-full h-32 border p-2 mt-2"
        placeholder="Enter custom Gemini prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={runPrompt} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
        Run Prompt
      </button>
      {output && (
        <div className="mt-2 p-2 border rounded bg-gray-50">
          <strong>Output:</strong>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
}