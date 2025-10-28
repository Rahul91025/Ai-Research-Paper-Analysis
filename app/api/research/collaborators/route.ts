import { NextRequest, NextResponse } from "next/server";
import connectToDatabase, { Paper } from "../../../../lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const { paperId, userId } = await req.json();

    await Paper.findByIdAndUpdate(paperId, {
      $addToSet: { memberIds: userId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add collaborator" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();

    const { paperId, userId } = await req.json();

    await Paper.findByIdAndUpdate(paperId, {
      $pull: { memberIds: userId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to remove collaborator" }, { status: 500 });
  }
}
