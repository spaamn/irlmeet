"use client";

import { motion } from "framer-motion";
import { PenLine, Megaphone, Coins, Handshake } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: PenLine,
    title: "You post a date",
    description:
      "Not a bio. Not a photo gallery. A real plan: \"Sunset hike at Runyon, Saturday 6pm, my treat.\" Set a starting bid. Hit post.",
  },
  {
    number: "02",
    icon: Megaphone,
    title: "People see it and want in",
    description:
      "Your date hits the feed. Real people in your city see it. Some just scroll. Others think \"hell yes\" and place a bid.",
  },
  {
    number: "03",
    icon: Coins,
    title: "The auction climbs",
    description:
      "Bids roll in. You watch the number climb. Every dollar is someone raising their hand saying \"pick me.\" Timer counts down.",
  },
  {
    number: "04",
    icon: Handshake,
    title: "You meet in real life",
    description:
      "Winner's confirmed. You swap numbers. Pick the exact spot. Show up. No games. Just two people who both said yes.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--accent)]/10 text-[var(--accent)] mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-1)] mb-4">
            Four steps.
            <br />
            Zero small talk.
          </h2>
          <p className="max-w-xl mx-auto text-[var(--text-2)] text-lg">
            From your first post to your first real date. No endless matching.
            No &ldquo;hey&rdquo; messages. Just a straight line to showing up.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="glass-card p-6 text-center group h-full">
                  {/* Step number */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[var(--accent)] text-white text-xs font-bold">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center mx-auto mt-4 mb-5 group-hover:scale-110 group-hover:border-[var(--accent)]/30 transition-all duration-300">
                    <step.icon className="w-6 h-6 text-[var(--accent)]" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-[var(--text-1)] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-2)]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
