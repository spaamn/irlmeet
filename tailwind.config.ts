import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
        },
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
        "3xl": "64px",
      },
      boxShadow: {
        "glass-sm":
          "0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.02)",
        glass:
          "0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.03), 0 0 0 1px rgba(255,255,255,0.15)",
        "glass-lg":
          "0 16px 64px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.04), 0 0 0 1px rgba(255,255,255,0.2)",
        "glass-xl":
          "0 24px 80px rgba(0,0,0,0.1), inset 0 2px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.05), 0 0 0 1px rgba(255,255,255,0.25)",
        "glass-dark-sm":
          "0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.1)",
        "glass-dark":
          "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.06)",
        "glass-dark-lg":
          "0 16px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.08)",
        "glass-dark-xl":
          "0 24px 80px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)",
        glow: "0 0 40px rgba(244,63,94,0.3), 0 0 80px rgba(244,63,94,0.15)",
        "glow-lg": "0 0 60px rgba(244,63,94,0.35), 0 0 120px rgba(244,63,94,0.15)",
        "glow-dark": "0 0 40px rgba(244,63,94,0.2), 0 0 80px rgba(244,63,94,0.1)",
        "inner-glow": "inset 0 0 30px rgba(255,255,255,0.05)",
        specular: "0 1px 0 rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.1)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        "slide-up": "slideUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        "slide-down": "slideDown 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
        float: "float 8s ease-in-out infinite",
        "float-slow": "float 12s ease-in-out infinite",
        "float-fast": "float 5s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "mesh-move": "meshMove 20s ease-in-out infinite",
        "orb-drift-1": "orbDrift1 25s ease-in-out infinite",
        "orb-drift-2": "orbDrift2 30s ease-in-out infinite",
        "orb-drift-3": "orbDrift3 22s ease-in-out infinite",
        "orb-drift-4": "orbDrift4 28s ease-in-out infinite",
        "text-shimmer": "textShimmer 3s ease-in-out infinite",
        "scroll-hint": "scrollHint 2s ease-in-out infinite",
        counter: "counter 2s ease-out forwards",
        ripple: "ripple 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "33%": { transform: "translateY(-10px) rotate(1deg)" },
          "66%": { transform: "translateY(5px) rotate(-1deg)" },
        },
        pulseGlow: {
          "0%,100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        meshMove: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "25%": { transform: "translate(2%,-3%) scale(1.02)" },
          "50%": { transform: "translate(-1%,2%) scale(0.98)" },
          "75%": { transform: "translate(-3%,-1%) scale(1.01)" },
        },
        orbDrift1: {
          "0%,100%": { transform: "translate(0,0)" },
          "25%": { transform: "translate(40px,-30px)" },
          "50%": { transform: "translate(-20px,50px)" },
          "75%": { transform: "translate(30px,20px)" },
        },
        orbDrift2: {
          "0%,100%": { transform: "translate(0,0)" },
          "33%": { transform: "translate(-50px,30px)" },
          "66%": { transform: "translate(30px,-40px)" },
        },
        orbDrift3: {
          "0%,100%": { transform: "translate(-50%,-50%)" },
          "50%": { transform: "translate(-45%,-55%)" },
        },
        orbDrift4: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(-30px,-20px) scale(1.1)" },
        },
        textShimmer: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        scrollHint: {
          "0%,100%": { transform: "translateY(0)", opacity: "0.5" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
        counter: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        ripple: {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
