"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Header from "@/components/layout/Header";
import { Link } from "lucide-react";

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
    <div className="flex items-center justify-center bg-[#fffaf2] ">
      <div
        className="
          w-full max-w-md rounded-2xl overflow-hidden
           backdrop-blur-xl
          border border-white/20
          shadow-2xl
           bg-white/50 backdrop-blur-xl
        "
      >
        <Header/>

        <div className="p-10">

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
              text-black placeholder:text-black/60
              border border-gray/20
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
              text-black placeholder:text-black/60
              border border-gray/20
              backdrop-blur-md
              focus:outline-none focus:ring-2 focus:ring-blue-400
            "
          />

          <p>forget password</p>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full py-4 rounded-xl font-semibold text-white
              bg-gradient-to-r from-[#4B2C5E]/80 to-[#4B2C5E]/100
              hover:from-[#4B2C5E]/100 hover:to-[#4B2C5E]/80
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
    </div>
  );
}
