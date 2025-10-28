"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Paper {
  _id: string;
  title: string;
  abstract: string;
  createdAt: string;
  trendScore?: number;
  plagiarismScore?: number;
}

export default function DashboardPage() {
  const { user, isSignedIn } = useUser();
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSignedIn) {
      fetchPapers();
    }
  }, [isSignedIn]);

  const fetchPapers = async () => {
    try {
      const res = await fetch("/api/research");
      if (res.ok) {
        const papersData = await res.json();
        setPapers(papersData);
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
  };

  if (!isSignedIn) {
    return (
      <main className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 100%)'
        }} />
        
        {/* Minimal Purple Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[120px] z-0" />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12 inline-block relative group"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[2px] translate-y-[2px] -z-10" />
              <div className="w-20 h-20 border border-white/20 bg-black flex items-center justify-center relative">
                <span className="text-2xl font-bold">AI</span>
              </div>
            </motion.div>

            <h1 className="text-7xl md:text-9xl font-extralight mb-8 tracking-tighter leading-none">
              <span className="block">AI RESEARCH</span>
              <span className="block text-white/40">ANALYZER</span>
            </h1>
            
            <div className="w-24 h-[2px] bg-purple-500 mx-auto mb-12" />
            
            <p className="text-lg md:text-xl text-white/60 mb-16 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
              Advanced artificial intelligence platform for academic research analysis and generation
            </p>

            <motion.div
              whileHover={{ scale: 1.0 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="inline-block"
            >
              <Link href="/sign-in" className="group relative inline-block">
                <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
                <div className="relative px-12 py-5 bg-white text-black font-light text-xs tracking-widest uppercase border border-white/20 transition-transform duration-300 group-hover:-translate-x-[2px] group-hover:-translate-y-[2px]">
                  Sign In
                </div>
              </Link>
            </motion.div>
          </motion.div>
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
      
      {/* Minimal Purple Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <div className="border border-white/10 p-12 relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
            
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div>
                <div className="text-xs text-white/40 mb-4 tracking-widest uppercase font-light">Dashboard</div>
                <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-none">
                  WELCOME BACK,<br />
                  <span className="text-white/40">{user?.firstName?.toUpperCase() || "RESEARCHER"}</span>
                </h1>
              </div>
              <div className="text-left lg:text-right">
                <div className="text-xs text-white/40 tracking-widest mb-2 uppercase">Total Papers</div>
                <div className="text-6xl font-extralight tracking-tighter">{papers.length.toString().padStart(2, '0')}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-white/10 border border-white/10">
            <Link href="/research/generate" className="group relative block bg-black">
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
              <div className="p-12 h-full flex flex-col">
                <div className="flex items-start justify-between mb-8">
                  <div className="text-5xl font-extralight text-white/40">01</div>
                  <svg className="w-6 h-6 text-white/40 group-hover:text-purple-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light tracking-tight mb-4 uppercase">Generate Paper</h3>
                <p className="text-white/60 text-sm font-light leading-relaxed">Create AI-powered research papers with advanced analysis capabilities</p>
              </div>
            </Link>

            <Link href="/research" className="group relative block bg-black">
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
              <div className="p-12 h-full flex flex-col">
                <div className="flex items-start justify-between mb-8">
                  <div className="text-5xl font-extralight text-white/40">02</div>
                  <svg className="w-6 h-6 text-white/40 group-hover:text-purple-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light tracking-tight mb-4 uppercase">Browse Library</h3>
                <p className="text-white/60 text-sm font-light leading-relaxed">Explore your complete research collection and archives</p>
              </div>
            </Link>

            <Link href="/research/showcase" className="group relative block bg-black">
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
              <div className="p-12 h-full flex flex-col">
                <div className="flex items-start justify-between mb-8">
                  <div className="text-5xl font-extralight text-white/40">03</div>
                  <svg className="w-6 h-6 text-white/40 group-hover:text-purple-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light tracking-tight mb-4 uppercase">Public Showcase</h3>
                <p className="text-white/60 text-sm font-light leading-relaxed">Discover published research from the global community</p>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Recent Papers Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-end justify-between border-b border-white/10 pb-8 mb-12">
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tighter uppercase">Recent Papers</h2>
            <Link href="/research" className="text-xs text-white/40 hover:text-white transition-colors tracking-widest uppercase font-light">
              View All
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="w-16 h-16 border-2 border-white/20 border-t-purple-500" style={{
                animation: 'spin 1s linear infinite',
              }} />
            </div>
          ) : papers.length === 0 ? (
            <div className="relative group">
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
              <div className="relative p-20 bg-black border border-white/10 text-center">
                <div className="w-20 h-20 border border-white/20 flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-white/60 mb-12 text-lg font-light tracking-wide uppercase">No papers yet. Start by generating your first research paper.</p>
                <Link href="/research/generate" className="group/btn relative inline-block">
                  <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
                  <div className="relative px-12 py-5 bg-white text-black font-light text-xs tracking-widest uppercase border border-white/20 transition-transform duration-300 group-hover/btn:-translate-x-[2px] group-hover/btn:-translate-y-[2px]">
                    Generate Paper
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-white/10 border border-white/10">
              {papers.map((paper, index) => (
                <motion.div
                  key={paper._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative bg-black"
                >
                  <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
                  <div className="p-8 h-full flex flex-col">
                    <h3 className="text-xl font-light tracking-tight mb-4 line-clamp-2 uppercase">{paper.title}</h3>
                    <p className="text-white/60 text-sm mb-8 line-clamp-3 leading-relaxed font-light">{paper.abstract}</p>
                    
                    <div className="space-y-3 mb-8 pb-8 border-b border-white/10">
                      {paper.trendScore !== undefined && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/40 tracking-widest uppercase text-xs font-light">Trend Score</span>
                          <span className="text-white font-mono">{(paper.trendScore * 100).toFixed(0)}%</span>
                        </div>
                      )}
                      {paper.plagiarismScore !== undefined && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/40 tracking-widest uppercase text-xs font-light">Plagiarism</span>
                          <span className="text-white font-mono">{(paper.plagiarismScore * 100).toFixed(0)}%</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/40 tracking-widest uppercase text-xs font-light">Created</span>
                        <span className="text-white/60 font-mono text-xs">{new Date(paper.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-[2px] bg-white/10 border border-white/10 mt-auto">
                      <Link
                        href={`/research/${paper._id}/editor`}
                        className="px-4 py-4 bg-white text-black text-center text-xs font-light tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-300"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/research/${paper._id}/insights`}
                        className="px-4 py-4 bg-black text-white text-center text-xs font-light tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
                      >
                        Insights
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}