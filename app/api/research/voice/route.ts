import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase, { VoiceLog, Paper } from "../../../../lib/mongodb";
import { transcribeAudio, analyzeVoiceCommand } from "../../../../lib/vapi";
import { summarizeText, generatePaper } from "../../../../lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();

    const { paperId, audioURL }: { paperId?: string; audioURL: string } = await req.json();

    // Transcribe audio
    const transcript = await transcribeAudio(audioURL);

    // Analyze command
    const analysis = await analyzeVoiceCommand(transcript);

    let response = { transcript, analysis };

    if (analysis.type === 'command') {
      if (analysis.action === 'summarize' && paperId) {
        const paper = await Paper.findById(paperId);
        if (paper) {
          const summary = await summarizeText(`${paper.abstract} ${paper.sections.map(s => s.content).join(' ')}`);
          response = { ...response, summary };
        }
      } else if (analysis.action === 'generate') {
        const paperData = await generatePaper(analysis.content || 'AI Research');
        response = { ...response, generatedPaper: paperData };
      }
    }

    // Save voice log
    const voiceLog = new VoiceLog({
      userId,
      paperId,
      audioURL,
      transcript,
      command: analysis.action,
    });
    await voiceLog.save();

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to process voice" }, { status: 500 });
  }
}
