# arnavmaha.dev

My personal portfolio site — built to be fast, clean, and easy to maintain.

## Stack

- **Framework** — Next.js 15 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS
- **Animations** — Framer Motion
- **Analytics** — Vercel Analytics
- **Deployment** — Vercel

## Features

- Live Spotify now-playing widget
- Valorant rank tracker
- FC Barcelona latest result widget
- Countdown timers for upcoming trips
- Collapsible photo galleries for past adventures
- Dark / light theme with no flash on load
- Fully responsive

## Content

All site content (projects, experience, links, trips) lives in [`content.ts`](./content.ts) — edit that file to update anything.

## Project Structure

```
├── app/
│   ├── globals.css        # Global styles and theme variables
│   ├── layout.tsx         # Root layout and metadata
│   └── page.tsx           # Page — assembles all sections
│
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── HowIBuild.tsx
│   ├── Interests.tsx      # Spotify, Valorant, Barca widgets
│   ├── Adventures.tsx     # Upcoming + past trips
│   ├── Contact.tsx
│   └── ui/                # Shared UI components
│
├── app/api/
│   ├── spotify/           # Now-playing endpoint
│   ├── valorant/          # Rank endpoint
│   └── barca/             # Latest result endpoint
│
└── content.ts             # All editable site content
```
