export type BlogMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
};

export const posts: BlogMeta[] = [
  {
    slug: "parallax-magic",
    title: "Parallax Magic in Framer Motion",
    date: "2025-08-20",
    summary: "Create depth and focus with GPU-friendly parallax layers.",
    tags: ["motion", "ux", "frontend"],
  },
  {
    slug: "frontend-charts",
    title: "Polished Dashboards with Recharts",
    date: "2025-08-21",
    summary:
      "Responsive, theme-aware dashboards built with Recharts that highlight clarity and interactivity.",
    tags: ["charts", "react", "viz"],
  },
  {
    slug: "dnd-smooth",
    title: "Drag & Drop That Just Feels Right",
    date: "2025-08-22",
    summary: "Build a Trello-like board with @dnd-kit and polish the motion.",
    tags: ["dragdrop", "ux", "react"],
  },
  {
    slug: "theme-aware-blobs",
    title: "Theme-Aware Blobs for Background Personality",
    date: "2025-08-23",
    summary: "SVG blobs that shift with dark/light mode and scroll speed.",
    tags: ["svg", "design", "frontend"],
  },
  {
    slug: "data-driven-ui",
    title: "Data-Driven UI with Just JSON",
    date: "2025-08-24",
    summary: "Generate sections and layouts entirely from JSON configs.",
    tags: ["json", "config", "frontend"],
  },
  {
    slug: "export-anywhere",
    title: "Export Components to PNG with Style",
    date: "2025-08-25",
    summary: "Let users snapshot charts, dashboards, or cards beautifully.",
    tags: ["export", "ux", "react"],
  },
];
