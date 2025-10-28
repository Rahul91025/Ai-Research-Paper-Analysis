import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function transcribeAudio(audioFileUrl: string): Promise<string> {
  const response = await axios.post("https://api.vapi.ai/transcribe", {
    audio_url: audioFileUrl,
  }, {
    headers: {
      "Authorization": `Bearer ${process.env.VAPI_API_KEY}`,
      "Content-Type": "application/json",
    },
  });
  return response.data.transcript;
}

export async function analyzeVoiceCommand(transcript: string): Promise<{ type: 'command' | 'content', action?: string, content?: string }> {
  // Use Gemini to classify and extract
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Analyze this voice transcript: "${transcript}". Classify as 'command' or 'content'. If command, extract action (e.g., 'summarize', 'generate'). If content, provide cleaned text. Return JSON: {type, action?, content?}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return JSON.parse(text);
}

export async function startVoiceSession(userId: string): Promise<string> {
  // Start a Vapi voice session
  const response = await axios.post("https://api.vapi.ai/sessions", {
    user_id: userId,
    // Add other config as needed
  }, {
    headers: {
      "Authorization": `Bearer ${process.env.VAPI_API_KEY}`,
      "Content-Type": "application/json",
    },
  });
  return response.data.session_id;
}
