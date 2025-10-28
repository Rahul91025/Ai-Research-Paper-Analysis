"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Paper {
  _id: string;
  title: string;
  abstract: string;
  author?: string;
  createdAt?: string;
  trendScore?: number;
  isPublic?: boolean;
}

export default function Showcase() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPapers() {
      try {
        const res = await fetch("/api/research");
        if (res.ok) {
          const allPapers = await res.json();
          setPapers(allPapers);
        } else {
          console.error("Failed to fetch papers");
          setPapers([]);
        }
      } catch (error) {
        console.error("Failed to fetch papers:", error);
        setPapers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPapers();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }} />
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-2 border-white/20 border-t-purple-500 mx-auto mb-6 animate-spin" />
          <p className="text-white/60 text-sm tracking-widest uppercase font-light">Loading Showcase...</p>
        </div>
      </main>
    );
  }

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
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-transparent blur-[120px] z-0" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-gradient-to-tl from-purple-500/8 to-transparent blur-[100px] z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <div className="border border-white/10 p-12 relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/40 mb-4 tracking-widest uppercase font-light">Public Collection</div>
                <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-none uppercase">
                  Papers Showcase
                </h1>
              </div>
              <div className="text-right">
                <div className="text-xs text-white/40 tracking-widest mb-2 uppercase">Total Papers</div>
                <div className="text-6xl font-extralight tracking-tighter">{papers.length.toString().padStart(2, '0')}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Papers Grid */}
        {papers.length === 0 ? (
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
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <p className="text-white/60 text-lg font-light tracking-wide uppercase mb-4">No Public Papers Available</p>
              <p className="text-white/40 text-sm font-light tracking-wide">Check back later for new research publications</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-white/10 border border-white/10">
              {papers.map((paper, index) => (
                <motion.div
                  key={paper._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative bg-black cursor-pointer"
                >
                  <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
                  <div className="p-10 h-full flex flex-col">
                    {/* Author & Trend Score */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                      <span className="text-xs text-white/40 tracking-wide uppercase font-light">
                        {paper.author || "Anonymous"}
                      </span>
                      {paper.trendScore && (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-gradient-to-br from-purple-500 to-purple-600" />
                          <span className="text-xs text-white/60 font-mono">
                            {(paper.trendScore * 100).toFixed(0)}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-light tracking-tight mb-4 line-clamp-2 uppercase leading-tight">
                      {paper.title}
                    </h2>

                    {/* Abstract */}
                    <p className="text-white/60 text-sm font-light leading-relaxed line-clamp-4 mb-8">
                      {paper.abstract}
                    </p>

                    {/* Date */}
                    {paper.createdAt && (
                      <div className="mt-auto pt-6 border-t border-white/10">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white/40 tracking-widest uppercase font-light">Published</span>
                          <span className="text-white/60 font-mono">
                            {new Date(paper.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Hover Action */}
                    <div className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-16 bg-gradient-to-t from-purple-500/20 to-transparent transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex items-center gap-2 text-white/80 text-xs tracking-widest uppercase font-light">
                        <span>View Paper</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="square" strokeLinejoin="miter" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}