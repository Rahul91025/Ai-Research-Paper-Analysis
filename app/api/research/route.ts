import { NextRequest, NextResponse } from "next/server";
import connectToDatabase, { Paper } from "../../../lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const papers = await Paper.find({}).sort({ createdAt: -1 });

    return NextResponse.json(papers);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch papers" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const paper = new Paper(body);
    await paper.save();

    return NextResponse.json(paper, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create paper" }, { status: 500 });
  }
}
