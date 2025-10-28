import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  const { paperId, userId } = await req.json();
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  await db.collection("papers").updateOne(
    { _id: new ObjectId(paperId) },
    { $addToSet: { memberIds: userId } }
  );

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const { paperId, userId } = await req.json();
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  await db.collection("papers").updateOne(
    { _id: new ObjectId(paperId) },
    { $pull: { memberIds: userId } }
  );

  return NextResponse.json({ success: true });
}
