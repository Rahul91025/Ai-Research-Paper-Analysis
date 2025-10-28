import { NextRequest, NextResponse } from "next/server";
import connectToDatabase, { Paper } from "../../../../lib/mongodb";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;
    const paper = await Paper.findById(id);

    if (!paper) {
      return NextResponse.json({ error: "Paper not found" }, { status: 404 });
    }

    return NextResponse.json(paper);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch paper" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;
    const body = await req.json();
    const paper = await Paper.findByIdAndUpdate(id, body, { new: true });

    if (!paper) {
      return NextResponse.json({ error: "Paper not found" }, { status: 404 });
    }

    return NextResponse.json(paper);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update paper" }, { status: 500 });
  }
}
