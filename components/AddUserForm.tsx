"use client";

import { useState } from "react";

interface Props {
  onAdded: () => void;
}

export default function AddUserForm({ onAdded }: Props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, role }),
    });
    const data = await res.json();
    if (data.success) {
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("");
      onAdded();
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2 flex-wrap">
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-1 rounded" required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-1 rounded" required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-1 rounded" required />
      <input type="text" placeholder="Role (Admin/Editor/Viewer)" value={role} onChange={(e) => setRole(e.target.value)} className="border p-1 rounded" required />
      <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded">Add User</button>
    </form>
  );
}
