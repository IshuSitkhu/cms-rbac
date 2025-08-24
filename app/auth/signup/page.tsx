// "use client";

// import { useState } from "react";

// export default function SignupPage() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("Admin"); // default role
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, email, password, role }),
//       });

//       const data = await res.json();
//       console.log("Signup response:", data);

//       if (data.success) {
//         setMessage("Signup successful! You can now login.");
//       } else {
//         setMessage("Error: " + data.message);
//       }
//     } catch (err: any) {
//       console.error("Frontend signup error:", err);
//       setMessage("Server error");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
//         <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
//         <select value={role} onChange={e => setRole(e.target.value)}>
//           <option value="Admin">Admin</option>
//           <option value="Editor">Editor</option>
//           <option value="Viewer">Viewer</option>
//         </select>
//         <button type="submit">Signup</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

"use client"; // Required for client-side navigation and state
import { useState } from "react";
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
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
        <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded">
          {loading ? "Registering..." : "Signup"}
        </button>
      </form>
    </div>
  );
}
