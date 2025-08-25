// /src/components/demo.tsx
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, PlayCircle, Link as LinkIcon } from "lucide-react";

type DemoProps = {
  title?: string;
  subtitle?: string;
  /** "coming-soon" | "live" */
  status?: "coming-soon" | "live";
  /** If provided, renders an <iframe> preview */
  src?: string;
  /** Optional external link to open the demo in a new tab */
  href?: string;
  /** Optional link to the code repo/file */
  codeHref?: string;
  /** Aspect ratio for iframe demos (w:h). Defaults to 16:9 */
  ratio?: `${number}:${number}`;
  /** Optional children to render custom content instead of the placeholder */
  children?: React.ReactNode;
  className?: string;
};

export function Demo({
  title = "Live Demo",
  subtitle,
  status = "coming-soon",
  src,
  href,
  codeHref,
  ratio = "16:9",
  children,
  className = "",
}: DemoProps) {
  const [copied, setCopied] = useState(false);

  const paddingTop = useMemo(() => {
    const [w, h] = ratio.split(":").map(Number);
    return `${(h / w) * 100}%`;
  }, [ratio]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(href ?? src ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  const Wrapper = ({ children: inner }: { children: React.ReactNode }) => (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={[
        "rounded-2xl border bg-white/60 dark:bg-zinc-900/60",
        "backdrop-blur shadow-sm ring-1 ring-black/5 dark:ring-white/5",
        "p-4 md:p-6",
        className,
      ].join(" ")}
    >
      {inner}
    </motion.div>
  );

  return (
    <Wrapper>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base md:text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {title}
          </h3>
          {subtitle ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-sm 
                         hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition"
              title="Open demo"
            >
              <ExternalLink className="size-4" />
              Open
            </a>
          ) : null}
          {codeHref ? (
            <a
              href={codeHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-sm 
                         hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition"
              title="View code"
            >
              <PlayCircle className="size-4" />
              Code
            </a>
          ) : null}
          {href || src ? (
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-sm 
                         hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition"
              title="Copy link"
            >
              <LinkIcon className="size-4" />
              {copied ? "Copied" : "Copy"}
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-4">
        {children ? (
          <div className="rounded-xl border bg-zinc-50/60 dark:bg-zinc-900/40 p-4">
            {children}
          </div>
        ) : src ? (
          <div className="relative w-full overflow-hidden rounded-xl border bg-black/5 dark:bg-white/5">
            <div style={{ paddingTop }} />
            <iframe
              src={src}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              title={title}
            />
          </div>
        ) : (
          <div
            className="grid place-items-center rounded-xl border border-dashed 
                       bg-zinc-50/60 dark:bg-zinc-900/40 p-10 text-center"
          >
            <div>
              <div
                className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full 
                              bg-zinc-200 dark:bg-zinc-800"
              >
                <PlayCircle className="size-5 text-zinc-600 dark:text-zinc-300" />
              </div>
              <p className="font-medium text-zinc-800 dark:text-zinc-200">
                {status === "coming-soon" ? "Demo coming soon" : "Live preview"}
              </p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                I’ll wire the embedded preview soon. In the meantime, you can
                open the demo from the navigation bar.
              </p>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
}
