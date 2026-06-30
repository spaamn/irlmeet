"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth";
import { useDatesStore } from "@/lib/store/dates";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const ACTIVITIES = ["Coffee", "Brunch", "Dinner", "Trek", "Workshop", "Music", "Art", "Sports", "Other"];
const CITIES = ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata", "Jaipur"];

export default function NewDatePage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const addDate = useDatesStore((s) => s.addDate);
  const [form, setForm] = useState({
    title: "",
    description: "",
    activity: "Coffee",
    location: "",
    city: user?.city || "Mumbai",
    date: "",
    time: "",
    maxPeople: 2,
    isGroup: true,
    womenOnly: false,
    verifiedOnly: false,
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card p-8 text-center max-w-md">
          <h2 className="text-xl font-bold text-[var(--text-1)] mb-3">Log in first</h2>
          <Link href="/signup" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-accent text-sm font-semibold">
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    addDate({
      creatorId: user.id,
      creatorName: user.name,
      creatorRating: user.rating,
      ...form,
    });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-[var(--text-2)] hover:text-[var(--text-1)] mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="glass-card p-6 md:p-8">
          <h1 className="text-xl font-bold text-[var(--text-1)] mb-6">Plan a date</h1>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[var(--text-2)] mb-1 block">What are you planning?</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass-input text-[var(--text-1)]"
                placeholder="e.g. Chai at Blue Tokai"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--text-2)] mb-1 block">Activity type</label>
              <div className="flex flex-wrap gap-2">
                {ACTIVITIES.map((a) => (
                  <button
                    key={a}
                    onClick={() => setForm({ ...form, activity: a })}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      form.activity === a
                        ? "btn-accent"
                        : "glass-btn text-[var(--text-2)]"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--text-2)] mb-1 block">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass-input text-[var(--text-1)] min-h-[80px]"
                placeholder="What's the plan?"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-[var(--text-2)] mb-1 block">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-input text-[var(--text-1)]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[var(--text-2)] mb-1 block">Time</label>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-input text-[var(--text-1)]"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--text-2)] mb-1 block">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass-input text-[var(--text-1)]"
                placeholder="e.g. Blue Tokai, Koramangala"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--text-2)] mb-1 block">City</label>
              <select
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass-input text-[var(--text-1)]"
              >
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--text-2)] mb-1 block">Max people</label>
              <input
                type="number"
                value={form.maxPeople}
                onChange={(e) => setForm({ ...form, maxPeople: parseInt(e.target.value) || 2 })}
                className="w-full px-4 py-3 rounded-xl glass-input text-[var(--text-1)]"
                min={1}
                max={20}
              />
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isGroup}
                  onChange={(e) => setForm({ ...form, isGroup: e.target.checked })}
                  className="w-4 h-4 rounded accent-[var(--accent)]"
                />
                <span className="text-sm text-[var(--text-2)]">Group date</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.womenOnly}
                  onChange={(e) => setForm({ ...form, womenOnly: e.target.checked })}
                  className="w-4 h-4 rounded accent-[var(--accent)]"
                />
                <span className="text-sm text-[var(--text-2)]">Women only</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.verifiedOnly}
                  onChange={(e) => setForm({ ...form, verifiedOnly: e.target.checked })}
                  className="w-4 h-4 rounded accent-[var(--accent)]"
                />
                <span className="text-sm text-[var(--text-2)]">Verified profiles only</span>
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!form.title || !form.date || !form.location}
              className="w-full py-3 rounded-xl btn-accent text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-40"
            >
              Post This Date <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
