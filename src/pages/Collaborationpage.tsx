import React, { useState } from "react";

const Collaborationpage: React.FC = () => {
  const [members, setMembers] = useState<string[]>([]);
  const [newMember, setNewMember] = useState("");

  const addMember = () => {
    if (!newMember.trim()) return;
    setMembers([...members, newMember]);
    setNewMember("");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Collaboration</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter member name..."
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={addMember}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {members.map((m, idx) => (
          <li key={idx} className="p-2 border rounded bg-gray-50">
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Collaborationpage;
