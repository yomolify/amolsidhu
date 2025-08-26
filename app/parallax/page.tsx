"use client";
import { Section } from "@/components/section";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function ParallaxPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // 1) SMOOTH the scroll signal to prevent tiny jitter steps
  const sp = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.8,
  });

  // wildly different parallax speeds
  const yA = useTransform(sp, [0, 1], ["0%", "-12%"]); // very slow
  const yB = useTransform(sp, [0, 1], ["0%", "-38%"]); // medium
  const yC = useTransform(sp, [0, 1], ["0%", "-85%"]); // fast
  const yD = useTransform(sp, [0, 1], ["0%", "-140%"]); // very fast
  const yE = useTransform(sp, [0, 1], ["0%", "-220%"]); // insane
  const yF = useTransform(sp, [0, 1], ["0%", "15%"]); // opposite dir

  const bandRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: bandProgress } = useScroll({
    target: bandRef,
    offset: ["start 50%", "end start"],
  });
  const dimOverlay = useTransform(bandProgress, [0, 1], [0, 0]);

  return (
    <main className="pt-24" ref={ref}>
      <Section
        title="Parallax Scrollytelling"
        subtitle="Layers move at different speeds to create depth and delight."
      />
      <div className="relative h-[200vh] overflow-clip">
        {/* THEME-AWARE, FLICKER-RESISTANT BLOBS */}
        {/* Wrapper handles blur + transform; child handles gradient + blend.
           This avoids combining heavy filter + blend on the same painted layer. */}

        {/* 1 — gigantic, glacial */}
        <motion.div
          className="absolute transform-gpu"
          style={{
            top: "6%",
            left: "12%",
            width: "760px",
            height: "760px",
            y: yA,
            willChange: "transform",
            backfaceVisibility: "hidden",
            filter: "blur(120px)", // moderate for perf; raise for more glow
          }}
        >
          <div
            className="pointer-events-none h-full w-full rounded-full
                       bg-gradient-to-r from-fuchsia-300 via-purple-300 to-pink-400
                       dark:from-fuchsia-500 dark:via-purple-600 dark:to-pink-700
                       opacity-60 dark:opacity-70
                       mix-blend-multiply dark:mix-blend-screen"
          />
        </motion.div>

        {/* 2 — medium, brisk */}
        <motion.div
          className="absolute transform-gpu"
          style={{
            top: "38%",
            left: "58%",
            width: "420px",
            height: "420px",
            y: yB,
            willChange: "transform",
            backfaceVisibility: "hidden",
            filter: "blur(100px)",
          }}
        >
          <div
            className="pointer-events-none h-full w-full rounded-full
                       bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-400
                       dark:from-emerald-500 dark:via-teal-600 dark:to-cyan-700
                       opacity-55 dark:opacity-70
                       mix-blend-multiply dark:mix-blend-screen"
          />
        </motion.div>

        {/* 3 — huge, fast */}
        <motion.div
          className="absolute transform-gpu"
          style={{
            top: "72%",
            left: "26%",
            width: "640px",
            height: "640px",
            y: yC,
            willChange: "transform",
            backfaceVisibility: "hidden",
            filter: "blur(140px)",
          }}
        >
          <div
            className="pointer-events-none h-full w-full rounded-full
                       bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-400
                       dark:from-amber-500 dark:via-orange-600 dark:to-yellow-700
                       opacity-60 dark:opacity-75
                       mix-blend-multiply dark:mix-blend-screen"
          />
        </motion.div>

        {/* 4 — small, very fast */}
        <motion.div
          className="absolute transform-gpu"
          style={{
            top: "18%",
            left: "74%",
            width: "260px",
            height: "260px",
            y: yD,
            willChange: "transform",
            backfaceVisibility: "hidden",
            filter: "blur(80px)",
          }}
        >
          <div
            className="pointer-events-none h-full w-full rounded-full
                       bg-gradient-to-r from-sky-300 via-blue-300 to-indigo-400
                       dark:from-sky-500 dark:via-blue-600 dark:to-indigo-700
                       opacity-55 dark:opacity-70
                       mix-blend-multiply dark:mix-blend-screen"
          />
        </motion.div>

        {/* 5 — tiny, insane */}
        <motion.div
          className="absolute transform-gpu"
          style={{
            top: "54%",
            left: "8%",
            width: "180px",
            height: "180px",
            y: yE,
            willChange: "transform",
            backfaceVisibility: "hidden",
            filter: "blur(70px)",
          }}
        >
          <div
            className="pointer-events-none h-full w-full rounded-full
                       bg-gradient-to-r from-rose-300 via-pink-300 to-red-400
                       dark:from-rose-500 dark:via-pink-600 dark:to-red-700
                       opacity-60 dark:opacity-75
                       mix-blend-multiply dark:mix-blend-screen"
          />
        </motion.div>

        {/* 6 — chunky, opposite direction */}
        <motion.div
          className="absolute transform-gpu"
          style={{
            top: "82%",
            left: "72%",
            width: "520px",
            height: "520px",
            y: yF,
            willChange: "transform",
            backfaceVisibility: "hidden",
            filter: "blur(110px)",
          }}
        >
          <div
            className="pointer-events-none h-full w-full rounded-full
                       bg-gradient-to-r from-indigo-300 via-violet-300 to-purple-400
                       dark:from-indigo-500 dark:via-violet-600 dark:to-purple-700
                       opacity-55 dark:opacity-70
                       mix-blend-multiply dark:mix-blend-screen"
          />
        </motion.div>

        <div className="sticky top-24 mt-16"> ‎ </div>
        <div className="sticky top-24 mt-16" ref={bandRef}>
          <div className="mx-auto max-w-6xl glass p-8 rounded-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-display"
            >
              Motion with purpose
            </motion.h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Parallax guides attention and establishes hierarchy. These
              floating blobs are GPU-friendly and theme-aware. Switch to dark
              mode for a cool experience!
            </p>

            <div className="glass p-6 md:p-8 rounded-2xl mt-8">
              <h3 className="text-2xl md:text-3xl font-display">
                See the motion contrast
              </h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                These cards scroll at the normal speed, while the blobs behind
                them drift at different speeds, making the parallax effect
                obvious.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "Normal flow",
                    desc: "Scrolls until it reaches the sticky header.",
                  },
                  {
                    title: "Depth cue",
                    desc: "Background layers move slower/faster.",
                  },
                  { title: "Focus", desc: "Foreground content stays crisp." },
                  {
                    title: "GPU-friendly",
                    desc: "Transforms + springs for smoothness.",
                  },
                  {
                    title: "Accessible",
                    desc: "Readable content over motion.",
                  },
                  { title: "Responsive", desc: "Looks great on any device." },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="glass p-4 rounded-xl hover:shadow-glow group transition tilt block"
                  >
                    <div className="text-sm opacity-70">{c.title}</div>
                    <div className="mt-1 font-medium">{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <motion.div
          aria-hidden
          style={{ opacity: dimOverlay }}
          className="pointer-events-none absolute inset-0 z-[5] bg-slate-900/60 mix-blend-multiply"
        />
      </div>

      <Section>
        <div className="glass p-8 rounded-2xl">
          <h3 className="text-2xl font-display">Implementation details</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            We smooth scroll with <code>useSpring</code>, force GPU compositing
            with
            <code> transform-gpu</code>, and split blur (wrapper) from blend
            (child) to avoid flicker.
          </p>
        </div>
      </Section>
    </main>
  );
}
