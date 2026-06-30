"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Why irlmeet", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Stories", href: "#social-proof" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-4 md:py-6"
      }`}
    >
      <div
        className={`mx-auto max-w-6xl px-4 md:px-8 transition-all duration-500 ${
          scrolled ? "glass-card !rounded-2xl" : ""
        }`}
        style={scrolled ? { padding: "0.75rem 1.5rem" } : {}}
      >
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl btn-accent flex items-center justify-center shadow-glow">
              <Heart className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-[var(--text-1)]">
              irlmeet
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--glass-bg)] transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/signup"
              className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full btn-accent text-sm font-semibold"
            >
              Get Started
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 rounded-full glass-btn flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-4 h-4 text-[var(--text-1)]" />
              ) : (
                <Menu className="w-4 h-4 text-[var(--text-1)]" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pt-4 pb-2 mt-3"
            style={{ borderTop: "1px solid var(--glass-border)" }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--glass-bg)] transition-all"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/signup"
                className="mt-2 px-5 py-3 rounded-xl btn-accent text-sm font-semibold text-center"
              >
                Get Started
              </a>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}
