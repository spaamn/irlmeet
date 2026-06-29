"use client";

import { motion } from "framer-motion";
import { Calendar, Gavel, Users, Shield, Bell, Trophy } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Post the date you actually want",
    description:
      "Not a profile. Not a prompt. A real plan: rooftop drinks at sunset, that new gallery, a cooking class. You set the scene. They show up for it.",
  },
  {
    icon: Gavel,
    title: "They compete to join you",
    description:
      "Every bid is someone saying \"I want to be there.\" Watch the auction climb. Feel wanted. Pick the person who made the best offer.",
  },
  {
    icon: Users,
    title: "Meet. For real.",
    description:
      "No three weeks of texting. No \"we should hang out sometime.\" Auction ends, you meet. Face to face. The way dating used to work.",
  },
  {
    icon: Shield,
    title: "Verified, rated, safe",
    description:
      "Real profiles. Mutual ratings after every date. Optional chaperone mode. You know who's showing up and the community vouches for them.",
  },
  {
    icon: Bell,
    title: "Never miss the moment",
    description:
      "Someone just outbid you on a dream date? You know instantly. The auction moves fast. The notifications move faster.",
  },
  {
    icon: Trophy,
    title: "Become someone people bid on",
    description:
      "Complete dates, earn your rating, climb the leaderboard. The best creators get featured. Your track record is your dating resume.",
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
            You&apos;re not a profile.
            <br />
            You&apos;re the experience.
          </h2>
          <p className="max-w-xl mx-auto text-[var(--text-2)] text-lg">
            Other apps sell attention. We sell moments. Every feature exists to
            get you from &ldquo;nice to meet you&rdquo; to &ldquo;nice to meet
            <em> you</em>&rdquo; faster.
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
