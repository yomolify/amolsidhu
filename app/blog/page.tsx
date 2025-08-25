"use client";
import Link from "next/link";
import { posts } from "@/lib/blog-index";
import type { Route } from "next";
import { useMemo, useState } from "react";
import { Section } from "@/components/section";

export default function BlogIndex() {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const tags = useMemo(() => {
    const t = new Set<string>();
    posts.forEach((p) => p.tags.forEach((tag) => t.add(tag)));
    return Array.from(t).sort();
  }, []);
  const filtered = posts
    .filter(
      (p) =>
        activeTags.length === 0 || activeTags.every((t) => p.tags.includes(t))
    )
    .filter((p) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  function toggleTag(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }
  return (
    <div className=" ">
      <Section
        title="Search"
        subtitle="Filter by tag or search titles and summaries."
      >
        <div className="glass p-4 rounded-2xl mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts..."
              className="flex-1 glass px-3 py-2 rounded-xl outline-none"
            />
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    activeTags.includes(tag)
                      ? "btn-shimmer text-white"
                      : "glass"
                  }`}
                >
                  {tag}
                </button>
              ))}
              {activeTags.length > 0 && (
                <button
                  onClick={() => setActiveTags([])}
                  className="glass px-3 py-1 rounded-full text-sm"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}` as Route}
              className="glass p-5 rounded-2xl block hover:shadow-glow transition"
            >
              <h3 className="text-xl font-display">{p.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {p.summary}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs opacity-70">
                {new Date(p.date).toLocaleDateString()}
              </p>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="glass p-5 rounded-2xl text-center text-sm opacity-80">
              No posts match your filters.
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
