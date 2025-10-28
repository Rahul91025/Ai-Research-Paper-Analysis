import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateEmbeddings(text: string): Promise<number[]> {
  const model = genAI.getGenerativeModel({ model: "embedding-001" });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

export async function generatePaper(topic: string): Promise<any> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const prompt = `Generate a complete research paper skeleton on the topic: "${topic}". Include: Title, Abstract, Introduction, Related Work, Methodology, Results, Conclusion, References. Structure as JSON with keys: title, abstract, sections (array of {title, content}), references (array of strings). Return only the JSON, no markdown or code blocks.`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  // Clean the text to remove any markdown formatting
  const cleanedText = text.replace(/```json\n?/g, '').replace(/```/g, '').trim();
  const parsed = JSON.parse(cleanedText);

  // Ensure sections content is string, not array
  if (parsed.sections) {
    parsed.sections = parsed.sections.map((section: any) => ({
      title: section.title,
      content: Array.isArray(section.content) ? section.content.join(' ') : section.content
    }));
  }

  return parsed;
}

export async function summarizeText(text: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const prompt = `Summarize the following text in 200 words: ${text}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function expandTopic(topic: string): Promise<{ subtopics: string[], objectives: string[], hypotheses: string[] }> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const prompt = `For the topic "${topic}", suggest 5 subtopics, 3 research objectives, and 2 hypotheses. Return as JSON with keys: subtopics (array), objectives (array), hypotheses (array). Return only the JSON, no markdown or code blocks.`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  // Clean the text to remove any markdown formatting
  const cleanedText = text.replace(/```json\n?/g, '').replace(/```/g, '').trim();
  return JSON.parse(cleanedText);
}

export async function calculateNovelty(text: string, existingPapers: string[]): Promise<number> {
  const embeddings = await Promise.all([generateEmbeddings(text), ...existingPapers.map(generateEmbeddings)]);
  const similarities = embeddings.slice(1).map(emb => cosineSimilarity(embeddings[0], emb));
  const avgSimilarity = similarities.reduce((a, b) => a + b, 0) / similarities.length;
  return 1 - avgSimilarity; // Novelty score: 1 - avg similarity
}
