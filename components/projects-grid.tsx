'use client';
import { motion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import { projects } from "@/lib/projects";

export function ProjectsGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {projects.map((p, i) => (
        <motion.a href={p.href} target={p.href.startsWith('http') ? "_blank" : "_self"} key={p.slug}
          className="group glass p-4 rounded-2xl hover:shadow-glow transition tilt block"
          initial={{ opacity: 0, y: 12 }} viewport={{ once: true }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.05 }}>
          <div className="tilt-child">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/40 dark:border-slate-800/40">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/30 via-cyan-500/20 to-emerald-500/20 animate-pulse" />
              <div className="absolute inset-0">
                <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="none">
                  <defs><linearGradient id={`g-${i}`} x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(124,58,237,0.8)" />
                    <stop offset="50%" stopColor="rgba(6,182,212,0.6)" />
                    <stop offset="100%" stopColor="rgba(16,185,129,0.6)" />
                  </linearGradient></defs>
                  <rect x="0" y="0" width="400" height="200" fill={`url(#g-${i})`} />
                  <g opacity="0.3"><circle cx="60" cy="40" r="6" fill="white" /><circle cx="120" cy="90" r="4" fill="white" /><circle cx="300" cy="150" r="3" fill="white" /></g>
                </svg>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="text-xs px-2 py-1 rounded-full bg-black/40 text-white backdrop-blur">{p.tag}</span>
                <ExternalLink className="size-4 opacity-80 group-hover:opacity-100" />
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{p.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {p.tech.map((t) => (<span key={t} className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800">{t}</span>))}
              </div>
            </div>
          </div>
        </motion.a>
      ))}
      <motion.div className="glass p-5 rounded-2xl flex items-center justify-center text-center"
        initial={{ opacity: 0, y: 12 }} viewport={{ once: true }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: projects.length * 0.05 }}>
        <div><Sparkles className="mx-auto size-7 mb-3" /><p>More polished demos coming soon. ✨</p></div>
      </motion.div>
    </div>
  );
}
