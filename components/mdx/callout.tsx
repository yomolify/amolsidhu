import { AlertTriangle, Info, Lightbulb, ShieldAlert } from "lucide-react";
type Kind = "note" | "tip" | "warn" | "danger";
const ICONS: Record<Kind, any> = { note: Info, tip: Lightbulb, warn: AlertTriangle, danger: ShieldAlert };
const TITLES: Record<Kind, string> = { note: "Note", tip: "Tip", warn: "Warning", danger: "Danger" };
export function Callout({ type = "note", title, children }: { type?: Kind; title?: string; children: React.ReactNode }) {
  const Icon = ICONS[type];
  const palette = {
    note: "bg-slate-100/70 dark:bg-slate-800/60 border-slate-300/40 dark:border-slate-700/40",
    tip: "bg-emerald-100/60 dark:bg-emerald-900/30 border-emerald-300/40 dark:border-emerald-800/40",
    warn: "bg-amber-100/60 dark:bg-amber-900/30 border-amber-300/40 dark:border-amber-800/40",
    danger: "bg-rose-100/60 dark:bg-rose-900/30 border-rose-300/40 dark:border-rose-800/40"
  } as const;
  return (<div className={`glass border ${palette[type]} p-4 rounded-xl not-prose`}>
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-5" />
      <div><div className="font-medium">{title ?? TITLES[type]}</div><div className="mt-1 text-sm text-slate-700 dark:text-slate-300">{children}</div></div>
    </div>
  </div>);
}
