"use client";

import { useParams, useRouter } from "next/navigation";
import { useDatesStore, type DatePost } from "@/lib/store/dates";
import { useAuthStore } from "@/lib/store/auth";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Shield,
  Heart,
  Share2,
  Clock,
  Star,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const dates = useDatesStore((s) => s.dates);
  const expressInterest = useDatesStore((s) => s.expressInterest);

  const date = dates.find((d) => d.id === params.id) as DatePost | undefined;
  const [showShareMenu, setShowShareMenu] = useState(false);

  if (!date) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="glass-card p-8 text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-[var(--text-3)] mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[var(--text-1)] mb-3">Date not found</h2>
          <p className="text-sm text-[var(--text-2)] mb-6">
            This date may have been removed or is no longer available.
          </p>
          <Link
            href="/dates"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-accent text-sm font-semibold"
          >
            Browse other dates
          </Link>
        </div>
      </div>
    );
  }

  const isInterested = date.interested.some((i) => i.userId === user?.id);
  const isFull = date.currentPeople >= date.maxPeople;
  const spotsLeft = date.maxPeople - date.currentPeople;

  const handleExpressInterest = () => {
    if (!user) return;
    expressInterest(date.id, {
      userId: user.id,
      name: user.name,
      rating: user.rating,
      verified: user.verified,
      timestamp: new Date().toISOString(),
    });
  };

  const handleAddToCalendar = () => {
    const start = new Date(`${date.date}T${date.time}`);
    const end = new Date(start.getTime() + (date.duration || 120) * 60000);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(date.title)}&dates=${start.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${end.toISOString().replace(/[-:]/g, "").split(".")[0]}Z&location=${encodeURIComponent(date.location)}&details=${encodeURIComponent(date.description)}`;
    window.open(url, "_blank");
  };

  const handleShare = (platform: string) => {
    const text = `Check out this date on irlmeet: ${date.title}`;
    const url = window.location.href;
    const links: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      copy: "",
    };
    if (platform === "copy") {
      navigator.clipboard.writeText(url);
    } else {
      window.open(links[platform], "_blank");
    }
    setShowShareMenu(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-2)] hover:text-[var(--text-1)] mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Cover image */}
        <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[21/9]">
          {date.coverImage ? (
            <img
              src={date.coverImage}
              alt={date.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 flex items-center justify-center">
              <Calendar className="w-16 h-16 text-[var(--accent)]/30" />
            </div>
          )}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-[var(--glass-bg-hover)] transition-colors"
            >
              <Share2 className="w-4 h-4 text-[var(--text-1)]" />
            </button>
            {showShareMenu && (
              <div className="absolute top-12 right-0 glass-card p-2 rounded-xl min-w-[140px]">
                <button
                  onClick={() => handleShare("whatsapp")}
                  className="w-full text-left px-3 py-2 text-sm text-[var(--text-1)] hover:bg-[var(--glass-bg)] rounded-lg"
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="w-full text-left px-3 py-2 text-sm text-[var(--text-1)] hover:bg-[var(--glass-bg)] rounded-lg"
                >
                  Twitter
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="w-full text-left px-3 py-2 text-sm text-[var(--text-1)] hover:bg-[var(--glass-bg)] rounded-lg"
                >
                  Copy link
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title + vibe */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {date.vibe && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--accent)]/10 text-[var(--accent)]">
                    {date.vibe}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--glass-bg)] text-[var(--text-2)]">
                  {date.category}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-1)] mb-2">
                {date.title}
              </h1>
              <p className="text-sm text-[var(--text-2)]">
                by {date.creatorName} &middot; {date.creatorRating}{" "}
                <Star className="w-3 h-3 inline text-amber-400" fill="currentColor" />
              </p>
            </div>

            {/* The Plan */}
            <div className="glass-card p-5">
              <h2 className="text-lg font-semibold text-[var(--text-1)] mb-3">The Plan</h2>
              <p className="text-[var(--text-2)] leading-relaxed">{date.description}</p>
            </div>

            {/* Details */}
            <div className="glass-card p-5 space-y-4">
              <h2 className="text-lg font-semibold text-[var(--text-1)]">Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[var(--accent)] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-1)]">Date & Time</p>
                    <p className="text-sm text-[var(--text-2)]">
                      {new Date(date.date).toLocaleDateString("en-IN", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-[var(--text-2)]">
                      {date.time}
                      {date.duration && ` · ~${Math.round(date.duration / 60)}h`}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[var(--accent)] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-1)]">Location</p>
                    <p className="text-sm text-[var(--text-2)]">{date.venueName}</p>
                    <p className="text-xs text-[var(--text-3)]">{date.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-[var(--accent)] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-1)]">Group size</p>
                    <p className="text-sm text-[var(--text-2)]">
                      {date.currentPeople}/{date.maxPeople} people
                    </p>
                    {spotsLeft <= 3 && spotsLeft > 0 && (
                      <p className="text-xs text-amber-500 font-medium">
                        Only {spotsLeft} spot{spotsLeft > 1 ? "s" : ""} left!
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[var(--accent)] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-1)]">Safety</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {date.isGroup && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/10 text-blue-500">
                          Group date
                        </span>
                      )}
                      {date.womenOnly && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/10 text-purple-500">
                          Women only
                        </span>
                      )}
                      {date.verifiedOnly && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-500">
                          Verified only
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            {date.tags && date.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {date.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--glass-bg)] text-[var(--text-2)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Action card */}
            <div className="glass-card p-5 sticky top-24">
              <div className="space-y-3">
                {!isAuthenticated ? (
                  <>
                    <Link
                      href="/signup"
                      className="w-full py-3 rounded-xl btn-accent text-sm font-semibold flex items-center justify-center"
                    >
                      Sign up to join this date
                    </Link>
                    <p className="text-xs text-[var(--text-3)] text-center">
                      Free to join. No payment required.
                    </p>
                  </>
                ) : isInterested ? (
                  <>
                    <div className="py-3 rounded-xl glass-btn text-sm font-medium text-[var(--text-2)] flex items-center justify-center gap-1.5">
                      <Heart className="w-4 h-4" fill="currentColor" /> You expressed interest
                    </div>
                    <p className="text-xs text-[var(--text-3)] text-center">
                      The host will confirm your spot.
                    </p>
                  </>
                ) : isFull ? (
                  <div className="py-3 rounded-xl glass-btn text-sm font-medium text-[var(--text-3)] text-center">
                    This date is full
                  </div>
                ) : (
                  <button
                    onClick={handleExpressInterest}
                    className="w-full py-3 rounded-xl btn-accent text-sm font-semibold"
                  >
                    Express Interest
                  </button>
                )}

                {isAuthenticated && !isFull && (
                  <button
                    onClick={handleAddToCalendar}
                    className="w-full py-2.5 rounded-xl btn-ghost text-sm font-medium flex items-center justify-center gap-1.5"
                  >
                    <Clock className="w-3.5 h-3.5" /> Add to Calendar
                  </button>
                )}
              </div>

              {/* Host mini profile */}
              <div className="mt-5 pt-5 border-t border-[var(--glass-border)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full btn-accent flex items-center justify-center text-white text-sm font-bold">
                    {date.creatorName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-1)] truncate">
                      {date.creatorName}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400" fill="currentColor" />
                      <span className="text-xs text-[var(--text-2)]">{date.creatorRating}</span>
                      {date.creatorBadges && date.creatorBadges.length > 0 && (
                        <span className="text-xs text-[var(--text-3)]">
                          · {date.creatorBadges[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Link
                  href={`/profile/${date.creatorId}`}
                  className="mt-3 block text-center text-xs text-[var(--accent)] hover:underline"
                >
                  View host profile
                </Link>
              </div>
            </div>

            {/* Interested count */}
            {date.interested.length > 0 && (
              <div className="glass-card p-4 text-center">
                <p className="text-lg font-bold text-[var(--text-1)]">{date.interested.length}</p>
                <p className="text-xs text-[var(--text-3)]">
                  {date.interested.length === 1 ? "person" : "people"} interested
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related dates */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--text-1)]">More dates like this</h2>
            <Link href="/dates" className="text-sm text-[var(--accent)] hover:underline">
              See all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dates
              .filter((d) => d.id !== date.id && d.status === "open")
              .slice(0, 3)
              .map((d) => (
                <Link key={d.id} href={`/dates/${d.id}`} className="glass-card p-4 group">
                  <div className="aspect-[16/9] rounded-lg overflow-hidden mb-3">
                    {d.coverImage ? (
                      <img
                        src={d.coverImage}
                        alt={d.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/5" />
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-[var(--text-1)] truncate">{d.title}</h3>
                  <p className="text-xs text-[var(--text-3)] mt-0.5">{d.date} · {d.city}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
