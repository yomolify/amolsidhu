export type Project = {
  slug: string;
  title: string;
  description: string;
  href: string;
  tag: string;
  tech: string[];
};
export const projects: Project[] = [
  {
    slug: "ui-kit",
    title: "Spark UI — Micro UI Kit",
    description: "Animated buttons, cards, and modals. Pure frontend.",
    href: "/parallax",
    tag: "Design System",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
  },
  {
    slug: "landing",
    title: "Gradient Landing",
    description: "Glossy, high-conversion landing with motion.",
    href: "/charts",
    tag: "Marketing",
    tech: ["Next.js", "Tailwind"],
  },
  {
    slug: "charts",
    title: "Charts Without Backend",
    description: "Client-only charts parsing static JSON for dashboards.",
    href: "/charts",
    tag: "Viz",
    tech: ["React", "TypeScript"],
  },
  {
    slug: "gallery",
    title: "Lightbox Gallery",
    description: "Responsive image gallery with keyboard navigation.",
    href: "/parallax#depth",
    tag: "Media",
    tech: ["Next.js", "Tailwind"],
  },
  {
    slug: "kanban",
    title: "Draggable Kanban",
    description: "Sortable & cross-column moves with localStorage.",
    href: "/kanban#board",
    tag: "Effects",
    tech: ["dnd-kit"],
  },
];
