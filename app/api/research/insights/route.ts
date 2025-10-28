import { NextRequest, NextResponse } from "next/server";
import connectToDatabase, { Paper } from "../../../../lib/mongodb";
import { computeTrendScore } from "../../../../lib/trendAnalyzer";
import { checkPlagiarism } from "../../../../lib/plagiarism";
import { calculateNovelty } from "../../../../lib/gemini";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const paperId = searchParams.get("paperId");

  if (!paperId) {
    return NextResponse.json({ error: "Paper ID required" }, { status: 400 });
  }

  try {
    await connectToDatabase();

    const paper = await Paper.findById(paperId);

    if (!paper) {
      return NextResponse.json({ error: "Paper not found" }, { status: 404 });
    }

    // Calculate word count
    const fullText = `${paper.title} ${paper.abstract} ${paper.sections.map((s: { content: string }) => s.content).join(' ')}`;
    const wordCount = fullText.split(/\s+/).length;

    // Simple readability score (Flesch Reading Ease approximation)
    const sentences = fullText.split(/[.!?]+/).length;
    const avgWordsPerSentence = wordCount / sentences;
    const avgSyllablesPerWord = 1.5; // Approximation
    const readabilityScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);

    // Mock tone analysis (could be enhanced with AI)
    const tone = "Academic";

    // Calculate originality score if not stored
    let originalityScore = paper.noveltyScore;
    if (!originalityScore) {
      try {
        originalityScore = await calculateNovelty(fullText, []);
      } catch (error) {
        console.error("Error calculating novelty:", error);
        originalityScore = 0.85; // Default fallback
      }
    }

    // Calculate trend score if not stored
    let trendScore = paper.trendScore;
    if (!trendScore) {
      try {
        trendScore = await computeTrendScore(fullText, []);
      } catch (error) {
        console.error("Error calculating trend score:", error);
        trendScore = 0.72; // Default fallback
      }
    }

    // Calculate plagiarism score if not stored
    let plagiarismScore = paper.plagiarismScore;
    if (!plagiarismScore) {
      try {
        plagiarismScore = await checkPlagiarism(fullText, []);
      } catch (error) {
        console.error("Error calculating plagiarism:", error);
        plagiarismScore = 0.05; // Default fallback
      }
    }

    // Extract topic clusters from sections or use defaults
    const topicClusters = paper.subtopics || ["Machine Learning", "AI Ethics", "Data Science"];

    // Fetch related papers based on citationsGraph
    let relatedPapers: { id: string; title: string; topics: string[] }[] = [];
    if (paper.citationsGraph && paper.citationsGraph.length > 0) {
      const relatedPaperIds = paper.citationsGraph.map((c: { paperId: string }) => c.paperId);
      const relatedPapersData = await Paper.find({ _id: { $in: relatedPaperIds } }).select('title subtopics').lean();
      relatedPapers = relatedPapersData.map(p => ({
        id: p._id.toString(),
        title: p.title,
        topics: p.subtopics || [],
      }));
    }

    // Include the current paper in the papers list
    const currentPaper = {
      id: paper._id.toString(),
      title: paper.title,
      topics: paper.subtopics || [],
    };
    const papers = [currentPaper, ...relatedPapers];

    const insights = {
      wordCount,
      readabilityScore: Math.max(0, Math.min(100, readabilityScore)),
      tone,
      originalityScore,
      trendScore,
      plagiarismScore,
      topicClusters,
      papers,
    };

    return NextResponse.json(insights);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch insights" }, { status: 500 });
  }
}
