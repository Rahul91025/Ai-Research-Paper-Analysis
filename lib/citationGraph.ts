import { cosineSimilarity } from "./gemini";

export function generateCitationGraph(papers: any[], targetPaper: any) {
  return papers
    .filter(p => p._id !== targetPaper._id)
    .map((p) => {
      let score = p.references?.length || 0;
      if (p.embeddings && targetPaper.embeddings) {
        const sim = cosineSimilarity(p.embeddings, targetPaper.embeddings);
        if (!isNaN(sim)) {
          score += sim;
        }
      }
      return {
        paperId: p._id,
        influenceScore: isNaN(score) ? 0 : score,
      };
    })
    .sort((a, b) => b.influenceScore - a.influenceScore);
}
