"use client";

import { useAuthStore } from "@/lib/store/auth";
import { useDatesStore } from "@/lib/store/dates";
import { DateCard } from "@/components/DateCard";
import { Plus, Search, LogOut, User } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const dates = useDatesStore((s) => s.dates);
  const openDates = dates.filter((d) => d.status === "open");
  const myDates = dates.filter((d) => d.creatorId === user?.id);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card p-8 text-center max-w-md">
          <h2 className="text-xl font-bold text-[var(--text-1)] mb-3">Log in to continue</h2>
          <p className="text-sm text-[var(--text-2)] mb-6">You need an account to see dates near you.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-accent text-sm font-semibold">
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-1)]">
              Hey, {user.name.split(" ")[0]}
            </h1>
            <p className="text-sm text-[var(--text-2)] mt-1">
              {user.city ? `Dates in ${user.city}` : "Set your city to see dates near you"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dates/new" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-accent text-sm font-semibold">
              <Plus className="w-4 h-4" /> Plan a Date
            </Link>
            <Link href="/profile" className="w-10 h-10 rounded-full glass-btn flex items-center justify-center">
              <User className="w-4 h-4 text-[var(--text-2)]" />
            </Link>
            <button onClick={logout} className="w-10 h-10 rounded-full glass-btn flex items-center justify-center">
              <LogOut className="w-4 h-4 text-[var(--text-2)]" />
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { value: openDates.length, label: "Open dates" },
            { value: myDates.length, label: "Your dates" },
            { value: user.datesCompleted, label: "Completed" },
          ].map((s) => (
            <div key={s.label} className="glass-card p-4 text-center">
              <div className="text-xl font-bold text-[var(--text-1)]">{s.value}</div>
              <div className="text-xs text-[var(--text-3)]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Browse dates */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-[var(--text-1)]">Dates near you</h2>
          <Link href="/dates" className="text-sm text-[var(--accent)] hover:underline flex items-center gap-1">
            <Search className="w-3.5 h-3.5" /> Browse all
          </Link>
        </div>

        {openDates.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <p className="text-[var(--text-2)] mb-4">No dates in your area yet. Be the first!</p>
            <Link href="/dates/new" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-accent text-sm font-semibold">
              <Plus className="w-4 h-4" /> Plan a Date
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {openDates.slice(0, 6).map((date) => (
              <DateCard key={date.id} date={date} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
