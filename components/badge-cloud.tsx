"use client";
import { motion } from "framer-motion";
const badges = [
  "Fullstack",
  "Node.js",
  "React",
  "GraphQL",
  "Typescript",
  "SRE",
  "CI/CD",
  "IaC",
  "AWS",
  "Docker",
  "Terraform",
  "Golang",
  "Python",
  "PostgreSQL",
];
export function BadgeCloud() {
  return (
    <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
      {badges.map((b, i) => (
        <motion.span
          key={b}
          className="px-3 py-1 rounded-full glass text-sm"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.03 }}
        >
          {b}
        </motion.span>
      ))}
    </div>
  );
}
