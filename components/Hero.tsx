"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20">
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-10"
        >
          <Sparkles className="w-4 h-4 text-[var(--accent)]" />
          <span className="text-sm font-medium text-[var(--text-2)]">
            The dating app for people who are done swiping
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] mb-8 text-[var(--text-1)]"
        >
          The dates you actually want.
          <br />
          With people who actually
          <br />
          <span className="text-gradient-shimmer">show up.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-[var(--text-2)] leading-relaxed mb-12"
        >
          You post a date. A rooftop dinner. A sunrise hike. A gallery opening.
          Real people bid to join you. When the auction ends, you meet face to
          face. No endless texting. No ghosting. No &ldquo;hey.&rdquo; Just a
          real plan with someone who wanted to be there.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#"
            className="group inline-flex items-center gap-2.5 px-9 py-4 rounded-full btn-accent text-base font-semibold"
          >
            Create Your Date
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full btn-ghost text-base font-semibold"
          >
            See How It Works
          </a>
        </motion.div>

        {/* Social proof stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 glass-card p-6 md:p-8 max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: "50K+", label: "People on irlmeet" },
              { value: "12K", label: "Real dates happened" },
              { value: "98%", label: "Actually met up" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[var(--text-1)] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-[var(--text-3)] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[var(--text-3)]"
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll to explore</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
