"use client";
import { motion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import { projects } from "@/lib/projects";
import { Settings } from "lucide-react";

// illustrations
import HomepageArt from "@/components/illustrations/HomepageArt";
import ParallaxArt from "@/components/illustrations/ParallaxArt";
import ChartsArt from "@/components/illustrations/ChartsArt";
import KanbanArt from "@/components/illustrations/KanbanArt";
import BlogArt from "@/components/illustrations/BlogArt";

function ArtForSlug({ slug }: { slug: string }) {
  // Use vibrant base colors with no opacity modifiers
  switch (slug) {
    case "home":
      return (
        <HomepageArt className="h-full w-full text-zinc-800 dark:text-zinc-100" />
      );
    case "parallax":
      return (
        <ParallaxArt className="h-full w-full text-sky-500 dark:text-sky-400" />
      );
    case "charts":
      return (
        <ChartsArt className="h-full w-full text-emerald-500 dark:text-emerald-400" />
      );
    case "kanban":
      return (
        <KanbanArt className="h-full w-full text-purple-500 dark:text-fuchsia-400" />
      );
    case "blog":
      return (
        <BlogArt className="h-full w-full text-orange-500 dark:text-amber-400" />
      );
    default:
      return (
        <HomepageArt className="absolute inset-0 h-full w-full object-cover text-zinc-800 dark:text-zinc-100" />
      );
  }
}

export function ProjectsGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {projects.map((p, i) => {
        const external = p.href.startsWith("http");
        return (
          <motion.a
            href={p.href}
            target={external ? "_blank" : "_self"}
            key={p.slug}
            className="group glass p-4 rounded-2xl hover:shadow-glow transition tilt block"
            initial={{ opacity: 0, y: 12 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <div className="tilt-child">
              <div className="relative aspect-[40/21] w-full overflow-hidden rounded-xl border border-white/40 dark:border-slate-800/40 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800">
                {/* super vibrant illustration */}
                <motion.div
                  className="
                    absolute inset-0 flex items-center justify-center
                    rounded-xl overflow-hidden transform-gpu
                    [clip-path:inset(0_round_0.75rem)]   /* Safari-friendly clip while scaling */
                    transition
                    group-hover:scale-[1.03]
                    group-hover:saturate-200
                    group-hover:contrast-200
                    [&>svg]:h-full [&>svg]:w-full
                  "
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 24,
                    mass: 0.6,
                  }}
                >
                  <ArtForSlug slug={p.slug} />
                </motion.div>

                {/* tag + external icon */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xs px-2 py-1 rounded-full bg-black/40 text-white backdrop-blur">
                    {p.tag}
                  </span>
                  <ExternalLink className="size-4 opacity-80 group-hover:opacity-100" />
                </div>
              </div>

              {/* Text block */}
              <div className="mt-4 space-y-1">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {p.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.a>
        );
      })}

      {/* tail card */}
      <motion.div
        className="relative overflow-hidden rounded-2xl border 
             border-zinc-200 dark:border-zinc-800 
             bg-gradient-to-br from-white/80 to-zinc-50/70 
             dark:from-zinc-900/80 dark:to-zinc-950/70 
             p-5 flex flex-col items-center justify-center text-center 
             shadow-sm backdrop-blur"
        initial={{ opacity: 0, y: 12 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: projects.length * 0.05 }}
      >
        {/* elegant shimmer accent */}
        <div
          className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.15),transparent)] 
                  bg-[length:200%_100%] animate-shimmer pointer-events-none"
        />

        <div className="relative space-y-2 z-10">
          <div className="flex items-center justify-center gap-2">
            <Settings className="size-5 text-sky-500 dark:text-sky-400 animate-spin-slow" />
            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
              Behind the Scenes
            </h3>
          </div>
          <ul className="text-sm space-y-1 text-zinc-600 dark:text-zinc-300">
            <li>
              ✨ Previews are all <strong>SVG</strong> — no images
            </li>
            <li>
              🎨 Motion powered by <strong>Framer Motion</strong>
            </li>
            <li>
              🌓 Fully <strong>theme-aware</strong> with zero assets
            </li>
            <li>
              ⚡ <strong>GPU-optimized</strong> transforms for smooth UX
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
