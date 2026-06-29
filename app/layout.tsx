import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "irlmeet — Plan a Date. Invite People. Meet in Person.",
  description:
    "The dating app where you plan real-life dates, invite people, and meet in person. No swiping. No endless chats. Just real plans with real people. Made in India.",
  keywords: [
    "dating",
    "real life dates",
    "meetup",
    "irl",
    "dating app india",
    "group dates",
    "meet in person",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('irlmeet-theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <div className="mesh-bg" aria-hidden="true">
          <div className="mesh-orb mesh-orb-1" />
          <div className="mesh-orb mesh-orb-2" />
        </div>
        <div className="noise-overlay" aria-hidden="true" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
