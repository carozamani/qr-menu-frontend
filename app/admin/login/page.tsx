"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        window.location.href = "/admin";
      }
    } catch {
      setErrorMsg("یک خطای غیرمنتظره رخ داد.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4">
      <div
        className="
          w-full max-w-md p-10 rounded-2xl
          bg-white/10 backdrop-blur-xl
          border border-white/20
          shadow-2xl
        "
      >
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="
              w-full px-5 py-4 rounded-xl
              bg-white/10 text-white placeholder:text-white/60
              border border-white/20
              backdrop-blur-md
              focus:outline-none focus:ring-2 focus:ring-blue-400
            "
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="
              w-full px-5 py-4 rounded-xl
              bg-white/10 text-white placeholder:text-white/60
              border border-white/20
              backdrop-blur-md
              focus:outline-none focus:ring-2 focus:ring-blue-400
            "
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full py-4 rounded-xl font-semibold text-white
              bg-gradient-to-r from-blue-500 to-cyan-400
              hover:from-blue-600 hover:to-cyan-500
              transition-all
              ${loading ? "opacity-60 cursor-not-allowed" : ""}
            `}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {errorMsg && (
          <p className="mt-6 text-center text-red-400 font-medium">
            {errorMsg}
          </p>
        )}
      </div>
    </div>
  );
}
