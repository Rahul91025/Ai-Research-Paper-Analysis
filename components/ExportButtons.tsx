"use client";
import { exportToWord, exportToMarkdown, exportToLaTeX } from "@/lib/export";

interface Section {
  title: string;
  content: string;
}

interface Paper {
  title: string;
  abstract: string;
  sections: Section[];
  references: string[];
}

interface ExportButtonsProps {
  paper: Paper;
}

export default function ExportButtons({ paper }: ExportButtonsProps) {
  const download = (filename: string, data: Blob | string | Buffer, type: string) => {
    let blob: Blob;
    if (data instanceof Blob) {
      blob = data;
    } else if (Buffer.isBuffer(data)) {
      blob = new Blob([new Uint8Array(data)], { type });
    } else {
      blob = new Blob([data], { type });
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleWord = async () => {
    try {
      const buffer = await exportToWord(paper);
      download(`${paper.title.replace(/[^a-zA-Z0-9]/g, '_')}.docx`, buffer, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    } catch (error) {
      console.error("Failed to export to Word:", error);
      alert("Failed to export to Word");
    }
  };

  const handleMarkdown = () => {
    try {
      const md = exportToMarkdown(paper);
      download(`${paper.title.replace(/[^a-zA-Z0-9]/g, '_')}.md`, md, "text/markdown");
    } catch (error) {
      console.error("Failed to export to Markdown:", error);
      alert("Failed to export to Markdown");
    }
  };

  const handleLaTeX = () => {
    try {
      const tex = exportToLaTeX(paper);
      download(`${paper.title.replace(/[^a-zA-Z0-9]/g, '_')}.tex`, tex, "application/x-tex");
    } catch (error) {
      console.error("Failed to export to LaTeX:", error);
      alert("Failed to export to LaTeX");
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleWord}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        title="Export to Microsoft Word"
      >
        Export to Word
      </button>
      <button
        onClick={handleMarkdown}
        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        title="Export to Markdown"
      >
        Export to Markdown
      </button>
      <button
        onClick={handleLaTeX}
        className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
        title="Export to LaTeX"
      >
        Export to LaTeX
      </button>
    </div>
  );
}
