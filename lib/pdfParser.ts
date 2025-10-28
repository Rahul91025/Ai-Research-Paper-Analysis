import pdfParse from "pdf-parse";

export async function parsePDF(buffer: Buffer): Promise<string> {
  const data = await pdfParse(buffer);
  return data.text;
}

export async function extractSectionsFromPDF(text: string): Promise<{ title: string; content: string }[]> {
  // Simple regex to split into sections (improve as needed)
  const sections = text.split(/\n\s*(?=Abstract|Introduction|Related Work|Methodology|Results|Conclusion|References)/i);
  return sections.map((sec, i) => ({
    title: `Section ${i + 1}`,
    content: sec.trim(),
  }));
}
