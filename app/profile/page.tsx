"use client";

import { useAuthStore } from "@/lib/store/auth";
import { useDatesStore } from "@/lib/store/dates";
import { Shield, Star, Calendar, LogOut } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, logout, updateProfile } = useAuthStore();
  const dates = useDatesStore((s) => s.dates);
  const myDates = dates.filter((d) => d.creatorId === user?.id);
  const interestedIn = dates.filter((d) => d.interested.some((i) => i.userId === user?.id));

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

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile card */}
        <div className="glass-card p-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl btn-accent flex items-center justify-center text-white text-xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-[var(--text-1)]">{user.name}</h1>
              <p className="text-sm text-[var(--text-2)]">{user.city} {user.age ? `| ${user.age}` : ""}</p>
              <div className="flex items-center gap-3 mt-2">
                {user.verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-500/10 text-green-500">
                    <Shield className="w-3 h-3" /> Verified
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-xs text-[var(--text-3)]">
                  <Star className="w-3 h-3" /> {user.rating || "No rating yet"}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-[var(--text-3)]">
                  <Calendar className="w-3 h-3" /> {user.datesCompleted} completed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* My dates */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-[var(--text-1)] mb-4">Dates you planned ({myDates.length})</h2>
          {myDates.length === 0 ? (
            <p className="text-sm text-[var(--text-3)]">You haven't planned any dates yet.</p>
          ) : (
            <div className="space-y-3">
              {myDates.map((d) => (
                <div key={d.id} className="flex items-center justify-between p-3 rounded-xl bg-[var(--glass-bg)]">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-1)]">{d.title}</p>
                    <p className="text-xs text-[var(--text-3)]">{d.date} | {d.interested.length} interested</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    d.status === "open" ? "bg-green-500/10 text-green-500" :
                    d.status === "confirmed" ? "bg-blue-500/10 text-blue-500" :
                    d.status === "completed" ? "bg-amber-500/10 text-amber-500" :
                    "bg-[var(--text-3)]/10 text-[var(--text-3)]"
                  }`}>
                    {d.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Interested in */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-[var(--text-1)] mb-4">Dates you're interested in ({interestedIn.length})</h2>
          {interestedIn.length === 0 ? (
            <p className="text-sm text-[var(--text-3)]">You haven't expressed interest in any dates yet.</p>
          ) : (
            <div className="space-y-3">
              {interestedIn.map((d) => (
                <div key={d.id} className="flex items-center justify-between p-3 rounded-xl bg-[var(--glass-bg)]">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-1)]">{d.title}</p>
                    <p className="text-xs text-[var(--text-3)]">by {d.creatorName} | {d.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => updateProfile({ verified: true })}
            className="flex-1 py-3 rounded-xl btn-ghost text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4" /> Get Verified
          </button>
          <button
            onClick={logout}
            className="flex-1 py-3 rounded-xl glass-btn text-sm font-semibold text-[var(--text-2)] flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>
      </div>
    </div>
  );
}
