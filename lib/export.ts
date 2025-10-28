import { Document, Packer, Paragraph } from "docx";

export async function exportToWord(paper: any) {
  const doc = new Document();
  doc.addSection({
    children: [
      new Paragraph({ text: paper.title, heading: "Heading1" }),
      new Paragraph(paper.abstract),
      ...paper.sections.map((s: any) => [
        new Paragraph({ text: s.title, heading: "Heading2" }),
        new Paragraph(s.content),
      ]).flat(),
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return buffer; // send as response to download
}

export function exportToMarkdown(paper: any) {
  let md = `# ${paper.title}\n\n`;
  md += `## Abstract\n${paper.abstract}\n\n`;
  paper.sections.forEach((s: any) => {
    md += `## ${s.title}\n${s.content}\n\n`;
  });
  return md;
}

export function exportToLaTeX(paper: any) {
  let tex = `\\section*{${paper.title}}\n\\textbf{Abstract:} ${paper.abstract}\n\n`;
  paper.sections.forEach((s: any) => {
    tex += `\\section{${s.title}}\n${s.content}\n\n`;
  });
  return tex;
}
