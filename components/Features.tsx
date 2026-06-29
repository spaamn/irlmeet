"use client";

import { motion } from "framer-motion";
import { Calendar, Gavel, Users, Shield, Bell, Trophy } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Plan the date you actually want",
    description:
      "Not a profile. Not a prompt. A real plan: chai at your favourite spot, a trek to that fort, a concert next Friday. You set the scene. They show up for it.",
  },
  {
    icon: Gavel,
    title: "People express interest. You choose.",
    description:
      "Real people see your date and want in. You pick who joins. No algorithms deciding for you. You stay in control of who you meet.",
  },
  {
    icon: Users,
    title: "Meet in person. Safely.",
    description:
      "Group dates or one-on-one. Verified profiles only. Bring a friend if you want. Meet in public places. Safety isn't a feature here, it's the foundation.",
  },
  {
    icon: Shield,
    title: "Verified identities. Always.",
    description:
      "Phone + ID verification. Women can restrict to women-only or verified-only groups. Every person you meet is who they say they are.",
  },
  {
    icon: Bell,
    title: "Never miss a good plan",
    description:
      "Someone posted a date you'd love? Get notified instantly. New dates in your city go live every hour. The good ones fill up fast.",
  },
  {
    icon: Trophy,
    title: "Build your reputation",
    description:
      "Show up, get rated, earn trust. The best hosts get featured. Your track record becomes your credibility. The community rewards people who follow through.",
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
            Stop chatting.
            <br />
            Start meeting.
          </h2>
          <p className="max-w-xl mx-auto text-[var(--text-2)] text-lg">
            Other apps keep you on the app. We get you off it. Every feature
            exists to move you from &ldquo;let&apos;s meet&rdquo; to actually
            meeting.
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
