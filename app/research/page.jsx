"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Research() {
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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-40"
        >
          <div className="border border-white/10 p-8 sm:p-12 md:p-16 relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
            
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="mb-12 inline-block relative"
              >
                <div className="w-20 h-20 border border-white/20 bg-black flex items-center justify-center relative">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </motion.div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-extralight mb-6 sm:mb-8 tracking-tighter leading-none">
                <span className="block">RESEARCH</span>
                <span className="block text-white/40">HUB</span>
              </h1>
              
              <div className="w-24 h-[2px] bg-purple-500 mx-auto mb-12" />
              
              <p className="text-base sm:text-lg md:text-xl text-white/60 mb-16 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
                AI-powered research analysis platform. Generate insights, explore discoveries, and collaborate on groundbreaking papers.
              </p>

              {/* CTA Buttons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-white/10 border border-white/10 max-w-3xl mx-auto">
  <Link href="/research/generate" className="group relative block bg-black">
    <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
    <div className="px-8 py-6 bg-black text-white text-center text-xs font-light tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black">
      Generate
    </div>
  </Link>

  <Link href="/research/showcase" className="group relative block bg-black">
    <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
    <div className="px-8 py-6 bg-black text-white text-center text-xs font-light tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black">
      Showcase
    </div>
  </Link>

  <Link href="/dashboard" className="group relative block bg-black">
    <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
    <div className="px-8 py-6 bg-black text-white text-center text-xs font-light tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black">
      Dashboard
    </div>
  </Link>
</div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-40"
        >
          <div className="border-b border-white/10 pb-8 mb-12">
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tighter uppercase">Platform Features</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-white/10 border border-white/10">
            <div className="group relative bg-black">
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
              <div className="p-12 h-full flex flex-col">
                <div className="w-16 h-16 border border-white/20 flex items-center justify-center mb-8">
                  <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="text-5xl font-extralight text-white/40 mb-6">01</div>
                <h3 className="text-2xl font-light tracking-tight mb-4 uppercase">AI Analysis</h3>
                <p className="text-white/60 text-sm font-light leading-relaxed">
                  Advanced artificial intelligence to analyze and summarize complex research papers with precision and depth.
                </p>
              </div>
            </div>

            <div className="group relative bg-black">
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
              <div className="p-12 h-full flex flex-col">
                <div className="w-16 h-16 border border-white/20 flex items-center justify-center mb-8">
                  <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-5xl font-extralight text-white/40 mb-6">02</div>
                <h3 className="text-2xl font-light tracking-tight mb-4 uppercase">Collaboration</h3>
                <p className="text-white/60 text-sm font-light leading-relaxed">
                  Work together with researchers worldwide on shared projects and groundbreaking discoveries.
                </p>
              </div>
            </div>

            <div className="group relative bg-black">
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
              <div className="p-12 h-full flex flex-col">
                <div className="w-16 h-16 border border-white/20 flex items-center justify-center mb-8">
                  <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div className="text-5xl font-extralight text-white/40 mb-6">03</div>
                <h3 className="text-2xl font-light tracking-tight mb-4 uppercase">Knowledge Graphs</h3>
                <p className="text-white/60 text-sm font-light leading-relaxed">
                  Visualize connections between papers and concepts in interactive knowledge graph systems.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Visual Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-40"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
            <div className="relative border border-white/10 overflow-hidden bg-black">
              <div className="aspect-video relative bg-gradient-to-br from-black via-gray-900/50 to-black flex items-center justify-center">
                <div className="text-center px-8">
                  <div className="w-32 h-32 border border-white/10 flex items-center justify-center mx-auto mb-8">
                    <svg className="w-16 h-16 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                      <path strokeLinecap="square" strokeLinejoin="miter" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-white/40 text-sm tracking-widest uppercase font-light">Research Platform Visualization</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-40"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-white/10 border border-white/10">
            <div className="relative bg-black p-12 text-center">
              <div className="text-6xl md:text-7xl font-extralight tracking-tighter mb-4">12K+</div>
              <div className="text-xs text-white/40 tracking-widest uppercase font-light">Active Researchers</div>
            </div>
            
            <div className="relative bg-black p-12 text-center">
              <div className="text-6xl md:text-7xl font-extralight tracking-tighter mb-4">50K+</div>
              <div className="text-xs text-white/40 tracking-widest uppercase font-light">Papers Analyzed</div>
            </div>
            
            <div className="relative bg-black p-12 text-center">
              <div className="text-6xl md:text-7xl font-extralight tracking-tighter mb-4">98%</div>
              <div className="text-xs text-white/40 tracking-widest uppercase font-light">Accuracy Rate</div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="border border-white/10 p-16 relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
            
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-extralight mb-6 tracking-tighter leading-none uppercase">
                Ready to start<br />your research?
              </h2>
              <p className="text-white/60 mb-12 font-light tracking-wide text-lg">
                Join thousands of researchers using AI to accelerate their work
              </p>
              
              <button className="group/btn relative inline-block">
                <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
                <div className="relative px-16 py-6 bg-white text-black font-light text-xs tracking-widest uppercase border border-white/20 transition-transform duration-300 group-hover/btn:-translate-x-[2px] group-hover/btn:-translate-y-[2px]">
                  Get Started
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}