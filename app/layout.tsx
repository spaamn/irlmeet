import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "irlmeet  Create. Bid. Meet in Real Life.",
  description:
    "The dating auction platform where you create real-life date experiences, let others bid to join, and meet in person. Premium connections start here.",
  keywords: [
    "dating",
    "auction",
    "real life dates",
    "meetup",
    "irl",
    "dating marketplace",
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
