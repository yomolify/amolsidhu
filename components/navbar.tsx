"use client";
import { useEffect, useState } from "react";
import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="mx-auto max-w-6xl px-4 py-3 mt-4 glass">
        <div className="flex items-center justify-between">
          <a href="/" className="font-display text-xl tracking-tight">
            amolsidhu<span className="text-brand-600">.com</span>
          </a>
          <div className="flex items-center gap-3">
            <Link
              href="/#projects"
              className="hidden md:inline-block text-sm px-3 py-2 rounded-lg glass"
            >
              Projects
            </Link>
            <a
              href="/parallax"
              className="hidden md:inline-block text-sm px-3 py-2 rounded-lg glass"
            >
              Parallax
            </a>
            <a
              href="/charts"
              className="hidden md:inline-block text-sm px-3 py-2 rounded-lg glass"
            >
              Charts
            </a>
            <a
              href="/kanban"
              className="hidden md:inline-block text-sm px-3 py-2 rounded-lg glass"
            >
              Kanban
            </a>
            <a
              href="/blog"
              className="hidden md:inline-block text-sm px-3 py-2 rounded-lg glass"
            >
              Blog
            </a>
            <a
              href="/contact"
              className="hidden md:inline-block text-sm px-3 py-2 rounded-lg btn-shimmer text-white"
            >
              Contact
            </a>
            <button
              aria-label="Toggle theme"
              className="p-2 rounded-xl glass hover:shadow-glow transition"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {mounted && theme === "dark" ? (
                <SunMedium className="size-5" />
              ) : (
                <Moon className="size-5" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
