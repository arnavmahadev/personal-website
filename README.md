# arnavmaha.dev

My personal portfolio site.

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
- Dark / light theme

## Project Structure

```
├── app/
│   ├── globals.css        # Global styles and theme variables
│   ├── layout.tsx         # Root layout and metadata
│   └── page.tsx           # Page — assembles all sections
│
├── components/
│   ├── Navbar.tsx         # Header
│   ├── Hero.tsx           # Hero page
│   ├── About.tsx          # About me
│   ├── Experience.tsx     # Work experience
│   ├── Projects.tsx       # Featured projects
│   ├── Interests.tsx      # Spotify, Valorant, Barca widgets
│   ├── Adventures.tsx     # Upcoming and past trips
│   ├── Contact.tsx        # Contact info
│   ├── Footer.tsx         # Footer
│   └── ui/                # Shared UI components
│
├── app/api/
│   ├── spotify/           # Now-playing endpoint
│   ├── valorant/          # Rank endpoint
│   └── barca/             # Latest result endpoint
│
└── content.ts             # All editable site content
```
