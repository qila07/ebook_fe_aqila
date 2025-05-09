import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");
  const router = useRouter();

  const handleLogin = () => {
    const user = { username, role };
    localStorage.setItem("user", JSON.stringify(user));

    if (role === "admin") {
      router.push("/books");
    } else {
      router.push("/books/user");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-400/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-800">
          Login
        </h2>

        <input
          type="text"
          placeholder="Masukkan Username"
          className="w-full px-4 py-2 mb-4 border border-blue-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-blue-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        >
          <option value="user" className="text-black">User</option>
          <option value="admin" className="text-black">Admin</option>
        </select>

        <button
          onClick={handleLogin}
          className="w-full py-2 text-white font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-blue-900 hover:from-blue-900 hover:to-blue-500 transition duration-500"
        >
          Masuk
        </button>
      </div>
    </div>
  );
}
