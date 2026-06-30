"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleLogin = () => {
    login(email, name);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="glass-card p-8 md:p-10 max-w-md w-full">
        <h1 className="text-2xl font-bold text-[var(--text-1)] mb-2">Welcome back</h1>
        <p className="text-sm text-[var(--text-2)] mb-8">Log in to see your dates.</p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[var(--text-2)] mb-1 block">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass-input text-[var(--text-1)]"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[var(--text-2)] mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass-input text-[var(--text-1)]"
              placeholder="you@email.com"
            />
          </div>
          <button
            onClick={handleLogin}
            disabled={!email || !name}
            className="w-full py-3 rounded-xl btn-accent text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-40"
          >
            Log in <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[var(--text-3)] mt-6 text-center">
          New to irlmeet?{" "}
          <a href="/signup" className="text-[var(--accent)] hover:underline">Create an account</a>
        </p>
      </div>
    </div>
  );
}
