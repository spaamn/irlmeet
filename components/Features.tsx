"use client";

import { motion } from "framer-motion";
import { Calendar, Gavel, Users, Shield, Bell, Trophy } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Dream it up",
    description:
      "A rooftop dinner. A pottery workshop. A sunrise hike. Design the date you actually want to go on  then put it on the block.",
  },
  {
    icon: Gavel,
    title: "Watch them bid",
    description:
      "Real people see your date and compete to join. Every bid is a someone who genuinely wants to meet you. The excitement is real.",
  },
  {
    icon: Users,
    title: "Meet face to face",
    description:
      "Auction ends, you connect. Swap messages, pick the exact spot, and show up. No endless texting  just a real plan with a real person.",
  },
  {
    icon: Shield,
    title: "Built on trust",
    description:
      "Verified profiles, mutual ratings, and optional chaperone mode. Every layer designed so you feel safe showing up.",
  },
  {
    icon: Bell,
    title: "Never miss a bid",
    description:
      "Instant alerts when someone bids on your date  or when you're outbid. The auction moves fast. You'll move faster.",
  },
  {
    icon: Trophy,
    title: "Build your reputation",
    description:
      "Complete dates, earn badges, climb the leaderboard. The best daters get featured. Your track record becomes your superpower.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32">
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
            Why irlmeet
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-1)] mb-4">
            Dating apps put you on a shelf.
            <br />
            We put you on the calendar.
          </h2>
          <p className="max-w-xl mx-auto text-[var(--text-2)] text-lg">
            Every feature exists for one reason: to get you from &ldquo;maybe&rdquo; to
            &ldquo;see you there&rdquo; as fast as possible.
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="glass-card p-7 group cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl btn-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-1)] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-2)]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
