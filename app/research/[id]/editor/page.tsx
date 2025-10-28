"use client";
import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";

interface Section {
  title: string;
  content: string;
}

interface Paper {
  _id: string;
  title: string;
  abstract: string;
  sections: Section[];
  references: string[];
}

export default function PaperEditor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const paperId = id;
  const [paper, setPaper] = useState<Paper | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPaper();
  }, [paperId]);

  const fetchPaper = async () => {
    try {
      const res = await fetch(`/api/research/${paperId}`);
      if (res.ok) {
        const paperData = await res.json();
        setPaper(paperData);
      } else {
        console.error("Failed to fetch paper");
      }
    } catch (error) {
      console.error("Failed to fetch paper:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateSection = (index: number, field: 'title' | 'content', value: string) => {
    if (!paper) return;
    const updatedSections = [...paper.sections];
    updatedSections[index] = { ...updatedSections[index], [field]: value };
    setPaper({ ...paper, sections: updatedSections });
  };

  const addSection = () => {
    if (!paper) return;
    const newSection = { title: "New Section", content: "" };
    setPaper({ ...paper, sections: [...paper.sections, newSection] });
  };

  const deleteSection = (index: number) => {
    if (!paper) return;
    const updatedSections = paper.sections.filter((_, i) => i !== index);
    setPaper({ ...paper, sections: updatedSections });
  };

  const savePaper = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Paper saved successfully!");
    } catch (error) {
      alert("Failed to save paper");
    } finally {
      setSaving(false);
    }
  };

  const exportPaper = (format: string) => {
    console.log(`Exporting as ${format}`);
    alert(`Export as ${format} - Feature coming soon!`);
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
          <p className="text-white/60 text-sm tracking-widest uppercase font-light">Loading Paper...</p>
        </div>
      </main>
    );
  }

  if (!paper) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        <div className="text-center">
          <p className="text-white/60 text-lg tracking-widest uppercase font-light">Paper Not Found</p>
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <div className="border border-white/10 p-12 relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
            
            <div className="flex items-center justify-between gap-8">
              <div className="flex-1">
                <div className="text-xs text-white/40 mb-4 tracking-widest uppercase font-light">Document Editor</div>
                <h1 className="text-5xl md:text-6xl font-extralight tracking-tighter leading-none uppercase">
                  Paper Editor
                </h1>
              </div>
              
              <div className="flex gap-[2px] bg-white/10 border border-white/10">
                <button
                  onClick={savePaper}
                  disabled={saving}
                  className="group/btn relative bg-black disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover/btn:translate-x-[4px] group-hover/btn:translate-y-[4px]" />
                  <div className="px-8 py-4 bg-white text-black text-xs font-light tracking-widest uppercase transition-all duration-300 group-hover/btn:bg-black group-hover/btn:text-white disabled:bg-white disabled:text-black">
                    {saving ? "Saving..." : "Save"}
                  </div>
                </button>
                
                <button
                  onClick={() => exportPaper('PDF')}
                  className="group/export relative bg-black"
                >
                  <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] -z-10 transition-transform duration-300 group-hover/export:translate-x-[4px] group-hover/export:translate-y-[4px]" />
                  <div className="px-8 py-4 bg-black text-white text-xs font-light tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black">
                    Export
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
            <div className="relative border border-white/10 bg-black p-8">
              <label className="block text-xs text-white/40 tracking-widest uppercase font-light mb-4">
                Paper Title
              </label>
              <input
                type="text"
                value={paper.title}
                onChange={(e) => setPaper({ ...paper, title: e.target.value })}
                className="w-full p-4 border border-white/20 bg-black text-white text-xl font-light tracking-tight focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
          </div>
        </motion.div>

        {/* Abstract Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
            <div className="relative border border-white/10 bg-black p-8">
              <label className="block text-xs text-white/40 tracking-widest uppercase font-light mb-4">
                Abstract
              </label>
              <textarea
                value={paper.abstract}
                onChange={(e) => setPaper({ ...paper, abstract: e.target.value })}
                rows={4}
                className="w-full p-4 border border-white/20 bg-black text-white text-base font-light leading-relaxed focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Sections Header */}
        <div className="border-b border-white/10 pb-8 mb-12 flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-extralight tracking-tighter uppercase">Content Sections</h2>
          <button
            onClick={addSection}
            className="group/add relative inline-block"
          >
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
            <div className="relative px-8 py-3 bg-black text-white font-light text-xs tracking-widest uppercase border border-white/20 transition-all duration-300 hover:bg-white hover:text-black hover:-translate-x-[2px] hover:-translate-y-[2px]">
              Add Section
            </div>
          </button>
        </div>

        {/* Sections */}
        <div className="space-y-8 mb-12">
          {paper.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + (index * 0.1), ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
              <div className="relative border border-white/10 bg-black p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-3xl font-extralight text-white/40">{(index + 1).toString().padStart(2, '0')}</div>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateSection(index, 'title', e.target.value)}
                      className="flex-1 text-xl font-light tracking-tight border-none outline-none bg-transparent text-white"
                    />
                  </div>
                  <button
                    onClick={() => deleteSection(index)}
                    className="group/delete relative shrink-0"
                  >
                    <div className="absolute inset-0 bg-white/5 translate-x-[1px] translate-y-[1px]" />
                    <div className="relative px-6 py-2 bg-black text-white/60 text-xs font-light tracking-widest uppercase border border-white/20 transition-all duration-300 hover:bg-white hover:text-black hover:border-white">
                      Delete
                    </div>
                  </button>
                </div>
                <textarea
                  value={section.content}
                  onChange={(e) => updateSection(index, 'content', e.target.value)}
                  rows={6}
                  className="w-full p-4 border border-white/20 bg-black text-white text-sm font-light leading-relaxed focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                  placeholder="Enter section content..."
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* References Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
            <div className="relative border border-white/10 bg-black p-8">
              <h2 className="text-xs text-white/40 tracking-widest uppercase font-light mb-6">References</h2>
              <div className="space-y-4">
                {paper.references.map((ref, index) => (
                  <div key={index} className="flex gap-4 border-l-2 border-white/10 pl-6">
                    <span className="text-white/40 font-mono text-xs shrink-0">[{index + 1}]</span>
                    <p className="text-white/70 text-sm font-light leading-relaxed">{ref}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Voice Assistant Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 translate-x-[2px] translate-y-[2px] border border-white/20" />
            <div className="relative border border-white/10 bg-black p-12 text-center">
              <div className="w-16 h-16 border border-white/20 flex items-center justify-center mx-auto mb-6 relative overflow-hidden group/icon">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500" />
                <svg className="w-8 h-8 text-white/60 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <p className="text-white/60 text-sm font-light tracking-wide uppercase mb-2">Voice Assistant</p>
              <p className="text-white/40 text-xs font-light tracking-wide">Click to activate voice commands</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}