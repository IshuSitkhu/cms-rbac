

"use client"; // Required for client-side navigation and state
import { useState } from "react";
import './signup.css';
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Viewer"); // default role
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      // ✅ Successful signup → navigate to login page
      router.push("/auth/login");
    } catch (err) {
      setError("Server error");
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
  <h1>Signup</h1>
  {error && <p>{error}</p>}
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
    />
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <select value={role} onChange={(e) => setRole(e.target.value)}>
      <option value="Admin">Admin</option>
      <option value="Editor">Editor</option>
      <option value="Viewer">Viewer</option>
    </select>
    <button type="submit" disabled={loading}>
      {loading ? "Registering..." : "Signup"}
    </button>
  </form>
</div>

  );
}
