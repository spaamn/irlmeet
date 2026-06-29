"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-4xl px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Floating heart icon in glass orb */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 rounded-full glass-card flex items-center justify-center mx-auto mb-10 shadow-glow"
          >
            <Heart className="w-8 h-8 text-[var(--accent)]" fill="var(--accent)" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[var(--text-1)] mb-6">
            This weekend, do something
            <br />
            <span className="text-gradient">about it.</span>
          </h2>

          <p className="max-w-xl mx-auto text-lg md:text-xl text-[var(--text-2)] leading-relaxed mb-10">
            Another Saturday scrolling? Or a real plan with real people at a
            real place? Your city is full of people who want to meet. They just
            need someone to go first.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="group inline-flex items-center gap-2.5 px-10 py-5 rounded-full btn-accent text-lg font-semibold"
            >
              Plan Your First Date
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-5 rounded-full btn-ghost text-base font-semibold"
            >
              See How It Works
            </a>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10 text-sm text-[var(--text-3)]"
          >
            Free to start. No payment between users. Show up when you&apos;re
            ready.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
