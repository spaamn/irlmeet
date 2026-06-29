"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, TrendingUp, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    avatar: "SM",
    role: "Date Creator",
    text: "I posted a sunset picnic and got 23 bids in two hours. The winner was charming  we talked until midnight. This actually works.",
    rating: 5,
  },
  {
    name: "James K.",
    avatar: "JK",
    role: "Bidder",
    text: "Won a cooking class auction last week. The whole thing felt safe, transparent, and genuinely exciting. Already bidding on my next one.",
    rating: 5,
  },
  {
    name: "Priya R.",
    avatar: "PR",
    role: "Both",
    text: "New to the city and didn't know a soul. Within a month I'd been on five real dates with real people. The verification system gave me confidence to show up.",
    rating: 5,
  },
];

const liveBids = [
  { user: "alex_d", date: "Rooftop Jazz Night", amount: 185, time: "2m ago" },
  { user: "maya.xo", date: "Sunset Sailing Trip", amount: 340, time: "5m ago" },
  { user: "devon_94", date: "Art Gallery + Wine", amount: 120, time: "8m ago" },
  { user: "luna.rose", date: "Cooking Class Date", amount: 210, time: "12m ago" },
  { user: "kai_north", date: "Hiking Adventure", amount: 95, time: "15m ago" },
];

export default function SocialProof() {
  const [bids, setBids] = useState(liveBids);

  // Simulate live bid updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBids((prev) => {
        const idx = Math.floor(Math.random() * prev.length);
        const increment = Math.floor(Math.random() * 30) + 5;
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          amount: updated[idx].amount + increment,
          time: "just now",
        };
        return updated;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="social-proof" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--accent)]/10 text-[var(--accent)] mb-4">
            Real people, real dates
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-1)] mb-4">
            They showed up.
            <br />
            So will you.
          </h2>
          <p className="max-w-xl mx-auto text-[var(--text-2)] text-lg">
            50,000 people are already turning dating into something they actually look forward to.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Testimonials - 3 columns */}
          <div className="lg:col-span-3 space-y-5">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-11 h-11 rounded-full btn-accent flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {t.avatar}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-semibold text-[var(--text-1)] text-sm">
                          {t.name}
                        </span>
                        <span className="text-xs text-[var(--text-3)] ml-2">
                          {t.role}
                        </span>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 text-amber-400"
                            fill="currentColor"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="relative">
                      <Quote className="absolute -top-1 -left-1 w-4 h-4 text-[var(--accent)]/20" />
                      <p className="text-sm text-[var(--text-2)] leading-relaxed pl-4">
                        {t.text}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Live Bid Feed - 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-6 h-full">
              {/* Feed header */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-[var(--text-1)]">
                  Live Bids
                </span>
                <TrendingUp className="w-4 h-4 text-[var(--accent)] ml-auto" />
              </div>

              {/* Bid list */}
              <div className="space-y-3">
                {bids.map((bid, index) => (
                  <motion.div
                    key={bid.user}
                    layout
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)]"
                  >
                    {/* Rank */}
                    <span className="text-xs font-bold text-[var(--text-tertiary)] w-5">
                      #{index + 1}
                    </span>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[var(--text-1)] truncate">
                        {bid.user}
                      </div>
                      <div className="text-xs text-[var(--text-3)] truncate">
                        {bid.date}
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="text-right">
                      <div className="text-sm font-bold text-[var(--accent)]">
                        ${bid.amount}
                      </div>
                      <div className="text-[10px] text-[var(--text-tertiary)]">
                        {bid.time}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#"
                className="mt-5 block w-full text-center py-3 rounded-xl btn-accent text-sm font-semibold"
              >
                Join the Action
              </a>
            </div>
          </motion.div>
        </div>

        {/* Trust stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "50K+", label: "Members" },
            { value: "200K+", label: "Dates posted" },
            { value: "$2.1M", label: "Bids placed" },
            { value: "4.8", label: "App rating" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card p-5 text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-[var(--text-1)]">
                {stat.value}
              </div>
              <div className="text-xs text-[var(--text-3)] mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
