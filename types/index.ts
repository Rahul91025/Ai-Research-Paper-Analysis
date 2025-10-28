export interface User {
  _id?: string;
  clerkId: string;
  email: string;
  name: string;
  role: "USER" | "RESEARCHER" | "ADMIN";
  createdAt?: Date;
}

export interface Paper {
  _id?: string;
  projectId?: string;
  title: string;
  abstract: string;
  sections: { title: string; content: string }[];
  references?: string[];
  embeddings?: number[];
  noveltyScore?: number;
  similarityScores?: { paperId: string; score: number }[];
  trendScore?: number;            // AI score for trending relevance
  plagiarismScore?: number;       // % similarity with existing corpus
  suggestedRephrases?: string[];  // Rephrased sections
  citationsGraph?: {              // Influence & connections
    paperId: string;
    influenceScore: number;
  }[];
  isPublic?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VoiceLog {
  _id?: string;
  userId: string;
  paperId?: string;           // If linked to a paper
  audioURL: string;
  transcript?: string;
  command?: string;           // Optional: if voice used as command
  createdAt?: Date;
}



export interface Project {
  _id?: string;
  name: string;
  description?: string;
  ownerId: string;
  memberIds?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
