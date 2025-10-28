"use client";
import { useState, useRef } from "react";

interface VoiceAssistantProps {
  paperId: string;
  onAppendText: (text: string) => void;
}

export default function VoiceAssistant({ paperId, onAppendText }: VoiceAssistantProps) {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      setRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await processAudio(audioBlob);
      };

      mediaRecorder.start();
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Failed to access microphone");
      setRecording(false);
    }
  };

  const stopRecording = () => {
    setRecording(false);
    mediaRecorderRef.current?.stop();
  };

  const processAudio = async (audioBlob: Blob) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "voice.webm");
      formData.append("paperId", paperId);

      const res = await fetch("/api/research/voice", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setTranscript(data.transcript);
        if (data.generatedText) {
          onAppendText(data.generatedText);
        }
      } else {
        alert(data.error || "Failed to process audio");
      }
    } catch (error) {
      console.error("Error processing audio:", error);
      alert("Failed to process audio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Voice Assistant</h3>
      <p className="text-gray-600 mb-4">
        Record your voice to dictate content or ask questions about your research.
      </p>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={recording ? stopRecording : startRecording}
          disabled={loading}
          className={`px-6 py-3 rounded-md font-medium ${
            recording
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {recording ? "Stop Recording" : loading ? "Processing..." : "Start Recording"}
        </button>

        {recording && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-600 font-medium">Recording...</span>
          </div>
        )}
      </div>

      {transcript && (
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-medium text-gray-800 mb-2">Transcript:</h4>
          <p className="text-gray-700">{transcript}</p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        <p>Tips: Try saying "Summarize this section" or "Add a new paragraph about..."</p>
      </div>
    </div>
  );
}
