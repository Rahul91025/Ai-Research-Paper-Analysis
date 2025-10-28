"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Citation {
  paperId: string;
  influenceScore: number;
}

interface AdvancedData {
  trendScore: number;
  plagiarismScore: number;
  suggestedRephrases: string[];
  citationsGraph: Citation[];
}

export default function AdvancedAI({ paperId }: { paperId: string }) {
  const [data, setData] = useState<AdvancedData | null>(null);

  useEffect(() => {
    async function fetchAdvanced() {
      const res = await fetch("/api/research/advanced", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paperId }),
      });
      const json = await res.json();
      setData(json);
    }
    fetchAdvanced();
  }, [paperId]);

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-400"
        >
          Loading advanced AI tools...
        </motion.p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-white mb-8"
        >
          Advanced AI Tools
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gray-900 p-6 rounded-lg border-2 border-purple-500/30 shadow-lg shadow-purple-500/10 mb-8"
        >
          <h2 className="text-xl font-semibold text-purple-300 mb-4">Analysis Scores</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Trend Score:</span>
              <span className="font-medium text-green-400">{data.trendScore?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Plagiarism Score:</span>
              <span className="font-medium text-red-400">{(data.plagiarismScore * 100)?.toFixed(2)}%</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-900 p-6 rounded-lg border-2 border-purple-500/30 shadow-lg shadow-purple-500/10 mb-8"
        >
          <h2 className="text-xl font-semibold text-purple-300 mb-4">Suggested Rephrase</h2>
          <p className="text-gray-300">{data.suggestedRephrases[0]}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gray-900 p-6 rounded-lg border-2 border-purple-500/30 shadow-lg shadow-purple-500/10"
        >
          <h2 className="text-xl font-semibold text-purple-300 mb-4">Citation Graph</h2>
          <ul className="space-y-2">
            {data.citationsGraph.map((c) => (
              <li key={c.paperId} className="flex justify-between text-gray-300">
                <span>Paper ID: {c.paperId}</span>
                <span>Influence: {c.influenceScore.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </main>
  );
}
