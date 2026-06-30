"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const signup = useAuthStore((s) => s.signup);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Mumbai",
    age: "",
    gender: "",
  });

  const cities = ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata", "Jaipur"];

  const handleSignup = () => {
    signup({
      ...form,
      age: parseInt(form.age) || 0,
    });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="glass-card p-8 md:p-10 max-w-md w-full">
        <h1 className="text-2xl font-bold text-[var(--text-1)] mb-2">Join irlmeet</h1>
        <p className="text-sm text-[var(--text-2)] mb-8">Real dates. Real people. Real simple.</p>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[var(--text-2)] mb-1 block">Full name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass-input text-[var(--text-1)]"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--text-2)] mb-1 block">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass-input text-[var(--text-1)]"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--text-2)] mb-1 block">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass-input text-[var(--text-1)]"
                placeholder="+91 98765 43210"
              />
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!form.name || !form.email}
              className="w-full py-3 rounded-xl btn-accent text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-40"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[var(--text-2)] mb-1 block">City</label>
              <select
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass-input text-[var(--text-1)]"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--text-2)] mb-1 block">Age</label>
              <input
                type="number"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass-input text-[var(--text-1)]"
                placeholder="25"
                min={18}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--text-2)] mb-1 block">Gender</label>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass-input text-[var(--text-1)]"
              >
                <option value="">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl btn-ghost text-sm font-semibold flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={handleSignup}
                disabled={!form.city || !form.age || parseInt(form.age) < 18}
                className="flex-1 py-3 rounded-xl btn-accent text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-40"
              >
                Create Account <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <p className="text-xs text-[var(--text-3)] mt-6 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-[var(--accent)] hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
}
