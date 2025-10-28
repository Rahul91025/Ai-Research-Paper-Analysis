import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;

// Models
export const User = mongoose.models.User || mongoose.model("User", new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: String,
  role: { type: String, enum: ["USER", "RESEARCHER", "ADMIN"], default: "USER" },
  createdAt: { type: Date, default: Date.now },
}));

export const Paper = mongoose.models.Paper || mongoose.model("Paper", new mongoose.Schema({
  projectId: String,
  title: { type: String, required: true },
  abstract: { type: String, required: true },
  sections: [{ title: String, content: String }],
  references: [String],
  embeddings: [Number],
  noveltyScore: Number,
  similarityScores: [{ paperId: String, score: Number }],
  trendScore: Number,
  plagiarismScore: Number,
  suggestedRephrases: [String],
  citationsGraph: [{ paperId: String, influenceScore: Number }],
  isPublic: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}));

export const Project = mongoose.models.Project || mongoose.model("Project", new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  ownerId: { type: String, required: true },
  memberIds: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}));

export const VoiceLog = mongoose.models.VoiceLog || mongoose.model("VoiceLog", new mongoose.Schema({
  userId: { type: String, required: true },
  paperId: String,
  audioURL: String,
  transcript: String,
  command: String,
  createdAt: { type: Date, default: Date.now },
}));
