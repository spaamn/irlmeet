"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, TrendingUp, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ananya S.",
    avatar: "AS",
    role: "Mumbai, 26",
    text: "I posted a brunch at Bastian and 8 people wanted to join within an hour. I picked 3. We still meet every weekend. I've made more real friends in 2 months than 2 years on other apps.",
    rating: 5,
  },
  {
    name: "Rohan K.",
    avatar: "RK",
    role: "Bangalore, 29",
    text: "I've tried every app. This is the only one where I actually show up. You already know the plan, the place, and the people. No awkward \"so what do you want to do?\" texts.",
    rating: 5,
  },
  {
    name: "Meera P.",
    avatar: "MP",
    role: "Delhi, 24",
    text: "My parents would never let me use a dating app. But group dates at public places? With verified people? They were okay with it. I've been on 5 dates and felt safe every time.",
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
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--accent)]/10 text-[var(--accent)] mb-4">
            Real people, real meetups
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-1)] mb-4">
            Don&apos;t take our word for it.
            <br />
            Take theirs.
          </h2>
          <p className="max-w-xl mx-auto text-[var(--text-2)] text-lg">
            Thousands of people across India have stopped swiping and started
            showing up. Here&apos;s what happened.
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

        {/* Trust stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "50K+", label: "People meeting IRL" },
            { value: "200K+", label: "Dates posted" },
            { value: "15+", label: "Cities in India" },
            { value: "98%", label: "Showed up on time" },
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
