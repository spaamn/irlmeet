"use client";

import { useState, useMemo } from "react";
import { useDatesStore } from "@/lib/store/dates";
import { useAuthStore } from "@/lib/store/auth";
import { DateCard } from "@/components/DateCard";
import { Search, MapPin, Calendar, Plus, Sparkles } from "lucide-react";
import Link from "next/link";

const CITIES = ["All", "Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata", "Jaipur"];
const ACTIVITIES = ["All", "Coffee", "Brunch", "Dinner", "Trek", "Workshop", "Music", "Art", "Sports"];

const TIME_FILTERS = [
  { label: "All", value: "all" },
  { label: "Today", value: "today" },
  { label: "Tomorrow", value: "tomorrow" },
  { label: "This weekend", value: "weekend" },
  { label: "Next 7 days", value: "week" },
];

function isToday(dateStr: string) {
  const today = new Date();
  const date = new Date(dateStr);
  return date.toDateString() === today.toDateString();
}

function isTomorrow(dateStr: string) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = new Date(dateStr);
  return date.toDateString() === tomorrow.toDateString();
}

function isThisWeekend(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.getDay();
  return day === 0 || day === 6;
}

function isNext7Days(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const week = new Date();
  week.setDate(now.getDate() + 7);
  return date >= now && date <= week;
}

export default function BrowseDatesPage() {
  const dates = useDatesStore((s) => s.dates);
  const user = useAuthStore((s) => s.user);
  const [cityFilter, setCityFilter] = useState(user?.city || "All");
  const [activityFilter, setActivityFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return dates
      .filter((d) => d.status === "open")
      .filter((d) => cityFilter === "All" || d.city === cityFilter)
      .filter((d) => activityFilter === "All" || d.activity === activityFilter)
      .filter((d) => {
        if (timeFilter === "all") return true;
        if (timeFilter === "today") return isToday(d.date);
        if (timeFilter === "tomorrow") return isTomorrow(d.date);
        if (timeFilter === "weekend") return isThisWeekend(d.date);
        if (timeFilter === "week") return isNext7Days(d.date);
        return true;
      })
      .filter((d) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
          d.title.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.venueName?.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [dates, cityFilter, activityFilter, timeFilter, search]);

  const openCount = dates.filter((d) => d.status === "open").length;

  return (
    <div className="min-h-screen pt-20 pb-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-1)]">Browse dates</h1>
            <p className="text-sm text-[var(--text-3)] mt-1">
              {openCount} open date{openCount !== 1 ? "s" : ""} across {CITIES.length - 1} cities
            </p>
          </div>
          <Link href="/dates/new" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-accent text-sm font-semibold">
            <Plus className="w-4 h-4" /> Plan a Date
          </Link>
        </div>

        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-3)]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-[var(--text-1)]" placeholder="Search by name, place, or vibe..." />
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-[var(--accent)]" />
            <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">When</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {TIME_FILTERS.map((t) => (
              <button key={t.value} onClick={() => setTimeFilter(t.value)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${timeFilter === t.value ? "btn-accent" : "glass-btn text-[var(--text-2)]"}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-[var(--accent)]" />
              <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">City</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {CITIES.map((c) => (
                <button key={c} onClick={() => setCityFilter(c)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${cityFilter === c ? "btn-accent" : "glass-btn text-[var(--text-2)]"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[var(--accent)]" />
              <p className="text-xs font-medium text-[var(--text-3)] uppercase tracking-wider">Activity</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {ACTIVITIES.map((a) => (
                <button key={a} onClick={() => setActivityFilter(a)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activityFilter === a ? "btn-accent" : "glass-btn text-[var(--text-2)]"}`}>
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-[var(--text-2)]">
            {filtered.length} date{filtered.length !== 1 ? "s" : ""} found
            {timeFilter !== "all" && ` · ${TIME_FILTERS.find((t) => t.value === timeFilter)?.label}`}
            {cityFilter !== "All" && ` · ${cityFilter}`}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="glass-card p-10 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[var(--glass-bg)] flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-[var(--text-3)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-1)] mb-2">No dates match your search</h3>
            <p className="text-sm text-[var(--text-2)] mb-6">
              {cityFilter !== "All"
                ? `Nothing in ${cityFilter} ${timeFilter !== "all" ? `for ${TIME_FILTERS.find((t) => t.value === timeFilter)?.label.toLowerCase()}` : ""}. Try another city or plan your own.`
                : "Try different filters or be the first to plan a date in your area."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/dates/new" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-accent text-sm font-semibold">
                <Plus className="w-4 h-4" /> Plan a Date
              </Link>
              <button onClick={() => { setCityFilter("All"); setActivityFilter("All"); setTimeFilter("all"); setSearch(""); }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-ghost text-sm font-medium">
                Clear filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((date) => (<DateCard key={date.id} date={date} />))}
          </div>
        )}
      </div>
    </div>
  );
}
