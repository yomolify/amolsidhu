"use client";
import { useState } from "react";
import { Section } from "@/components/section";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const to = "amol@amolsidhu.com";
    const sub = encodeURIComponent(
      subject || `Message from ${name || "Visitor"} — amolsidhu.com`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${to}?subject=${sub}&body=${body}`;
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("amol@amolsidhu.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <main className="pt-24">
      <Section
        title="Contact"
        subtitle="Ready to bring industry-leading experience in full-stack development and DevOps to your organization."
      >
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl glass p-6 md:p-8 rounded-2xl space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Your name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full glass px-3 py-2 rounded-xl outline-none"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Your email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass px-3 py-2 rounded-xl outline-none"
                placeholder="jane@doe.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Subject</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full glass px-3 py-2 rounded-xl outline-none"
              placeholder="Let's work together"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full glass px-3 py-2 rounded-xl outline-none"
              placeholder="Tell me about your requirements..."
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="btn-shimmer text-white px-5 py-3 rounded-xl font-medium shadow-glow"
            >
              Open email client
            </button>
            <button
              type="button"
              onClick={copyEmail}
              className="glass px-4 py-3 rounded-xl"
            >
              {copied ? "Copied!" : "Copy my email"}
            </button>
            <a
              href="mailto:amol@amolsidhu.com"
              className="glass px-4 py-3 rounded-xl"
            >
              Or click to email
            </a>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            The best solutions start with a conversation.
          </p>
        </motion.form>
      </Section>
    </main>
  );
}
