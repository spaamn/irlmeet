"use client";

import { useState } from "react";
import { useDatesStore } from "@/lib/store/dates";
import { useAuthStore } from "@/lib/store/auth";
import { DateCard } from "@/components/DateCard";
import { Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

const CITIES = ["All", "Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata", "Jaipur"];
const ACTIVITIES = ["All", "Coffee", "Brunch", "Dinner", "Trek", "Workshop", "Music", "Art", "Sports"];

export default function BrowseDatesPage() {
  const dates = useDatesStore((s) => s.dates);
  const user = useAuthStore((s) => s.user);
  const [cityFilter, setCityFilter] = useState(user?.city || "All");
  const [activityFilter, setActivityFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = dates
    .filter((d) => d.status === "open")
    .filter((d) => cityFilter === "All" || d.city === cityFilter)
    .filter((d) => activityFilter === "All" || d.activity === activityFilter)
    .filter((d) => !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.location.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[var(--text-1)]">Browse dates</h1>
          <Link href="/dates/new" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-accent text-sm font-semibold">
            Plan a Date
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-3)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-[var(--text-1)]"
            placeholder="Search dates..."
          />
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-8">
          <div>
            <p className="text-xs font-medium text-[var(--text-3)] mb-2 uppercase tracking-wider">City</p>
            <div className="flex flex-wrap gap-2">
              {CITIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCityFilter(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    cityFilter === c ? "btn-accent" : "glass-btn text-[var(--text-2)]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-[var(--text-3)] mb-2 uppercase tracking-wider">Activity</p>
            <div className="flex flex-wrap gap-2">
              {ACTIVITIES.map((a) => (
                <button
                  key={a}
                  onClick={() => setActivityFilter(a)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activityFilter === a ? "btn-accent" : "glass-btn text-[var(--text-2)]"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <p className="text-[var(--text-2)]">No dates found. Try different filters or plan one yourself!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((date) => (
              <DateCard key={date.id} date={date} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
