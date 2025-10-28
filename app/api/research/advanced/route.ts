import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase, { Paper } from "../../../../lib/mongodb";
import { checkPlagiarism, rephraseText } from "../../../../lib/plagiarism";
import { computeTrendScore } from "../../../../lib/trendAnalyzer";
import { generateCitationGraph } from "../../../../lib/citationGraph";
import { calculateNovelty, cosineSimilarity } from "../../../../lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();

    const { paperId }: { paperId: string } = await req.json();

    const paper = await Paper.findById(paperId);
    if (!paper) return NextResponse.json({ error: "Paper not found" }, { status: 404 });

    // Novelty finder
    const allPapers = await Paper.find({ _id: { $ne: paper._id } });
    const existingTexts = allPapers.map((p: any) => `${p.title} ${p.abstract}`).slice(0, 10); // Limit for API
    const noveltyScore = await calculateNovelty(`${paper.title} ${paper.abstract}`, existingTexts);

    // Similarity index
    const similarityScores = allPapers.map((p: any) => ({
      paperId: p._id.toString(),
      score: paper.embeddings && p.embeddings ? cosineSimilarity(paper.embeddings, p.embeddings) : 0,
    }));

    // Trend analysis
    const trendScore = await computeTrendScore(`${paper.title} ${paper.abstract}`, allPapers);

    // Plagiarism check
    const plagiarismScore = await checkPlagiarism(`${paper.title} ${paper.abstract}`, allPapers);

    // Rephrase
    const suggestedRephrases = [await rephraseText(paper.abstract)];

    // Citation graph
    const citationsGraph = generateCitationGraph(allPapers, paper);

    // Update paper
    await Paper.findByIdAndUpdate(paperId, {
      noveltyScore,
      similarityScores,
      trendScore,
      plagiarismScore,
      suggestedRephrases,
      citationsGraph,
      updatedAt: new Date(),
    });

    return NextResponse.json({
      noveltyScore,
      similarityScores,
      trendScore,
      plagiarismScore,
      suggestedRephrases,
      citationsGraph,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to process advanced analysis" }, { status: 500 });
  }
}
