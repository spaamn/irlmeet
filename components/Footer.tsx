"use client";

import { Heart, Github, Twitter, Instagram, Mail } from "lucide-react";

const footerLinks = {
  Product: ["Features", "How It Works", "Pricing", "Safety"],
  Company: ["About", "Blog", "Careers", "Press"],
  Support: ["Help Center", "Contact", "Privacy Policy", "Terms of Service"],
  Community: ["Discord", "Twitter", "Instagram", "Nostr"],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--border-subtle)]">
      <div className="mx-auto max-w-6xl px-4 md:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl btn-accent flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="text-lg font-semibold text-[var(--text-primary)]">
                irlmeet
              </span>
            </a>
            <p className="text-sm text-[var(--text-2)] leading-relaxed mb-5">
              The dating app for people who are done swiping. Post a date, get
              bids, meet in real life.
            </p>
            {/* Social icons */}
            <div className="flex gap-2">
              {[Github, Twitter, Instagram, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full glass-btn flex items-center justify-center hover:border-[var(--accent)]/30 transition-colors"
                >
                  <Icon className="w-4 h-4 text-[var(--text-2)]" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-[var(--text-1)] mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-3)]">
            &copy; {new Date().getFullYear()} irlmeet. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-3)]">
            Built for people who show up.
          </p>
        </div>
      </div>
    </footer>
  );
}
