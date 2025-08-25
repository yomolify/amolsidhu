"use client";
import { useState } from "react";
import { Section } from "@/components/section";
import { motion } from "framer-motion";
import { Mail, Copy, CopyCheck, Github, Linkedin, Youtube } from "lucide-react";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const email = "amol@amolsidhu.com";
  const linkedIn = "https://www.linkedin.com/in/amolsidhu";
  const github = "https://github.com/yomolify";
  const youtube = "https://www.youtube.com/@amolsidhumusic";

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <main className="pt-24">
      <Section
        title="Contact"
        subtitle="Ready to bring industry-leading experience in full-stack development and DevOps to your organization?"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto glass p-6 md:p-8 rounded-2xl space-y-6 text-center"
        >
          <div className="flex flex-col items-center gap-3">
            <Mail className="size-6 text-sky-500 dark:text-sky-400" />
            <p className="font-mono text-lg">{email}</p>
          </div>

          <div className="flex justify-center gap-3 flex-wrap">
            <a
              href={`mailto:${email}`}
              className="btn-shimmer text-white px-5 py-3 rounded-xl font-medium shadow-glow"
            >
              Send an Email
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="glass px-4 py-3 rounded-xl flex items-center gap-2"
            >
              {copied ? (
                <CopyCheck className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
              {copied ? "Copied!" : "Copy email"}
            </button>
          </div>

          {/* Social row */}
          <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
            <a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-4 py-2 rounded-xl inline-flex items-center gap-2 hover:shadow-sm"
              aria-label="Open LinkedIn profile"
            >
              <Linkedin className="size-4" />
              <span className="text-sm">LinkedIn</span>
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-4 py-2 rounded-xl inline-flex items-center gap-2 hover:shadow-sm"
              aria-label="Open GitHub profile"
            >
              <Github className="size-4" />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href={youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-4 py-2 rounded-xl inline-flex items-center gap-2 hover:shadow-sm text-red-600 dark:text-red-400"
              aria-label="Open YouTube channel"
            >
              <Youtube className="size-4" />
              <span className="text-sm">YouTube</span>
            </a>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Every great project begins with a simple hello.
          </p>
        </motion.div>
      </Section>
    </main>
  );
}
