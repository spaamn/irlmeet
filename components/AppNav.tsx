"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth";
import { Heart, Plus, Search, User, LogOut, Home, Calendar } from "lucide-react";

export default function AppNav() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();

  // Only show on app pages (not landing page)
  if (pathname === "/") return null;

  const navItems = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/dates", label: "Browse", icon: Search },
    { href: "/dates/new", label: "Plan", icon: Plus },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="glass-card !rounded-2xl px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg btn-accent flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 text-white" fill="white" />
            </div>
            <span className="text-base font-semibold tracking-tight text-[var(--text-1)]">
              irlmeet
            </span>
          </Link>

          {/* Desktop nav */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                        : "text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--glass-bg)]"
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Right side */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dates/new"
                  className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full btn-accent text-sm font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" /> Plan a Date
                </Link>
                <button
                  onClick={logout}
                  className="w-9 h-9 rounded-full glass-btn flex items-center justify-center"
                  aria-label="Log out"
                >
                  <LogOut className="w-3.5 h-3.5 text-[var(--text-2)]" />
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden md:inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="hidden md:inline-flex items-center px-5 py-2 rounded-full btn-accent text-sm font-semibold"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile bottom nav (authenticated) */}
        {isAuthenticated && (
          <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50">
            <div className="glass-card !rounded-2xl px-2 py-2 flex items-center justify-around">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-[10px] font-medium transition-all ${
                      isActive
                        ? "text-[var(--accent)]"
                        : "text-[var(--text-3)]"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
