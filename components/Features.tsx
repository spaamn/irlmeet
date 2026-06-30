"use client";

import { motion } from "framer-motion";
import { Calendar, Users, Shield } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Plan the date you actually want",
    description:
      "Chai at your favourite spot, a trek to that fort, a concert next Friday. You set the scene. They show up for it.",
  },
  {
    icon: Users,
    title: "You choose who joins",
    description:
      "People express interest. You pick. Group dates or one-on-one. Verified profiles only. You stay in control.",
  },
  {
    icon: Shield,
    title: "Safe by design",
    description:
      "Phone + ID verification. Women-only options. Bring a friend. Meet in public. Safety isn't a feature, it's the foundation.",
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-1)] mb-12">
            Stop chatting.
            <br />
            Start meeting.
          </h2>
        </motion.div>

        {/* Feature cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="glass-card p-6 group cursor-default"
            >
              <div className="w-11 h-11 rounded-xl btn-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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
