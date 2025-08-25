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
    slug: "home",
    title: "Landing Page",
    description: "Theme-aware layout, smooth navigation, animated cards.",
    href: "/",
    tag: "Design",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
  },
  {
    slug: "parallax",
    title: "Parallax Magic",
    description: "Scroll-driven depth with Framer Motion and GPU transforms.",
    href: "/parallax",
    tag: "Motion",
    tech: ["Framer Motion", "React"],
  },
  {
    slug: "charts",
    title: "Polished Dashboards",
    description: "Responsive Recharts with tooltips, legends, and dark mode.",
    href: "/charts",
    tag: "Viz",
    tech: ["React", "Recharts"],
  },
  {
    slug: "kanban",
    title: "Draggable Kanban",
    description: "Sortable cards and cross-column moves powered by @dnd-kit.",
    href: "/kanban",
    tag: "Drag & Drop",
    tech: ["@dnd-kit", "React"],
  },
  {
    slug: "blog",
    title: "Blog",
    description: "Posts on UI patterns, experiments, and case studies.",
    href: "/blog",
    tag: "Writing",
    tech: ["MDX", "Next.js"],
  },
];
