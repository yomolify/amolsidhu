# amolsidhu.com

[![Next.js](https://img.shields.io/badge/Next.js-15.x-black)](#)
[![React](https://img.shields.io/badge/React-19.x-61dafb)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)](#)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-animations-blueviolet)](#)
[![pnpm](https://img.shields.io/badge/pnpm-10.x-f69220)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Deployment](https://deploy-badge.vercel.app/vercel/YOUR_VERCEL_PROJECT_NAME)](https://YOUR_DOMAIN_OR_VERCEL_URL)

---

A modern web application built with **Next.js**, designed as a performant, scalable, and maintainable codebase.  
This project demonstrates advanced frontend engineering practices, interactive design, and modern deployment workflows.

---

## 🚀 Tech Stack

- **Next.js 15** – App Router, server components, static + dynamic rendering
- **React 19** – concurrent features and modern hooks
- **TypeScript** – strong typing, interfaces, and safer builds
- **Tailwind CSS** – utility-first styling for rapid UI development
- **Framer Motion** – high-performance animations and transitions
- **MDX** – hybrid Markdown + React components for content-driven pages
- **pnpm** – efficient package management
- **ESLint + Prettier** – enforced code quality and formatting standards

---

## ✨ Features & Cool Tech

- **Parallax storytelling sections** powered by `framer-motion` and `useScroll`
- **Dynamic blob SVGs** that adapt to light/dark themes with varied speeds and scaling
- **Interactive charts** with professional-grade visualizations and PNG export
- **Theme-aware UI** with responsive design and dark/light mode toggle
- **Optimized images and assets** using Next.js `Image` component
- **MDX-powered blog system** with syntax highlighting for code snippets
- **Metrics dashboard** (visitors, signups, latency, etc.) with time range filters (7d, 30d, etc.)
- **Continuous deployment pipeline** via Vercel for CI/CD

---

## 📂 Project Structure

```
amolsidhu.com/
├── app/ # App Router pages, layouts, API routes
├── components/ # Reusable React components
├── content/ # Blog posts in MDX format
├── lib/ # Utilities, hooks, and helpers
├── public/ # Static assets
├── styles/ # Global CSS and Tailwind setup
├── package.json # Dependencies and scripts
└── README.md # Project documentation
```

---

## ⚙️ Setup

### Prerequisites

- Node.js `>=18` (20+ recommended)
- pnpm (preferred), or npm/yarn

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/amolsidhu.com.git
cd amolsidhu.com
pnpm install
```

### Development

```bash
pnpm dev
```

### Production

```bash
pnpm build
pnpm start
```

### 🌐 Deployment

- Optimized for Vercel
- CI/CD pipeline: pushes to main → automatic build & deploy
