# irlmeet

**Plan a date. Invite people. Meet in person.**

The dating app for people who are done swiping. Post real-life date experiences, let others express interest, and meet face to face. Made in India with safety-first design.

**Live**: [irlmeet.vercel.app](https://irlmeet.vercel.app)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) + React 18 |
| **Language** | TypeScript 5.5 |
| **Styling** | Tailwind CSS 3.x + custom glassmorphic design system |
| **State** | Zustand 5 (with localStorage persistence) |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Testing** | Playwright (E2E) |
| **Deployment** | Vercel |

---

## Features

- **Landing page** — glassmorphic design with light/dark mode
- **Signup/Login** — 2-step onboarding with profile creation
- **Browse dates** — filter by city, activity, and time (today, tomorrow, weekend)
- **Event detail** — rich descriptions, cover images, host profiles, safety info
- **Create dates** — full form with activity type, location, safety toggles
- **Express interest** — reversible (tap to undo)
- **Profile** — manage your dates, interests, verification
- **Safety center** — emergency button, guidelines, tips
- **Notifications** — unread count with dropdown

---

## Testing

```bash
npm run test:e2e          # headless
npm run test:e2e -- --headed   # visible browser
```

---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run test:e2e
```

---

## Deployment

Every push to `main` triggers Vercel production deployment.

**Production**: https://irlmeet.vercel.app

---

*Built for people who show up.*
