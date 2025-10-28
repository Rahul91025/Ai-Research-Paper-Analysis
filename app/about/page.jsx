"use client";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 100%)'
      }} />

      {/* Minimal Purple Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[120px] z-0" />

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <div className="border border-white/10 p-16 relative group">
            {/* 3D Shadow Layer */}
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />

            <h1 className="text-8xl font-extralight tracking-tighter text-white mb-8 leading-none">
              ABOUT
            </h1>
            <div className="w-16 h-[2px] bg-purple-500 mb-8" />
            <p className="text-2xl font-light tracking-tight text-white/60 max-w-3xl leading-relaxed">
              A cutting-edge platform that empowers researchers and AI enthusiasts to efficiently analyze, organize, and manage research papers with precision and clarity.
            </p>
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-white/10 border border-white/10 mb-32"
        >
          {/* Card 1 */}
          <motion.div
            whileHover={{ scale: 1.0 }}
            className="bg-black p-12 relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
            <div className="flex items-start justify-between mb-6">
              <div className="text-6xl font-extralight text-white/40">01</div>
              <svg className="w-6 h-6 text-white/40 group-hover:text-purple-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
            <h2 className="text-2xl font-light tracking-tight mb-4 text-white uppercase">
              Organize Efficiently
            </h2>
            <p className="text-white/60 leading-relaxed font-light">
              Keep all your AI research papers in one centralized location. Categorize, tag, and access insights instantly with our intelligent organization system.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ scale: 1.0 }}
            className="bg-black p-12 relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
            <div className="flex items-start justify-between mb-6">
              <div className="text-6xl font-extralight text-white/40">02</div>
              <svg className="w-6 h-6 text-white/40 group-hover:text-purple-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
            <h2 className="text-2xl font-light tracking-tight mb-4 text-white uppercase">
              AI-Powered Insights
            </h2>
            <p className="text-white/60 leading-relaxed font-light">
              Leverage advanced AI algorithms to extract summaries, key findings, and actionable insights from complex research papers automatically.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ scale: 1.0 }}
            className="bg-black p-12 relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
            <div className="flex items-start justify-between mb-6">
              <div className="text-6xl font-extralight text-white/40">03</div>
              <svg className="w-6 h-6 text-white/40 group-hover:text-purple-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
            <h2 className="text-2xl font-light tracking-tight mb-4 text-white uppercase">
              Collaborate Seamlessly
            </h2>
            <p className="text-white/60 leading-relaxed font-light">
              Share research papers, annotations, and insights with your team in real-time. Build collective knowledge with precision collaboration tools.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            whileHover={{ scale: 1.0 }}
            className="bg-black p-12 relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
            <div className="flex items-start justify-between mb-6">
              <div className="text-6xl font-extralight text-white/40">04</div>
              <svg className="w-6 h-6 text-white/40 group-hover:text-purple-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
            <h2 className="text-2xl font-light tracking-tight mb-4 text-white uppercase">
              Stay Updated
            </h2>
            <p className="text-white/60 leading-relaxed font-light">
              Receive real-time notifications about trending research, paper updates, and emerging AI breakthroughs. Never miss critical developments.
            </p>
          </motion.div>
        </motion.section>

        {/* Footer */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="border border-white/10 p-8"
        >
          <div className="flex items-center justify-between">
            <p className="text-white/40 font-light tracking-wider text-sm uppercase">
              © 2025 AI Research Analyzer
            </p>
            <div className="flex gap-6">
              <button className="text-white/40 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wider">
                Privacy
              </button>
              <button className="text-white/40 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wider">
                Terms
              </button>
              <button className="text-white/40 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wider">
                Contact
              </button>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
