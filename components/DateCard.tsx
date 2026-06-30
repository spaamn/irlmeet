"use client";

import { useDatesStore, type DatePost } from "@/lib/store/dates";
import { useAuthStore } from "@/lib/store/auth";
import { Calendar, MapPin, Users, Shield, Heart, Clock } from "lucide-react";
import Link from "next/link";

export function DateCard({ date }: { date: DatePost }) {
  const user = useAuthStore((s) => s.user);
  const expressInterest = useDatesStore((s) => s.expressInterest);

  const isInterested = date.interested.some((i) => i.userId === user?.id);
  const isFull = date.currentPeople >= date.maxPeople;

  const handleJoin = () => {
    if (!user) return;
    expressInterest(date.id, {
      userId: user.id,
      name: user.name,
      rating: user.rating,
      verified: user.verified,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="glass-card p-5 flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-[var(--text-1)]">{date.title}</h3>
          <p className="text-xs text-[var(--text-3)] mt-0.5">by {date.creatorName} ({date.creatorRating})</p>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
          date.status === "open" ? "bg-green-500/10 text-green-500" : "bg-[var(--text-3)]/10 text-[var(--text-3)]"
        }`}>
          {date.status}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-1.5 mb-4 text-sm text-[var(--text-2)]">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>{date.date} at {date.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>{date.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>{date.currentPeople}/{date.maxPeople} people</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {date.isGroup && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/10 text-blue-500">Group</span>
        )}
        {date.womenOnly && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/10 text-purple-500">Women only</span>
        )}
        {date.verifiedOnly && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-500 flex items-center gap-0.5">
            <Shield className="w-2.5 h-2.5" /> Verified only
          </span>
        )}
      </div>

      {/* Interest count */}
      {date.interested.length > 0 && (
        <p className="text-xs text-[var(--text-3)] mb-3">
          {date.interested.length} person{date.interested.length > 1 ? "s" : ""} interested
        </p>
      )}

      {/* Action */}
      <div className="mt-auto">
        {!user ? (
          <Link
            href="/signup"
            className="w-full py-2.5 rounded-xl btn-accent text-sm font-semibold flex items-center justify-center"
          >
            Sign up to join
          </Link>
        ) : isInterested ? (
          <div className="space-y-2">
            <button disabled className="w-full py-2.5 rounded-xl glass-btn text-sm font-medium text-[var(--text-2)] flex items-center justify-center gap-1.5">
              <Heart className="w-3.5 h-3.5" fill="currentColor" /> Interested
            </button>
            <Link
              href="/dates"
              className="w-full py-2 rounded-lg text-xs text-center text-[var(--accent)] hover:underline block"
            >
              Browse more dates
            </Link>
          </div>
        ) : isFull ? (
          <div className="space-y-2">
            <button disabled className="w-full py-2.5 rounded-xl glass-btn text-sm font-medium text-[var(--text-3)]">
              Full
            </button>
            <Link
              href="/dates/new"
              className="w-full py-2 rounded-lg text-xs text-center text-[var(--accent)] hover:underline block"
            >
              Plan your own date
            </Link>
          </div>
        ) : (
          <button
            onClick={handleJoin}
            className="w-full py-2.5 rounded-xl btn-accent text-sm font-semibold"
          >
            Express Interest
          </button>
        )}
      </div>
    </div>
  );
}
