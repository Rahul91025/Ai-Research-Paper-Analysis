"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 100%)'
      }} />
      
      {/* Minimal Purple Gradient Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-transparent blur-[120px] z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-purple-500/8 to-transparent blur-[100px] z-0" />

      {/* Hero Section */}
      <div className="relative z-10 px-6 py-32 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-32"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block mb-12 relative group"
          >
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
            <div className="relative flex items-center gap-3 border border-white/10 px-6 py-3 bg-black overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-2 h-2 bg-gradient-to-br from-purple-500 to-purple-600 relative z-10" />
              <span className="text-xs tracking-widest text-white/60 font-light uppercase relative z-10">AI-Powered Analysis</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-7xl md:text-9xl font-extralight mb-8 tracking-tighter leading-none">
            <span className="block">RESEARCH</span>
            <span className="block text-white/40">SIMPLIFIED</span>
          </h1>

          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-12" />

          {/* Description */}
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-16 font-light leading-relaxed tracking-wide">
            Transform complex research papers into clear insights with advanced artificial intelligence technology
          </p>

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-white/10 border border-white/10 max-w-2xl mx-auto">
  
  {/* Dashboard Button */}
  <button
    onClick={() => router.push("/dashboard")} // ✅ Navigates to /dashboard
    className="group relative block bg-black"
  >
    <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
    <div className="px-10 py-6 bg-white text-black text-center text-xs font-light tracking-widest uppercase transition-all duration-300 group-hover:bg-black group-hover:text-white flex items-center justify-center gap-3">
      Dashboard
      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
    </div>
  </button>
  
  {/* Explore Button */}
  <button
    onClick={() => router.push("/research")} // ✅ Navigates to /research
    className="group relative block bg-black"
  >
    <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
    <div className="px-10 py-6 bg-black text-white text-center text-xs font-light tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black">
      Explore
    </div>
  </button>
</div>
        </motion.div>

        {/* Minimalist Visual Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <div className="max-w-4xl mx-auto relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
            <div className="relative border border-white/10 bg-black p-16">
              {/* Corner Gradient Accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-transparent bg-gradient-to-br from-purple-500/40 via-purple-500/20 to-transparent" style={{ maskImage: 'linear-gradient(to bottom right, black 0%, black 50%, transparent 50%)' }} />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-transparent bg-gradient-to-tl from-purple-500/40 via-purple-500/20 to-transparent" style={{ maskImage: 'linear-gradient(to top left, black 0%, black 50%, transparent 50%)' }} />
              
              <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <span className="text-xs text-white/40 tracking-widest uppercase font-light">Document Analysis</span>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-br from-purple-500 to-purple-600 animate-pulse shadow-lg shadow-purple-500/50" />
                    <span className="text-xs text-white/40 tracking-widest uppercase font-light">Active</span>
                  </div>
                </div>
                
                {/* Content Lines */}
                <div className="space-y-4 py-12">
                  <div className="h-[1px] bg-white/10 w-full" />
                  <div className="h-[1px] bg-white/10 w-5/6" />
                  <div className="h-[1px] bg-white/10 w-3/5" />
                  <div className="h-[1px] bg-white/10 w-4/5" />
                  <div className="h-[1px] bg-white/10 w-2/5" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-[2px] bg-white/10 border-t border-white/10 pt-8">
                  <div className="text-center">
                    <div className="text-4xl font-extralight tracking-tighter mb-2">98%</div>
                    <div className="text-xs text-white/40 tracking-widest uppercase font-light">Accuracy</div>
                  </div>
                  <div className="text-center border-l border-white/10">
                    <div className="text-4xl font-extralight tracking-tighter mb-2">10K+</div>
                    <div className="text-xs text-white/40 tracking-widest uppercase font-light">Papers</div>
                  </div>
                  <div className="text-center border-l border-white/10">
                    <div className="text-4xl font-extralight tracking-tighter mb-2">5K+</div>
                    <div className="text-xs text-white/40 tracking-widest uppercase font-light">Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32"
        >
          <div className="border-b border-white/10 pb-8 mb-12">
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tighter uppercase">Core Features</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-[2px] bg-white/10 border border-white/10">
            {[
              { num: "01", title: "Analyze", desc: "Advanced AI-powered research paper analysis with deep learning capabilities" },
              { num: "02", title: "Organize", desc: "Intelligent data organization and categorization systems" },
              { num: "03", title: "Summarize", desc: "Instant key insights extraction and comprehensive summaries" }
            ].map((item, index) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + (index * 0.1), ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-black"
              >
                <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
                <div className="p-12 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-8">
                    <div className="text-5xl font-extralight text-white/40">{item.num}</div>
                    <div className="w-12 h-12 border border-white/20 flex items-center justify-center relative overflow-hidden group/icon">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="w-3 h-3 bg-gradient-to-br from-purple-500/60 to-purple-600/40 group-hover:from-purple-500 group-hover:to-purple-600 transition-all duration-300 relative z-10" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-light tracking-tight mb-4 uppercase">{item.title}</h3>
                  <p className="text-white/60 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-10 px-6 py-12 border-t border-white/10 max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-xs tracking-widest uppercase font-light">© 2025 AI Research Analyzer</p>
          <div className="flex gap-12">
            <button className="text-white/40 hover:text-white transition-colors text-xs tracking-widest uppercase font-light">
              Privacy
            </button>
            <button className="text-white/40 hover:text-white transition-colors text-xs tracking-widest uppercase font-light">
              Terms
            </button>
            <button className="text-white/40 hover:text-white transition-colors text-xs tracking-widest uppercase font-light">
              Contact
            </button>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}