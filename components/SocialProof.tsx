"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, TrendingUp, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ananya S.",
    avatar: "AS",
    role: "Mumbai",
    text: "I posted a brunch and 8 people wanted to join in an hour. I picked 3. We still meet every weekend.",
    rating: 5,
  },
  {
    name: "Rohan K.",
    avatar: "RK",
    role: "Bangalore",
    text: "The only app where I actually show up. You know the plan, the place, and the people. No awkward texts.",
    rating: 5,
  },
  {
    name: "Meera P.",
    avatar: "MP",
    role: "Delhi",
    text: "My parents were okay with group dates at public places with verified people. I've felt safe every time.",
    rating: 5,
  },
];

const liveBids = [
  { user: "neha_m", date: "Chai at Blue Tokai, Koramangala", amount: 4, time: "2m ago" },
  { user: "arjun.r", date: "Trek to Sinhagad Fort, Pune", amount: 6, time: "5m ago" },
  { user: "diya_s", date: "Pottery Workshop, Hauz Khas", amount: 3, time: "8m ago" },
  { user: "karan_v", date: "Live Jazz at AntiSOCIAL", amount: 5, time: "12m ago" },
  { user: "isha_p", date: "Brunch at Bastian, Mumbai", amount: 4, time: "15m ago" },
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-1)] mb-12">
            Don&apos;t take our word for it.
          </h2>
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
                  Live Activity
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
                Find a Date Near You
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
