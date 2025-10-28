"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function GeneratePaper() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [paper, setPaper] = useState<any>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/research/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (res.ok) {
        setPaper(data);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Failed to generate paper");
    }
    setLoading(false);
  };

  const handleEdit = () => {
    if (paper?.id) {
      router.push(`/research/${paper.id}/editor`);
    } else {
      alert("Please generate a paper first!");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse at top, black 0%, transparent 100%)'
      }} />
      
      {/* Minimal Purple Gradient Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-transparent blur-[120px] z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-purple-500/8 to-transparent blur-[100px] z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <div className="border border-white/10 p-12 relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/40 mb-4 tracking-widest uppercase font-light">AI Generator</div>
                <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-none uppercase">
                  Generate Paper
                </h1>
              </div>
              <div className="w-20 h-20 border border-white/20 bg-black flex items-center justify-center relative overflow-hidden group/icon">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500" />
                <svg className="w-10 h-10 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
            <div className="relative border border-white/10 bg-black p-12">
              <label className="block text-xs text-white/40 tracking-widest uppercase font-light mb-6">
                Research Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your research topic..."
                className="w-full p-6 border border-white/20 bg-black text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-colors text-lg font-light tracking-wide mb-8"
              />
              
              <button
                onClick={handleGenerate}
                disabled={loading || !topic.trim()}
                className="group/btn relative inline-block disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
                <div className="relative px-12 py-5 bg-white text-black font-light text-xs tracking-widest uppercase border border-white/20 transition-transform duration-300 group-hover/btn:-translate-x-[2px] group-hover/btn:-translate-y-[2px] disabled:translate-x-0 disabled:translate-y-0">
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black animate-spin" />
                      Generating...
                    </span>
                  ) : (
                    "Generate Paper"
                  )}
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Generated Paper Section */}
        {paper && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
              <div className="relative border border-white/10 bg-black">
                {/* Header */}
                <div className="p-12 border-b border-white/10">
                  <div className="flex items-start justify-between gap-8">
                    <div className="flex-1">
                      <div className="text-xs text-white/40 tracking-widest uppercase font-light mb-4">Generated Paper</div>
                      <h2 className="text-3xl md:text-4xl font-light tracking-tight leading-tight">{paper.title}</h2>
                    </div>
                    <button
                      onClick={handleEdit}
                      className="group/edit relative inline-block shrink-0"
                    >
                      <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
                      <div className="relative px-8 py-4 bg-black text-white font-light text-xs tracking-widest uppercase border border-white/20 transition-all duration-300 group-hover/edit:bg-white group-hover/edit:text-black group-hover/edit:-translate-x-[2px] group-hover/edit:-translate-y-[2px]">
                        Edit Paper
                      </div>
                    </button>
                  </div>
                </div>

                {/* Abstract */}
                <div className="p-12 border-b border-white/10">
                  <h3 className="text-xs text-white/40 tracking-widest uppercase font-light mb-6">Abstract</h3>
                  <p className="text-white/80 text-base font-light leading-relaxed">{paper.abstract}</p>
                </div>

                {/* Sections */}
                <div className="p-12 space-y-12">
                  {paper.sections.map((sec: any, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                      className="border-l-2 border-white/10 pl-8"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-2xl font-extralight text-white/40">{(i + 1).toString().padStart(2, '0')}</div>
                        <h3 className="text-xl font-light tracking-tight uppercase">{sec.title}</h3>
                      </div>
                      <p className="text-white/70 text-sm font-light leading-relaxed">{sec.content}</p>
                    </motion.div>
                  ))}
                </div>

                {/* References */}
                {paper.citations && paper.citations.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="p-12 border-t border-white/10"
                  >
                    <h3 className="text-xs text-white/40 tracking-widest uppercase font-light mb-8">References</h3>
                    <div className="space-y-4">
                      {paper.citations.map((ref: string, i: number) => (
                        <div key={i} className="flex gap-4">
                          <span className="text-white/40 font-mono text-xs shrink-0">[{i + 1}]</span>
                          <p className="text-white/70 text-sm font-light leading-relaxed">{ref}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!paper && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
            <div className="relative border border-white/10 bg-black p-20 text-center">
              <div className="w-24 h-24 border border-white/20 flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-white/60 text-lg font-light tracking-wide uppercase mb-4">No paper generated yet</p>
              <p className="text-white/40 text-sm font-light tracking-wide">Enter a research topic above to generate your first AI-powered paper</p>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}