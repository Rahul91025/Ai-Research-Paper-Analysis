import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase, { Paper, User } from "../../../../lib/mongodb";
import { generatePaper, generateEmbeddings, expandTopic } from "../../../../lib/gemini";
import { fetchCitations } from "../../../../lib/citationFetcher";
import { analyzeTrends } from "../../../../lib/trendAnalyzer";
import { checkPlagiarism } from "../../../../lib/plagiarism";
import { generateCitationGraph } from "../../../../lib/citationGraph";

export async function POST(req: NextRequest) {
  try {
    // Temporarily disable auth for testing
    // const { userId } = auth();
    // if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();

    const { topic, pdfs }: { topic: string; pdfs?: string[] } = await req.json();

    // Generate paper
    const paperData = await generatePaper(topic);

    // Skip embeddings due to quota limits - use mock data
    const embeddings: number[] = Array(768).fill(0).map(() => Math.random());

    // Fetch citations
    const citations = await fetchCitations(topic);

    // Analyze trends
    const trends = await analyzeTrends(topic);

    // Check plagiarism (against existing papers)
    const allPapers = await Paper.find({});
    const plagiarismScore = await checkPlagiarism(`${paperData.title} ${paperData.abstract} ${paperData.sections.map((s: any) => s.content).join(' ')}`, allPapers);

    // Generate citation graph
    const citationGraph = generateCitationGraph(allPapers, { _id: "temp", embeddings });

    // Expand topic
    const expansion = await expandTopic(topic);

    // Save paper
    const paper = new Paper({
      title: paperData.title,
      abstract: paperData.abstract,
      sections: paperData.sections,
      references: citations,
      embeddings,
      trendScore: trends.score,
      plagiarismScore,
      citationsGraph: citationGraph,
      subtopics: expansion.subtopics,
      objectives: expansion.objectives,
      hypotheses: expansion.hypotheses,
    });
    await paper.save();

    return NextResponse.json({
      ...paperData,
      id: paper._id,
      citations,
      trendScore: trends.score,
      plagiarismScore,
      expansion,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate paper" }, { status: 500 });
  }
}
