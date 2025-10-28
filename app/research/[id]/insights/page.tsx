"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import KnowledgeGraph from "../../../../components/KnowledgeGraph";

interface PaperInsights {
  wordCount: number;
  readabilityScore: number;
  tone: string;
  originalityScore: number;
  trendScore: number;
  plagiarismScore: number;
  topicClusters: string[];
  papers: { id: string; title: string; topics: string[] }[];
}

export default function Insights({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const paperId = id;
  const [insights, setInsights] = useState<PaperInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [papers, setPapers] = useState<{ id: string; title: string; topics: string[] }[]>([]);

  useEffect(() => {
    fetchInsights();
  }, [paperId]);

  const fetchInsights = async () => {
    try {
      const res = await fetch(`/api/research/insights?paperId=${paperId}`);
      if (res.ok) {
        const insightsData = await res.json();
        setInsights(insightsData);
        setPapers(insightsData.papers || []);
      } else {
        console.error("Failed to fetch insights");
      }
    } catch (error) {
      console.error("Failed to fetch insights:", error);
    } finally {
      setLoading(false);
    }
  };

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
          <p className="text-white/60 text-sm tracking-widest uppercase font-light">Loading Insights...</p>
        </div>
      </main>
    );
  }

  if (!insights) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        <div className="text-center">
          <p className="text-white/60 text-lg tracking-widest uppercase font-light">Insights Not Available</p>
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
                <div className="text-xs text-white/40 mb-4 tracking-widest uppercase font-light">Analytics Dashboard</div>
                <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-none uppercase">
                  Research Insights
                </h1>
              </div>
              <div className="w-20 h-20 border border-white/20 bg-black flex items-center justify-center relative overflow-hidden group/icon">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500" />
                <svg className="w-10 h-10 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <div className="border-b border-white/10 pb-8 mb-12">
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tighter uppercase">Key Metrics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-white/10 border border-white/10">
            {[
              { label: "Word Count", value: insights.wordCount.toLocaleString(), color: "text-white" },
              { label: "Readability", value: insights.readabilityScore.toFixed(1), sublabel: "Flesch Score", color: "text-white" },
              { label: "Originality", value: `${(insights.originalityScore * 100).toFixed(0)}%`, color: "text-white" },
              { label: "Trend Score", value: `${(insights.trendScore * 100).toFixed(0)}%`, color: "text-white" },
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.1), ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-black"
              >
                <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
                <div className="p-10 text-center">
                  <div className="text-xs text-white/40 tracking-widest uppercase font-light mb-4">{metric.label}</div>
                  <div className={`text-5xl font-extralight tracking-tighter mb-2 ${metric.color}`}>{metric.value}</div>
                  {metric.sublabel && (
                    <div className="text-xs text-white/40 tracking-wide font-light">{metric.sublabel}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Academic Scores & Topic Clusters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-white/10 border border-white/10">
            {/* Academic Scores */}
            <div className="group relative bg-black">
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
              <div className="p-12">
                <h3 className="text-xs text-white/40 tracking-widest uppercase font-light mb-8">Academic Analysis</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-sm text-white/60 tracking-wide uppercase font-light">Tone</span>
                    <span className="text-lg font-light">{insights.tone}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-sm text-white/60 tracking-wide uppercase font-light">Plagiarism Risk</span>
                    <span className={`text-lg font-light ${insights.plagiarismScore > 0.5 ? 'text-red-400' : 'text-green-400'}`}>
                      {(insights.plagiarismScore * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Topic Clusters */}
            <div className="group relative bg-black">
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
              <div className="p-12">
                <h3 className="text-xs text-white/40 tracking-widest uppercase font-light mb-8">Topic Clusters</h3>
                <div className="flex flex-wrap gap-3">
                  {insights.topicClusters.map((topic, index) => (
                    <div key={index} className="relative group/tag">
                      <div className="absolute inset-0 bg-white/5 translate-x-[1px] translate-y-[1px]" />
                      <div className="relative px-4 py-2 bg-black border border-white/20 text-xs text-white/80 tracking-wide font-light uppercase transition-all duration-300 hover:bg-white hover:text-black">
                        {topic}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Knowledge Graph Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
            <div className="relative border border-white/10 bg-black">
              {/* Header */}
              <div className="p-12 border-b border-white/10">
                <h3 className="text-xs text-white/40 tracking-widest uppercase font-light mb-4">Knowledge Graph</h3>
                <p className="text-white/60 text-sm font-light leading-relaxed">
                  Visual representation of how this paper connects to related research topics and thematic clusters.
                </p>
              </div>

              {/* Knowledge Graph Visualization */}
              <div className="p-12">
                {papers.length > 0 ? (
                  <KnowledgeGraph papers={papers} />
                ) : (
                  <div className="aspect-video relative bg-gradient-to-br from-black via-gray-900/30 to-black border border-white/10 flex items-center justify-center">
                    <span className="text-white/60 text-sm">No related papers found</span>
                  </div>
                )}

                {/* Graph Legend */}
                <div className="mt-8 flex items-center justify-center gap-8">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-purple-500/40 bg-black" />
                    <span className="text-xs text-white/40 tracking-wide font-light uppercase">Active Paper</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border border-white/20 bg-black" />
                    <span className="text-xs text-white/40 tracking-wide font-light uppercase">Related Papers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}