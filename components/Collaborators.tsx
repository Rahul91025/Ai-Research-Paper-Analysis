"use client";
import { useState } from "react";

interface CollaboratorsProps {
  paperId: string;
  currentMembers: string[];
}

export default function Collaborators({ paperId, currentMembers }: CollaboratorsProps) {
  const [members, setMembers] = useState(currentMembers);
  const [email, setEmail] = useState("");

  const addMember = async () => {
    const res = await fetch("/api/research/collaborators", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paperId, userId: email }),
    });
    if (res.ok) setMembers([...members, email]);
  };

  return (
    <div className="mt-4">
      <h3 className="font-bold">Collaborators</h3>
      <ul>
        {members.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
      <input
        type="email"
        placeholder="Add collaborator email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-1 mt-2 mr-2"
      />
      <button onClick={addMember} className="px-2 py-1 bg-blue-600 text-white rounded">
        Add
      </button>
    </div>
  );
}