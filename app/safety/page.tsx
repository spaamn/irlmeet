"use client";

import Link from "next/link";
import {
  Shield,
  AlertTriangle,
  Phone,
  MapPin,
  Users,
  Heart,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

export default function SafetyPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-[var(--accent)]" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-1)] mb-2">Your Safety Matters</h1>
          <p className="text-[var(--text-2)] max-w-lg mx-auto">
            We&apos;ve built irlmeet so you can meet new people with confidence. Here&apos;s how we keep you safe — and how you can help.
          </p>
        </div>

        {/* Emergency Button */}
        <div className="glass-card p-6 mb-6 border border-red-500/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-[var(--text-1)] mb-1">Emergency Assistance</h2>
              <p className="text-sm text-[var(--text-2)] mb-4">
                If you ever feel unsafe during a date, tap the emergency button. Your location will be shared with your trusted contacts immediately.
              </p>
              <button className="px-5 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold flex items-center gap-2">
                <Phone className="w-4 h-4" /> Test Emergency Button
              </button>
            </div>
          </div>
        </div>

        {/* Safety Features */}
        <div className="space-y-4 mb-10">
          <h2 className="text-xl font-semibold text-[var(--text-1)]">Built-in Safety Features</h2>

          {[
            {
              icon: CheckCircle,
              title: "Verified Profiles",
              description: "Every user verifies their phone number. ID verification unlocks a gold badge and access to verified-only dates.",
            },
            {
              icon: MapPin,
              title: "Public Places Only",
              description: "All dates happen at public venues — cafes, parks, galleries. No home addresses. Ever.",
            },
            {
              icon: Users,
              title: "Group Dates by Default",
              description: "Most dates are group dates. Meet in a low-pressure setting with others who share your interests.",
            },
            {
              icon: Heart,
              title: "Women-First Options",
              description: "Women can host women-only dates and require all attendees to be verified. You control who joins.",
            },
            {
              icon: Shield,
              title: "Community Ratings",
              description: "After every date, attendees rate their experience. Hosts with low ratings are removed from the platform.",
            },
            {
              icon: Phone,
              title: "Chaperone Mode",
              description: "Bring a friend on your first date. We'll cover their cost so you never have to go alone.",
            },
          ].map((feature) => (
            <div key={feature.title} className="glass-card p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                <feature.icon className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-1)] mb-1">{feature.title}</h3>
                <p className="text-sm text-[var(--text-2)]">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Safety Tips */}
        <div className="glass-card p-6 mb-6">
          <h2 className="text-lg font-semibold text-[var(--text-1)] mb-4">Safety Tips for Every Date</h2>
          <ul className="space-y-3">
            {[
              "Always meet in a public place for your first date",
              "Tell a friend where you're going and who you're meeting",
              "Trust your instincts — if something feels wrong, leave",
              "Don't share personal info (home address, workplace) until you're comfortable",
              "Report any inappropriate behavior immediately",
              "Use the emergency button if you ever feel unsafe",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-2)]">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center">
          <p className="text-sm text-[var(--text-3)] mb-3">Have a safety concern?</p>
          <Link
            href="mailto:safety@irlmeet.in"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-ghost text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" /> Contact Safety Team
          </Link>
        </div>
      </div>
    </div>
  );
}
