# Thorcon — Personal Portfolio

A modern personal portfolio site with gallery, posts, and profile interactions, built with a clean component architecture.

## ✨ Features

- 👤 **Profile header** — banner, avatar (click to zoom), bio, follow toggle with hover-unfollow hint
- 🖼️ **Gallery grid** — click any image to open a modal with full view, comments, and per-comment likes
- 💬 **Post feed** — expandable inline comments + `Xem thêm` show-more toggle
- ❤️ **Persistent state** — likes & follow survive page refresh via `localStorage`
- 🔗 **Reply threads** — nested comments with clickable `@mentions`
- 📋 **Overflow menu** — share profile, copy link, report
- 🌗 **shadcn/ui + Tailwind** — accessible primitives, theming-ready

## 🛠️ Tech Stack

![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-000000?logo=shadcnui&logoColor=white)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Dev server (default: http://localhost:8080)
npm run dev

# Production build → dist/
npm run build

# Preview the build locally
npm run preview

# Run unit tests
npm run test
```

## 📂 Project Structure

```
src/
├── components/       # App-specific UI
│   └── ui/           # shadcn/ui primitives — edit with care
├── pages/            # Route pages
├── hooks/            # Custom React hooks
├── lib/              # Utilities (cn helper, etc.)
└── assets/           # Images, fonts
public/               # Static files served at root (favicon, robots.txt, …)
```

## 📜 License

MIT — fork and adapt freely.

---

Built by [Im-grill](https://github.com/Im-grill) · [@definitely_not_thor](https://github.com/Im-grill)
