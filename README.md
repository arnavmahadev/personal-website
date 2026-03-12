# Arnav Mahadev — Portfolio

Personal portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
portfolio/
├── app/
│   ├── globals.css       # Global styles, custom utilities
│   ├── layout.tsx        # Root layout, metadata
│   └── page.tsx          # Home page — assembles all sections
│
├── components/
│   ├── Navbar.tsx        # Sticky nav with scroll/active state
│   ├── Hero.tsx          # Landing section with CTAs
│   ├── About.tsx         # Bio + highlights grid
│   ├── Projects.tsx      # Featured project cards
│   ├── Experience.tsx    # Timeline-style experience section
│   ├── Skills.tsx        # Skill chips grouped by category
│   ├── HowIBuild.tsx     # Philosophy / 3-pillar section
│   ├── Contact.tsx       # Contact links
│   ├── Footer.tsx        # Minimal footer
│   │
│   └── ui/
│       ├── CodeGrid.tsx      # Animated hero visual
│       ├── ProjectCard.tsx   # Reusable project card component
│       ├── SectionHeading.tsx # Consistent section headers
│       ├── SectionWrapper.tsx # Scroll-reveal wrapper with Framer Motion
│       └── SkillChip.tsx     # Skill tag component
```

## Customizing Content

### Links to update (marked with `TODO` comments)

| File | What to change |
|------|---------------|
| `components/Navbar.tsx` | `RESUME_URL`, `GITHUB_URL`, `LINKEDIN_URL` |
| `components/Hero.tsx` | `RESUME_URL`, `GITHUB_URL`, `LINKEDIN_URL`, `EMAIL` |
| `components/Contact.tsx` | `EMAIL`, `GITHUB_URL`, `LINKEDIN_URL`, `RESUME_URL` |
| `components/Projects.tsx` | GitHub repo URLs per project |

### To add/edit projects
Edit the `projects` array in `components/Projects.tsx`.

Each project object accepts:
```ts
{
  name: string
  hook: string        // one-liner value prop
  description: string
  tech: string[]
  github: string
  demo?: string       // optional live demo URL
  featured?: boolean  // shows "Featured" badge
}
```

### To add/edit experience
Edit the `experiences` array in `components/Experience.tsx`.

### To update skills
Edit `skillGroups` and `interests` in `components/Skills.tsx`.

## Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel (recommended)
npx vercel
```

Or connect your GitHub repo to [Vercel](https://vercel.com) for automatic deploys.
