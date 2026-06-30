"use client";

import { useDatesStore, type DatePost } from "@/lib/store/dates";
import { useAuthStore } from "@/lib/store/auth";
import { Calendar, MapPin, Users, Shield, Heart, Clock } from "lucide-react";
import Link from "next/link";

export function DateCard({ date }: { date: DatePost }) {
  const user = useAuthStore((s) => s.user);
  const expressInterest = useDatesStore((s) => s.expressInterest);
  const withdrawInterest = useDatesStore((s) => s.withdrawInterest);

  const isInterested = date.interested.some((i) => i.userId === user?.id);
  const isFull = date.currentPeople >= date.maxPeople;

  const handleToggleInterest = () => {
    if (!user) return;
    if (isInterested) {
      withdrawInterest(date.id, user.id);
    } else {
      expressInterest(date.id, {
        userId: user.id,
        name: user.name,
        rating: user.rating,
        verified: user.verified,
        timestamp: new Date().toISOString(),
      });
    }
  };

  return (
    <Link href={`/dates/${date.id}`} className="glass-card p-5 flex flex-col group">
      {/* Cover image */}
      <div className="aspect-[16/9] rounded-xl overflow-hidden mb-3 -mx-1 -mt-1">
        {date.coverImage ? (
          <img
            src={date.coverImage}
            alt={date.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--accent)]/15 to-[var(--accent)]/5 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-[var(--accent)]/30" />
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-[var(--text-1)] truncate group-hover:text-[var(--accent)] transition-colors">{date.title}</h3>
          <p className="text-xs text-[var(--text-3)] mt-0.5">by {date.creatorName} ({date.creatorRating})</p>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ml-2 ${
          date.status === "open" ? "bg-green-500/10 text-green-500" : "bg-[var(--text-3)]/10 text-[var(--text-3)]"
        }`}>
          {date.status}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-1 mb-3 text-sm text-[var(--text-2)]">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>{new Date(date.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })} at {date.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span className="truncate">{date.venueName || date.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>{date.currentPeople}/{date.maxPeople} people</span>
          {date.maxPeople - date.currentPeople <= 2 && date.maxPeople - date.currentPeople > 0 && (
            <span className="text-[10px] text-amber-500 font-medium">· Filling fast</span>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {date.isGroup && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/10 text-blue-500">Group</span>
        )}
        {date.womenOnly && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/10 text-purple-500">Women only</span>
        )}
        {date.verifiedOnly && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-500 flex items-center gap-0.5">
            <Shield className="w-2.5 h-2.5" /> Verified
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
          <span className="w-full py-2.5 rounded-xl btn-accent text-sm font-semibold flex items-center justify-center">
            Sign up to join
          </span>
        ) : isInterested ? (
          <div className="space-y-2">
            <span
              onClick={(e) => { e.preventDefault(); handleToggleInterest(); }}
              className="w-full py-2.5 rounded-xl glass-btn text-sm font-medium text-[var(--accent)] flex items-center justify-center gap-1.5 cursor-pointer hover:bg-red-500/10 hover:text-red-500 transition-colors"
            >
              <Heart className="w-3.5 h-3.5" fill="currentColor" /> Interested — tap to undo
            </span>
          </div>
        ) : isFull ? (
          <span className="w-full py-2.5 rounded-xl glass-btn text-sm font-medium text-[var(--text-3)]">
            Full
          </span>
        ) : (
          <span
            onClick={(e) => {
              e.preventDefault();
              handleToggleInterest();
            }}
            className="w-full py-2.5 rounded-xl btn-accent text-sm font-semibold flex items-center justify-center cursor-pointer"
          >
            Express Interest
          </span>
        )}
      </div>
    </Link>
  );
}
