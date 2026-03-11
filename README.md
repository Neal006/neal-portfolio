# Neal Daftary — AI & ML Portfolio

A modern, animated portfolio website showcasing AI/ML projects, research, and professional experience. Built with **Next.js 16**, **GSAP**, **Framer Motion**, and **Tailwind CSS**.

## ✨ Features

- **Smooth Animations** — GSAP-powered horizontal scroll, split text reveals, magnetic buttons, and parallax effects
- **Dark/Light Mode** — Theme toggle with CSS custom properties
- **Responsive Design** — Adaptive layouts for mobile and desktop (vertical cards on mobile, horizontal scroll on desktop)
- **Project Showcase** — Interactive project cards with proof images and live links
- **Resume Download** — One-click PDF resume download from navbar and contact section
- **SEO Optimized** — Proper meta tags, semantic HTML, and Open Graph support

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 + CSS Variables |
| Animations | GSAP, Framer Motion, Lenis |
| Deployment | Vercel |

## 📂 Project Structure

```
src/
├── app/              # Next.js App Router (layout, page, globals)
├── components/
│   ├── animations/   # SplitText, ScrollZoom, MagneticButton, MarqueeStrip
│   ├── layout/       # Navbar, Footer, ThemeToggle
│   └── sections/     # Hero, About, Skills, Experience, Works, Education, Contact
├── data/
│   └── portfolio.ts  # All portfolio content (personal, skills, experience, works, etc.)
public/
├── images/           # Avatar and assets
└── proofs/           # Project screenshots and resume PDF
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📝 Customization

All portfolio content is centralized in [`src/data/portfolio.ts`](src/data/portfolio.ts):

- **Personal info** — name, tagline, bio, contact links
- **Skills** — tech stack with icons and colors
- **Experience** — work history with accent colors
- **Works** — project cards with images, tags, and links
- **Education** — degrees and grades
- **Leadership** — positions of responsibility
- **Research** — publications with links


## 📄 License

This project is private and not open for redistribution.

---

**Built by Neal Daftary** · [GitHub](https://github.com/Neal006) · [LinkedIn](https://linkedin.com/in/neal-daftary-45743731a)
