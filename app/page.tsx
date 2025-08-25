"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link"; // at the top of the file
import { ProjectsGrid } from "@/components/projects-grid";
import { BadgeCloud } from "@/components/badge-cloud";
import { Section } from "@/components/section";
import { Code2, Rocket, Palette } from "lucide-react";

export default function HomePage() {
  return (
    <main className="relative">
      <Section className="pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display tracking-tight leading-[1.05]"
            >
              {/* First line — smaller & lighter */}
              <span className="block text-3xl md:text-4xl font-normal mb-20 text-slate-600 dark:text-slate-300">
                Hi, I'm Amol Sidhu.
              </span>

              {/* Second line — larger & bold */}
              <span className="block text-5xl md:text-7xl font-bold">
                I build <span className="gradient-text">scalable systems</span>{" "}
                with polished UIs.
              </span>
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="relative glass p-6 md:p-8 tilt"
          >
            <div className="tilt-child">
              {/* Code preview */}
              <div className="rounded-xl overflow-hidden border border-white/40 dark:border-slate-800/40 bg-slate-50/60 dark:bg-slate-900/50">
                {/* window chrome */}
                <div className="flex items-center gap-2 px-3 py-2 border-b border-white/40 dark:border-slate-800/40">
                  <span className="size-3 rounded-full bg-rose-400" />
                  <span className="size-3 rounded-full bg-amber-400" />
                  <span className="size-3 rounded-full bg-emerald-400" />
                  <span className="ml-3 text-xs opacity-70">
                    /components/shine.tsx
                  </span>
                </div>

                {/* pretend code */}
                <div className="p-4 font-mono text-[12px] leading-5">
                  <div>
                    <span className="text-fuchsia-600">export</span>{" "}
                    <span className="text-sky-600">function</span>{" "}
                    <span className="text-emerald-600">Shine</span>() {"{"}
                  </div>
                  <div className="pl-4 text-slate-500">
                    // Software doesn’t sparkle by accident, we make it sparkle
                    ✨
                  </div>
                  <div className="pl-4 text-slate-500">
                    // Move fast, stay resilient, ship frequent 🚀
                  </div>
                  <div className="pl-4">
                    <span className="text-sky-600">return</span> (
                  </div>
                  <div className="pl-6">{`<div className="glass rounded-2xl p-4 flex items-center">`}</div>
                  <div className="pl-8">
                    {`<Sparkles className="size-4" />`}{" "}
                  </div>
                  <div className="pl-8">
                    <span className="text-slate-500">{`{/* TODO: automate the boring stuff, celebrate the wins */}`}</span>
                  </div>
                  <div className="pl-6">{`</div>`}</div>
                  <div className="pl-4">);</div>
                  <div>{"}"}</div>
                </div>
              </div>

              {/* Quick facts */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="glass rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <Code2 className="size-4 opacity-80" />
                    <span className="text-xs uppercase tracking-wide opacity-70">
                      Stack
                    </span>
                  </div>
                  <div className="mt-2 text-sm">Next.js, TS, Tailwind</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">
                      Framer Motion
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">
                      Recharts
                    </span>
                  </div>
                </div>

                <div className="glass rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <Palette className="size-4 opacity-80" />
                    <span className="text-xs uppercase tracking-wide opacity-70">
                      Style
                    </span>
                  </div>
                  <div className="mt-2 text-sm">Gradient mesh + glass</div>
                  <div className="mt-1 text-xs opacity-70">
                    Dark‑mode native
                  </div>
                </div>

                <div className="glass rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <Rocket className="size-4 opacity-80" />
                    <span className="text-xs uppercase tracking-wide opacity-70">
                      Focus
                    </span>
                  </div>
                  <div className="mt-2 text-sm">Polished UX & motion</div>
                  <a
                    href="#projects"
                    className="mt-2 inline-block text-xs px-2 py-1 rounded-lg btn-shimmer text-white"
                  >
                    See projects
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
      <Section>
        <BadgeCloud />
      </Section>
      <section className="mb-6"> </section>
      <Section
        id="projects"
        title="Selected Work"
        subtitle="Building end-to-end software that solves business bottlenecks with clean design and reliable engineering."
      >
        <ProjectsGrid />
      </Section>
      <section className="mb-6"> </section>

      <Section>
        <div className="glass p-8 md:p-10 text-center">
          <Sparkles className="mx-auto size-8 mb-4" />
          <h3 className="text-2xl font-display">
            Want this level of shine on your product?
          </h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            I love turning ideas into crisp, production-ready interfaces.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-6 btn-shimmer text-white px-6 py-3 rounded-xl font-medium shadow-glow motion-reduce:transition-none"
          >
            Let's talk
          </Link>
        </div>
      </Section>
    </main>
  );
}
