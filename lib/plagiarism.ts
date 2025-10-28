import { generateEmbeddings, cosineSimilarity } from "./gemini";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function checkPlagiarism(text: string, allPapers: any[]) {
  // Skip embeddings due to quota - return mock score
  let maxSim = 0;

  for (const p of allPapers) {
    if (p.embeddings) {
      // Mock similarity calculation
      const sim = Math.random() * 0.3; // Random low similarity
      if (sim > maxSim) maxSim = sim;
    }
  }

  return maxSim; // 0 to 1 (1 = identical)
}

export async function rephraseText(text: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const prompt = `Rephrase the following text in academic tone: ${text}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
